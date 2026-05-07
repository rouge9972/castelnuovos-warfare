import os
import json
import math
from datetime import datetime, timezone

import numpy as np
import pandas as pd
import yfinance as yf
from groq import Groq
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

load_dotenv()

app = Flask(__name__)
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))


# ── helpers ──────────────────────────────────────────────────────────────────

def _safe(v):
    """Convert numpy / nan / inf scalars to JSON-safe Python types."""
    if v is None:
        return None
    if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
        return None
    if isinstance(v, (np.integer,)):
        return int(v)
    if isinstance(v, (np.floating,)):
        return float(v)
    return v


def _fmt_large(v):
    if v is None:
        return "N/A"
    if v >= 1e12:
        return f"${v/1e12:.2f}T"
    if v >= 1e9:
        return f"${v/1e9:.2f}B"
    if v >= 1e6:
        return f"${v/1e6:.2f}M"
    return f"${v:,.0f}"


def _compute_technicals(hist: pd.DataFrame) -> dict:
    close = hist["Close"].squeeze()
    volume = hist["Volume"].squeeze()

    # RSI-14
    delta = close.diff()
    gain = delta.clip(lower=0).rolling(14).mean()
    loss = (-delta.clip(upper=0)).rolling(14).mean()
    rs = gain / loss.replace(0, float("nan"))
    rsi_series = 100 - 100 / (1 + rs)
    rsi = _safe(rsi_series.iloc[-1])

    # MACD (12, 26, 9)
    ema12 = close.ewm(span=12, adjust=False).mean()
    ema26 = close.ewm(span=26, adjust=False).mean()
    macd_line = ema12 - ema26
    signal_line = macd_line.ewm(span=9, adjust=False).mean()
    histogram = macd_line - signal_line
    macd_val = _safe(macd_line.iloc[-1])
    signal_val = _safe(signal_line.iloc[-1])
    hist_val = _safe(histogram.iloc[-1])

    # Bollinger Bands (20, 2σ)
    sma20 = close.rolling(20).mean()
    std20 = close.rolling(20).std()
    bb_upper = _safe((sma20 + 2 * std20).iloc[-1])
    bb_mid = _safe(sma20.iloc[-1])
    bb_lower = _safe((sma20 - 2 * std20).iloc[-1])

    # SMAs
    sma50 = _safe(close.rolling(50).mean().iloc[-1])
    sma200 = _safe(close.rolling(200).mean().iloc[-1])

    current_price = _safe(close.iloc[-1])

    # Volume ratio vs 20-day average
    avg_vol = volume.rolling(20).mean().iloc[-1]
    vol_ratio = _safe(volume.iloc[-1] / avg_vol) if avg_vol and avg_vol > 0 else None

    # Crossover signals
    golden_cross = None
    if sma50 and sma200:
        golden_cross = sma50 > sma200

    macd_bullish = None
    if macd_val is not None and signal_val is not None:
        macd_bullish = macd_val > signal_val

    # Bollinger Band position label
    bb_position = "N/A"
    if current_price and bb_upper and bb_lower and bb_upper != bb_lower:
        pct = (current_price - bb_lower) / (bb_upper - bb_lower)
        if pct > 0.95:
            bb_position = "Near Upper Band"
        elif pct > 0.5:
            bb_position = "Upper Half"
        elif pct > 0.05:
            bb_position = "Lower Half"
        else:
            bb_position = "Near Lower Band"

    return {
        "rsi": rsi,
        "macd": {"macd": macd_val, "signal": signal_val, "histogram": hist_val},
        "bollinger": {"upper": bb_upper, "mid": bb_mid, "lower": bb_lower, "position": bb_position},
        "sma": {"sma20": bb_mid, "sma50": sma50, "sma200": sma200},
        "volume_ratio": vol_ratio,
        "golden_cross": golden_cross,
        "macd_bullish": macd_bullish,
        "current_price": current_price,
    }


# ── routes ────────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/quote/<symbol>")
def quote(symbol):
    try:
        ticker = yf.Ticker(symbol.upper())
        info = ticker.fast_info
        full_info = ticker.info

        price = _safe(info.last_price)
        prev_close = _safe(info.previous_close)
        change = None
        change_pct = None
        if price and prev_close and prev_close != 0:
            change = round(price - prev_close, 4)
            change_pct = round((change / prev_close) * 100, 2)

        return jsonify({
            "symbol": symbol.upper(),
            "name": full_info.get("longName") or full_info.get("shortName") or symbol.upper(),
            "price": price,
            "change": change,
            "change_pct": change_pct,
            "volume": _safe(info.three_month_average_volume),
            "day_low": _safe(info.day_low),
            "day_high": _safe(info.day_high),
            "week52_low": _safe(info.year_low),
            "week52_high": _safe(info.year_high),
            "currency": full_info.get("currency", "USD"),
            "exchange": full_info.get("exchange", ""),
            "asset_type": full_info.get("quoteType", ""),
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/fundamentals/<symbol>")
def fundamentals(symbol):
    try:
        info = yf.Ticker(symbol.upper()).info
        return jsonify({
            "market_cap": _fmt_large(info.get("marketCap")),
            "pe_ratio": _safe(info.get("trailingPE")),
            "forward_pe": _safe(info.get("forwardPE")),
            "eps": _safe(info.get("trailingEps")),
            "revenue": _fmt_large(info.get("totalRevenue")),
            "profit_margin": _safe(info.get("profitMargins")),
            "beta": _safe(info.get("beta")),
            "dividend_yield": _safe(info.get("dividendYield")),
            "sector": info.get("sector", "N/A"),
            "industry": info.get("industry", "N/A"),
            "employees": info.get("fullTimeEmployees"),
            "description": info.get("longBusinessSummary", ""),
            "week52_change": _safe(info.get("52WeekChange")),
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/technicals/<symbol>")
def technicals(symbol):
    try:
        hist = yf.Ticker(symbol.upper()).history(period="1y")
        if hist.empty:
            return jsonify({"error": "No historical data"}), 404
        return jsonify(_compute_technicals(hist))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/news/<symbol>")
def news(symbol):
    try:
        raw = yf.Ticker(symbol.upper()).news or []
        items = []
        for n in raw[:15]:
            c = n.get("content", n)  # new yfinance nests data under "content"
            pub_raw = c.get("pubDate") or c.get("providerPublishTime") or 0
            ts = 0
            if isinstance(pub_raw, str) and pub_raw:
                try:
                    ts = int(datetime.fromisoformat(pub_raw.replace("Z", "+00:00")).timestamp())
                except Exception:
                    ts = 0
            elif isinstance(pub_raw, (int, float)):
                ts = int(pub_raw)

            provider = c.get("provider") or {}
            canonical = c.get("canonicalUrl") or c.get("clickThroughUrl") or {}
            items.append({
                "title": c.get("title", ""),
                "publisher": provider.get("displayName") if isinstance(provider, dict) else c.get("publisher", ""),
                "link": canonical.get("url") if isinstance(canonical, dict) else c.get("link", "#"),
                "published": ts,
            })
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        symbol = data.get("symbol", "").upper()
        quote_data = data.get("quote", {})
        tech_data = data.get("technicals", {})
        fund_data = data.get("fundamentals", {})
        news_data = data.get("news", [])

        news_headlines = "\n".join(
            f"- [{n.get('publisher','')}] {n.get('title','')}"
            for n in news_data[:8]
        )

        prompt = f"""You are a senior quantitative analyst. Analyze the following data for {symbol} and return a JSON object only — no markdown, no extra text.

QUOTE:
{json.dumps(quote_data, indent=2)}

TECHNICAL INDICATORS:
{json.dumps(tech_data, indent=2)}

FUNDAMENTALS:
{json.dumps(fund_data, indent=2)}

RECENT NEWS:
{news_headlines}

Return this exact JSON structure (all fields required):
{{
  "direction": "bullish" | "bearish" | "neutral",
  "confidence": <integer 0-100>,
  "summary": "<1-2 sentence thesis>",
  "bull_case": ["<reason>", ...],
  "bear_case": ["<reason>", ...],
  "key_catalysts": ["<event to watch>", ...],
  "risks": ["<risk factor>", ...],
  "time_horizon": "<e.g. short-term (1-4 weeks)>",
  "entry_signal": {{
    "action": "BUY" | "SELL" | "WAIT",
    "trigger": "<what technical/fundamental condition justifies this>",
    "suggested_entry": "<price or range>",
    "stop_loss": "<price>",
    "take_profit": "<price>",
    "risk_reward": "<e.g. 2.5:1>"
  }},
  "exit_signal": {{
    "action": "CLOSE" | "HOLD" | "SCALE OUT",
    "trigger": "<condition that would prompt exit>",
    "note": "<any nuance>"
  }}
}}"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=1500,
            messages=[
                {"role": "system", "content": "You are a senior quantitative analyst. Always respond with valid JSON only — no markdown fences, no explanations outside the JSON."},
                {"role": "user", "content": prompt},
            ],
            response_format={"type": "json_object"},
        )

        raw = completion.choices[0].message.content.strip()
        result = json.loads(raw)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/search")
def search():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify([])
    try:
        results = yf.Search(q, max_results=8).quotes or []
        items = []
        for r in results:
            sym = r.get("symbol") or r.get("Symbol", "")
            if not sym:
                continue
            items.append({
                "symbol": sym,
                "name": r.get("longname") or r.get("shortname") or r.get("longName") or r.get("shortName") or sym,
                "asset_type": r.get("quoteType") or r.get("typeDisp") or "",
                "exchange": r.get("exchDisp") or r.get("exchange") or "",
            })
        return jsonify(items)
    except Exception:
        return jsonify([])


@app.route("/api/portfolio", methods=["POST"])
def portfolio():
    try:
        data = request.get_json()
        capital = data.get("capital", 10000)
        positions = data.get("positions", 8)
        risk = data.get("risk", "moderate")
        focus = data.get("focus", [])
        sectors = data.get("sectors", [])
        geography = data.get("geography", "Global")
        currency = data.get("currency", "USD")

        focus_str = ", ".join(focus) if focus else "no specific focus (AI's discretion)"
        sectors_str = ", ".join(sectors) if sectors else "no specific sectors (AI's discretion)"

        prompt = f"""You are a senior portfolio manager. Build an optimal investment portfolio based on these client preferences and return a JSON object only — no markdown, no extra text.

CLIENT PREFERENCES:
- Capital to invest: {capital} {currency}
- Number of positions: {positions}
- Risk tolerance: {risk}
- Investment focus: {focus_str}
- Preferred sectors: {sectors_str}
- Geographic focus: {geography}

Return this exact JSON structure. Allocations must sum to exactly 100.0:
{{
  "holdings": [
    {{
      "symbol": "<ticker symbol, e.g. AAPL>",
      "name": "<full company/fund name>",
      "sector": "<sector>",
      "asset_type": "<Stock | ETF | Bond | Crypto>",
      "allocation_pct": <number, e.g. 15.0>,
      "allocation_amount": <number, capital * allocation_pct / 100>,
      "reason": "<1 sentence: why this holding fits the portfolio>"
    }}
  ],
  "thesis": "<2-3 sentence overall portfolio rationale>",
  "risk_assessment": "<1-2 sentence risk profile description>",
  "expected_dividend_yield": "<e.g. 2.1%>",
  "sector_breakdown": {{"Technology": 35, "Healthcare": 20}},
  "diversification_note": "<1 sentence on diversification>"
}}"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=2000,
            messages=[
                {"role": "system", "content": "You are a senior portfolio manager. Always respond with valid JSON only — no markdown fences, no explanations outside the JSON. Allocation percentages must sum to exactly 100."},
                {"role": "user", "content": prompt},
            ],
            response_format={"type": "json_object"},
        )

        raw = completion.choices[0].message.content.strip()
        result = json.loads(raw)

        # Normalise allocations to exactly 100
        holdings = result.get("holdings", [])
        total = sum(h.get("allocation_pct", 0) for h in holdings)
        if total > 0:
            for h in holdings:
                h["allocation_pct"] = round(h["allocation_pct"] / total * 100, 2)
                h["allocation_amount"] = round(float(capital) * h["allocation_pct"] / 100, 2)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/report/<symbol>")
def report(symbol):
    """Collect all data for a symbol and return a combined report object."""
    try:
        s = symbol.upper()
        ticker = yf.Ticker(s)
        hist = ticker.history(period="1y")
        info = ticker.info
        fi = ticker.fast_info

        price = _safe(fi.last_price) or _safe(info.get("currentPrice")) or _safe(info.get("regularMarketPrice"))
        prev_close = _safe(fi.previous_close)
        change, change_pct = None, None
        if price and prev_close and prev_close != 0:
            change = round(price - prev_close, 4)
            change_pct = round((change / prev_close) * 100, 2)

        quote_data = {
            "symbol": s,
            "name": info.get("longName") or info.get("shortName") or s,
            "price": price,
            "change": change,
            "change_pct": change_pct,
            "currency": info.get("currency", "USD"),
        }

        tech_data = _compute_technicals(hist) if not hist.empty else {}

        fund_data = {
            "market_cap": _fmt_large(info.get("marketCap")),
            "pe_ratio": _safe(info.get("trailingPE")),
            "eps": _safe(info.get("trailingEps")),
            "beta": _safe(info.get("beta")),
            "sector": info.get("sector", "N/A"),
            "dividend_yield": _safe(info.get("dividendYield")),
        }

        raw_news = ticker.news or []
        news_data = [
            {"title": n.get("title", ""), "publisher": n.get("publisher", ""), "link": n.get("link", "#")}
            for n in raw_news[:8]
        ]

        return jsonify({
            "quote": quote_data,
            "technicals": tech_data,
            "fundamentals": fund_data,
            "news": news_data,
            "generated_at": datetime.now(timezone.utc).isoformat(),
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
