/* ── Metric Glossary ────────────────────────────────────────────────────── */
const METRIC_GLOSSARY = {
  RSI: {
    name: 'Relative Strength Index (RSI)',
    what: 'A momentum oscillator that measures the speed and magnitude of recent price changes on a scale from 0 to 100. Calculated over the last 14 periods by default.',
    indicates: 'Values below 30 suggest the asset may be oversold (potentially undervalued and due for a bounce). Values above 70 suggest overbought conditions (potentially overvalued and due for a pullback). Values between 30–70 are considered neutral.',
    useful: 'RSI helps identify potential turning points before a trend reverses. Divergence between RSI and price (e.g. price makes a new high but RSI does not) is a powerful warning signal.',
  },
  MACD: {
    name: 'Moving Average Convergence Divergence (MACD)',
    what: 'A trend-following momentum indicator showing the relationship between two exponential moving averages (EMAs). The MACD line = EMA(12) − EMA(26). The Signal line = EMA(9) of the MACD line. The Histogram = MACD − Signal.',
    indicates: 'When the MACD line crosses above the Signal line, it is a bullish signal. When it crosses below, it is bearish. A positive histogram means upward momentum is building; a negative and shrinking histogram means momentum is fading.',
    useful: 'MACD combines both trend direction and momentum into one indicator. It helps confirm whether a move has strength behind it, reducing false signals compared to using price alone.',
  },
  BOLLINGER: {
    name: 'Bollinger Bands',
    what: 'Three lines plotted around price: a middle 20-period simple moving average (SMA), and upper/lower bands set 2 standard deviations away. The bands widen during high volatility and contract during low volatility.',
    indicates: 'Price touching or exceeding the upper band may signal overbought conditions. Price near the lower band may signal oversold. A "squeeze" (bands very close together) often precedes a large breakout move.',
    useful: 'Bollinger Bands quantify volatility and help you see whether a price move is unusual relative to recent history. They are especially useful for identifying breakouts and mean-reversion setups.',
  },
  MA_CROSS: {
    name: 'Moving Average Crossover (Golden Cross / Death Cross)',
    what: 'A signal that occurs when the 50-day SMA crosses the 200-day SMA. A Golden Cross (50 crosses above 200) is bullish. A Death Cross (50 crosses below 200) is bearish.',
    indicates: 'The Golden Cross signals that short-term momentum is outpacing long-term momentum — often the start of a sustained uptrend. The Death Cross signals the opposite: short-term weakness relative to the long-term trend.',
    useful: 'Widely followed by institutional investors, making it a self-fulfilling signal. Best used on daily charts as a confirmation tool rather than a sole entry signal.',
  },
  SMA: {
    name: 'Simple Moving Averages (SMA 20 / 50 / 200)',
    what: 'The arithmetic average of the closing price over the last N days (20, 50, or 200). Price above the SMA means recent performance is above the longer-term average.',
    indicates: 'The SMA 200 is the primary long-term trend indicator. Price above it = long-term uptrend. SMA 50 tracks medium-term momentum. SMA 20 reflects short-term direction. Arrows (↑/↓) show whether the current price is above or below each average.',
    useful: 'SMAs act as dynamic support and resistance levels. A stock that pulls back to its 200-day SMA and bounces is often seen as a buying opportunity. Stacking multiple SMAs gives a layered view of trend strength.',
  },
  VOLUME: {
    name: 'Volume vs 20-Day Average',
    what: 'The ratio of today\'s trading volume compared to the 20-day average. Shown as a percentage — 150% means today\'s volume is 50% above average.',
    indicates: 'High volume on an up day confirms buying conviction. High volume on a down day confirms selling pressure. Low volume moves (in either direction) are less reliable and may reverse.',
    useful: 'Volume is the fuel behind price moves. A breakout with high volume is far more trustworthy than one on thin volume. Always check volume when evaluating whether a price move is significant.',
  },
  MARKET_CAP: {
    name: 'Market Capitalisation',
    what: 'The total market value of all outstanding shares. Calculated as: Share Price × Total Shares Outstanding.',
    indicates: 'Large-cap (>$10B): established, stable companies. Mid-cap ($2B–$10B): growth phase. Small-cap (<$2B): higher growth potential but more risk. Mega-cap (>$200B): dominant global companies.',
    useful: 'Market cap tells you the size and maturity of a company. It also determines which stock indices a company belongs to, which affects institutional buying pressure.',
  },
  PE: {
    name: 'Price-to-Earnings Ratio — Trailing (P/E TTM)',
    what: 'The current share price divided by the earnings per share (EPS) over the last 12 months ("trailing twelve months"). A P/E of 20 means investors pay $20 for every $1 of annual earnings.',
    indicates: 'High P/E (e.g. >30): investors expect strong future growth, or the stock is expensive. Low P/E (e.g. <15): may be undervalued, or earnings are declining. Negative P/E: company is losing money.',
    useful: 'The P/E is the most widely used valuation metric. Compare it to the company\'s historical average, its industry peers, and the broader market (S&P 500 average ~20–25x) to judge whether a stock is cheap or expensive.',
  },
  FORWARD_PE: {
    name: 'Forward Price-to-Earnings Ratio',
    what: 'Same as the trailing P/E, but uses estimated future earnings (next 12 months) instead of past earnings. Based on analyst consensus forecasts.',
    indicates: 'A forward P/E lower than the trailing P/E means earnings are expected to grow — a positive sign. A forward P/E higher than trailing means earnings are expected to decline.',
    useful: 'Forward P/E is more forward-looking than trailing P/E and better reflects what the market is actually pricing in. However, it relies on analyst estimates which can be wrong — always treat with some skepticism.',
  },
  EPS: {
    name: 'Earnings Per Share (EPS)',
    what: 'The portion of a company\'s profit allocated to each outstanding share. Calculated as: Net Income ÷ Shares Outstanding. Shown as trailing twelve months (TTM).',
    indicates: 'Growing EPS over time signals a healthy, profitable business. Declining EPS can signal trouble. EPS beats (actual > expected) typically cause stock price to rise; misses cause it to fall.',
    useful: 'EPS is the foundation of most valuation ratios (P/E, PEG). Comparing EPS growth rate to the P/E ratio (the PEG ratio) gives a more complete picture of whether a stock\'s valuation is justified.',
  },
  REVENUE: {
    name: 'Total Revenue (TTM)',
    what: 'The total income generated by the company from its business activities over the last 12 months, before any expenses are deducted. Also called "top line" or "turnover".',
    indicates: 'Consistent revenue growth signals strong product-market fit and business health. Flat or declining revenue can signal slowing demand or competitive pressure.',
    useful: 'Revenue growth is especially important for high-growth companies that may not yet be profitable. For mature companies, the focus shifts to profitability and free cash flow. Compare revenue growth to industry peers.',
  },
  PROFIT_MARGIN: {
    name: 'Net Profit Margin',
    what: 'The percentage of revenue that becomes net profit after all expenses (costs, taxes, interest) are paid. Formula: Net Income ÷ Revenue × 100.',
    indicates: 'Higher margins = more efficient business. Industry context matters: software companies may have 25–30% margins; supermarkets may have 1–3%. Expanding margins over time = improving profitability.',
    useful: 'Profit margin shows how much money a company actually keeps from each sale. A company growing revenue with shrinking margins may be struggling with cost control — a potential red flag.',
  },
  BETA: {
    name: 'Beta',
    what: 'A measure of how much a stock moves relative to the overall market. A Beta of 1.0 means it moves in line with the market. Beta of 1.5 means 50% more volatile. Beta of 0.5 means half as volatile.',
    indicates: 'Beta > 1: amplified market moves — bigger gains in bull markets, bigger losses in bear markets. Beta < 1: defensive — less sensitive to market swings. Beta < 0: moves opposite to the market (rare, e.g. gold miners).',
    useful: 'Beta is essential for portfolio risk management. A high-beta stock requires a larger expected return to justify the additional risk. In uncertain markets, lower-beta stocks tend to outperform.',
  },
  DIVIDEND: {
    name: 'Dividend Yield',
    what: 'The annual dividend payment per share divided by the current share price. Expressed as a percentage. A yield of 3% means you receive $3 per year for every $100 invested.',
    indicates: 'Higher yield can mean: attractive income opportunity, or the stock price has fallen significantly (be cautious). A very high yield (>7%) may signal a dividend cut is coming.',
    useful: 'Dividend yield matters most for income investors. Reinvesting dividends (DRIP) is one of the most powerful long-term wealth-building strategies. Compare yield to bond rates to assess relative attractiveness.',
  },
  SECTOR: {
    name: 'Sector',
    what: 'The broad economic category a company belongs to. The 11 GICS sectors include: Technology, Healthcare, Financials, Consumer Discretionary, Consumer Staples, Energy, Industrials, Materials, Real Estate, Utilities, Communication Services.',
    indicates: 'Different sectors perform differently depending on the economic cycle. Technology tends to outperform in growth environments; Utilities and Consumer Staples are defensive and hold up better in downturns.',
    useful: 'Understanding a company\'s sector helps you assess valuation (compare P/E to sector average), macro tailwinds/headwinds, and portfolio diversification. Never concentrate all holdings in one sector.',
  },
  INDUSTRY: {
    name: 'Industry',
    what: 'A more specific subcategory within a sector. For example, within the Technology sector you might find industries like Semiconductors, Software, or IT Services.',
    indicates: 'Industry dynamics (competition, regulation, innovation cycles) often matter more than broad sector trends. Semiconductor cycles, for instance, are quite different from software subscription dynamics.',
    useful: 'Comparing a company to its direct industry peers gives the most relevant context for valuation, margins, and growth expectations.',
  },
  W52_CHANGE: {
    name: '52-Week Price Change',
    what: 'The percentage change in the stock\'s price over the past 52 weeks (one year). Reflects the total return from price appreciation (excluding dividends).',
    indicates: 'Strong 52-week performance may signal momentum. Underperformance relative to peers or the market may signal fundamental problems — or a potential value opportunity if the business is still sound.',
    useful: 'Useful for momentum screening — stocks that have performed well over the past year tend to continue performing well in the near term (momentum effect). However, extreme moves may mean reversion is due.',
  },
  PRICE: {
    name: 'Current Price',
    what: 'The most recent traded price of the security. For stocks, this is the last transaction price during market hours, or the closing price when markets are closed.',
    indicates: 'Price alone means very little without context. A $5 stock is not "cheaper" than a $500 stock — what matters is valuation relative to earnings, assets, and growth.',
    useful: 'Use price in context with valuation multiples (P/E, P/B) to judge whether an asset is cheap or expensive. Absolute price matters for position sizing and options strikes.',
  },
  DAY_RANGE: {
    name: 'Day Range (High / Low)',
    what: 'The lowest and highest prices at which the stock traded during the current trading session.',
    indicates: 'A stock trading near the high of its day range shows buying strength. Near the low suggests selling pressure. A very wide range indicates high intraday volatility.',
    useful: 'Day range helps identify intraday support and resistance levels. If you\'re trading intraday, these levels often act as decision points for entries and exits.',
  },
  W52_RANGE: {
    name: '52-Week Range (High / Low)',
    what: 'The lowest and highest prices the stock has traded at over the past 52 weeks.',
    indicates: 'Price near the 52-week high suggests strong momentum. Near the 52-week low may suggest weakness, overselling, or a value opportunity. The midpoint of the range gives a sense of "fair value" from a mean-reversion perspective.',
    useful: 'Many institutional investors use 52-week highs and lows as reference points. Breakouts above the 52-week high often attract significant momentum buying.',
  },
  AI_DIRECTION: {
    name: 'AI Direction (Bullish / Bearish / Neutral)',
    what: 'The overall directional bias generated by the AI after analysing all available technical, fundamental, and news data for the symbol.',
    indicates: 'Bullish = the balance of evidence suggests the price is more likely to rise. Bearish = more likely to fall. Neutral = no clear edge in either direction.',
    useful: 'This is a synthesis of many signals, not a guarantee. Always read the Bull Case and Bear Case sections to understand the reasoning and judge for yourself.',
  },
  CONFIDENCE: {
    name: 'AI Confidence Score',
    what: 'A 0–100 score indicating how strongly the data supports the stated directional view. A high score means most indicators agree; a low score means conflicting signals.',
    indicates: '70–100: strong conviction. 50–69: moderate — some conflicting signals. Below 50: very mixed evidence, high uncertainty.',
    useful: 'Use confidence to size your conviction. A 90% bullish signal warrants more attention than a 55% bullish signal. Never treat any score as a certainty — markets are inherently uncertain.',
  },
  ENTRY: {
    name: 'Suggested Entry Price',
    what: 'The price level at which the AI suggests entering a position, based on current technical levels (support zones, recent lows, moving averages).',
    indicates: 'Buying near a suggested entry gives you a better risk/reward ratio. Chasing a stock far above the entry level increases risk.',
    useful: 'Use this as a reference zone, not a precise number. Set limit orders slightly above the entry level (for buys) to increase your chance of getting filled.',
  },
  STOP_LOSS: {
    name: 'Stop Loss',
    what: 'The price level at which you should exit a losing position to cap your maximum loss. Placed below a key support level (for long trades).',
    indicates: 'A well-placed stop loss sits below a level where, if breached, the original thesis is invalidated. It\'s not about being right — it\'s about limiting damage when you\'re wrong.',
    useful: 'Stop losses are the single most important risk management tool. Never enter a trade without one. Many professional traders risk no more than 1–2% of their portfolio on any single trade.',
  },
  TAKE_PROFIT: {
    name: 'Take Profit',
    what: 'The target price at which you plan to close a profitable position and realise your gains. Set at a logical resistance level, a key technical target, or a defined risk/reward multiple.',
    indicates: 'Take profit levels should be set before entering the trade, not after the price moves. Moving take profit further away mid-trade (hoping for more) is a common mistake that reduces overall returns.',
    useful: 'Having a defined take profit enforces discipline. It also allows you to calculate the risk/reward ratio before entering — if the risk/reward is below 2:1, the trade may not be worth taking.',
  },
  RR: {
    name: 'Risk/Reward Ratio (R/R)',
    what: 'The ratio of potential profit to potential loss on a trade. Calculated as: (Take Profit − Entry) ÷ (Entry − Stop Loss). A 2.5:1 ratio means you stand to gain $2.50 for every $1 you risk.',
    indicates: 'A ratio below 1:1 means you risk more than you stand to gain — generally poor. 2:1 is the minimum most professionals accept. 3:1 or above is excellent.',
    useful: 'Even if you are right only 40% of the time, a consistent 2:1 risk/reward will keep you profitable. Risk/reward is more important than win rate. A setup with great R/R but low confidence can still be worth taking.',
  },
  TIME_HORIZON: {
    name: 'Time Horizon',
    what: 'The estimated time frame over which the AI\'s directional analysis is expected to play out. Short-term = days to weeks. Medium-term = 1–3 months. Long-term = 6+ months.',
    indicates: 'Technical analysis is more relevant for short/medium-term calls. Fundamental analysis drives long-term outcomes. The time horizon helps you choose the right chart timeframe and the right type of analysis to focus on.',
    useful: 'Aligning your holding period with the time horizon improves outcomes. A trade called for 1–4 weeks should probably use a daily chart for entry/exit, not a 5-minute chart.',
  },
};

/* ── State ─────────────────────────────────────────────────────────────── */
let currentSymbol = null;
let currentQuote = null;
let currentTech = null;
let currentFund = null;
let currentNews = null;
let currentAI = null;
let tvWidget = null;
let activeTab = 'technicals';
let pollTimer = null;
let watchlistPollTimer = null;
let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
let alerts = [];

/* ── DOM refs ───────────────────────────────────────────────────────────── */
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const content = document.getElementById('content');
const quoteCard = document.getElementById('quoteCard');
const analyzeBtn = document.getElementById('analyzeBtn');
const reportBtn = document.getElementById('reportBtn');
const addWatchlistBtn = document.getElementById('addWatchlistBtn');
const tabsNav = document.getElementById('tabsNav');
const tabContent = document.getElementById('tabContent');
const chartTitle = document.getElementById('chartTitle');
const pollIntervalSel = document.getElementById('pollInterval');
const bellBtn = document.getElementById('bellBtn');
const alertPanel = document.getElementById('alertPanel');
const alertBadge = document.getElementById('alertBadge');
const alertList = document.getElementById('alertList');
const closeAlerts = document.getElementById('closeAlerts');
const watchlistToggle = document.getElementById('watchlistToggle');
const watchlistPanel = document.getElementById('watchlistPanel');
const closeWatchlist = document.getElementById('closeWatchlist');
const watchlistItems = document.getElementById('watchlistItems');
const watchlistPollSel = document.getElementById('watchlistPollInterval');
const reportOverlay = document.getElementById('reportOverlay');
const reportModal = document.getElementById('reportModal');
const reportTitle = document.getElementById('reportTitle');
const reportBody = document.getElementById('reportBody');
const closeReport = document.getElementById('closeReport');
const metricTip = document.getElementById('metricTip');
const tipName = document.getElementById('tipName');
const tipWhat = document.getElementById('tipWhat');
const tipIndicates = document.getElementById('tipIndicates');
const tipUseful = document.getElementById('tipUseful');
const tipClose = document.getElementById('tipClose');
const learnBtn = document.getElementById('learnBtn');
const learnPanel = document.getElementById('learnPanel');
const closeLearn = document.getElementById('closeLearn');
const learnTabsNav = document.getElementById('learnTabsNav');
const learnContent = document.getElementById('learnContent');
const searchDropdown = document.getElementById('searchDropdown');
const portfolioBtn = document.getElementById('portfolioBtn');
const portfolioPanel = document.getElementById('portfolioPanel');
const closePortfolio = document.getElementById('closePortfolio');
const portfolioForm = document.getElementById('portfolioForm');
const portfolioResults = document.getElementById('portfolioResults');
const pfBuildBtn = document.getElementById('pfBuildBtn');
const pfHoldings = document.getElementById('pfHoldings');
const pfThesis = document.getElementById('pfThesis');

/* ── Search ─────────────────────────────────────────────────────────────── */
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const sym = searchInput.value.trim().toUpperCase();
  if (sym) loadSymbol(sym);
});

async function loadSymbol(sym) {
  currentSymbol = sym;
  currentAI = null;
  emptyState.hidden = true;
  content.hidden = false;
  quoteCard.innerHTML = '<div class="loading-placeholder">Loading…</div>';
  analyzeBtn.disabled = true;
  reportBtn.disabled = true;
  addWatchlistBtn.disabled = true;
  chartTitle.textContent = sym;

  initChart(sym, currentInterval());
  renderTab('technicals');

  const [q, t, f, n] = await Promise.all([
    apiFetch(`/api/quote/${sym}`),
    apiFetch(`/api/technicals/${sym}`),
    apiFetch(`/api/fundamentals/${sym}`),
    apiFetch(`/api/news/${sym}`),
  ]);

  currentQuote = q;
  currentTech = t;
  currentFund = f;
  currentNews = n;

  renderQuoteCard();
  analyzeBtn.disabled = false;
  reportBtn.disabled = false;
  addWatchlistBtn.disabled = false;

  renderTab(activeTab === 'ai' ? 'technicals' : activeTab);
  setTab(activeTab === 'ai' ? 'technicals' : activeTab);

  startPoll();
}

async function apiFetch(url, opts) {
  try {
    const r = await fetch(url, opts);
    return r.ok ? r.json() : null;
  } catch { return null; }
}

/* ── Search Autocomplete ────────────────────────────────────────────────── */
let _sdTimer = null;
let _sdActive = -1;
let _sdItems = [];

searchInput.addEventListener('input', () => {
  clearTimeout(_sdTimer);
  const q = searchInput.value.trim();
  if (!q) { searchDropdown.hidden = true; return; }
  _sdTimer = setTimeout(() => fetchDropdown(q), 250);
});

async function fetchDropdown(q) {
  const results = await apiFetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!results || !results.length) { searchDropdown.hidden = true; return; }
  _sdItems = results;
  _sdActive = -1;
  searchDropdown.innerHTML = results.map((r, i) => `
    <div class="sd-item" data-idx="${i}">
      <span class="sd-sym">${esc(r.symbol)}</span>
      <span class="sd-name">${esc(r.name)}</span>
      <span class="sd-type">${esc(r.asset_type || r.exchange || '')}</span>
    </div>`).join('');
  searchDropdown.hidden = false;

  searchDropdown.querySelectorAll('.sd-item').forEach(item => {
    item.addEventListener('mousedown', e => {
      e.preventDefault();
      selectDropdownItem(parseInt(item.dataset.idx));
    });
  });
}

function selectDropdownItem(idx) {
  const r = _sdItems[idx];
  if (!r) return;
  searchInput.value = r.symbol;
  searchDropdown.hidden = true;
  loadSymbol(r.symbol);
}

function moveDropdown(dir) {
  const items = searchDropdown.querySelectorAll('.sd-item');
  if (!items.length) return;
  items[_sdActive]?.classList.remove('active');
  _sdActive = Math.max(-1, Math.min(items.length - 1, _sdActive + dir));
  if (_sdActive >= 0) items[_sdActive].classList.add('active');
}

searchInput.addEventListener('keydown', e => {
  if (searchDropdown.hidden) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); moveDropdown(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); moveDropdown(-1); }
  else if (e.key === 'Enter' && _sdActive >= 0) { e.preventDefault(); selectDropdownItem(_sdActive); }
  else if (e.key === 'Escape') { searchDropdown.hidden = true; }
});

searchForm.addEventListener('submit', () => { searchDropdown.hidden = true; });
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) searchDropdown.hidden = true;
});

/* ── Chart ──────────────────────────────────────────────────────────────── */
function currentInterval() {
  const btn = document.querySelector('.tv-btn.active');
  return btn ? btn.dataset.interval : 'D';
}

function initChart(sym, interval) {
  document.getElementById('tvChart').innerHTML = '';
  if (tvWidget) { try { tvWidget.remove(); } catch {} tvWidget = null; }

  const map = { D: 'D', W: 'W', M: 'M' };
  tvWidget = new TradingView.widget({
    container_id: 'tvChart',
    symbol: sym,
    interval: map[interval] || 'D',
    theme: 'dark',
    style: '1',
    locale: 'en',
    toolbar_bg: '#1a1d26',
    enable_publishing: false,
    allow_symbol_change: false,
    hide_side_toolbar: false,
    withdateranges: true,
    hide_top_toolbar: false,
    autosize: true,
    studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
  });
}

document.querySelectorAll('.tv-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tv-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (currentSymbol) initChart(currentSymbol, btn.dataset.interval);
  });
});

/* ── Quote card ─────────────────────────────────────────────────────────── */
function renderQuoteCard() {
  const q = currentQuote;
  if (!q || q.error) { quoteCard.innerHTML = `<p class="muted">Could not load quote.</p>`; return; }

  const isPos = (q.change_pct ?? 0) >= 0;
  const chgSign = isPos ? '+' : '';
  const chgClass = isPos ? 'pos' : 'neg';
  const arrow = isPos ? '▲' : '▼';

  quoteCard.innerHTML = `
    <div class="quote-symbol">${q.symbol} &nbsp;·&nbsp; ${q.exchange || ''} &nbsp;·&nbsp; ${q.asset_type || ''}</div>
    <div class="quote-name">${q.name || q.symbol}</div>
    <div class="quote-price">${fmt(q.price, q.currency)}</div>
    <div class="quote-change ${chgClass}">${arrow} ${chgSign}${fmt2(q.change)} (${chgSign}${fmt2(q.change_pct)}%)</div>
    <div class="quote-stats">
      <div class="quote-stat"><label data-tip="DAY_RANGE">Day Low</label><span>${fmt(q.day_low, q.currency)}</span></div>
      <div class="quote-stat"><label data-tip="DAY_RANGE">Day High</label><span>${fmt(q.day_high, q.currency)}</span></div>
      <div class="quote-stat"><label data-tip="W52_RANGE">52W Low</label><span>${fmt(q.week52_low, q.currency)}</span></div>
      <div class="quote-stat"><label data-tip="W52_RANGE">52W High</label><span>${fmt(q.week52_high, q.currency)}</span></div>
    </div>`;
}

/* ── Tabs ───────────────────────────────────────────────────────────────── */
tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTab(btn.dataset.tab);
    renderTab(btn.dataset.tab);
  });
});

function setTab(tab) {
  activeTab = tab;
  tabsNav.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
}

function renderTab(tab) {
  switch (tab) {
    case 'technicals':   tabContent.innerHTML = buildTechnicals(); break;
    case 'fundamentals': tabContent.innerHTML = buildFundamentals(); break;
    case 'news':         tabContent.innerHTML = buildNews(); break;
    case 'ai':           renderAITab(); break;
  }
}

/* ── Technicals ─────────────────────────────────────────────────────────── */
function buildTechnicals() {
  const t = currentTech;
  if (!t || t.error) return '<p class="muted">Technicals unavailable.</p>';

  const rsi = t.rsi;
  const rsiClass = rsi < 30 ? 'badge-bull' : rsi > 70 ? 'badge-bear' : 'badge-neutral';
  const rsiLabel = rsi < 30 ? 'Oversold' : rsi > 70 ? 'Overbought' : 'Neutral';
  const rsiPct = rsi != null ? Math.min(100, Math.max(0, rsi)) : 50;
  const rsiColor = rsi < 30 ? 'var(--pos)' : rsi > 70 ? 'var(--neg)' : 'var(--accent)';

  const macd = t.macd || {};
  const macdBull = t.macd_bullish;
  const macdBadge = macdBull === true ? 'badge-bull' : macdBull === false ? 'badge-bear' : 'badge-neutral';
  const macdLabel = macdBull === true ? 'Bullish' : macdBull === false ? 'Bearish' : 'N/A';

  const gc = t.golden_cross;
  const gcBadge = gc === true ? 'badge-bull' : gc === false ? 'badge-bear' : 'badge-neutral';
  const gcLabel = gc === true ? 'Golden Cross' : gc === false ? 'Death Cross' : 'N/A';

  const bb = t.bollinger || {};
  const sma = t.sma || {};
  const p = t.current_price;

  const volRatio = t.volume_ratio;
  const volBadge = volRatio > 1.5 ? 'badge-warn' : 'badge-neutral';
  const volLabel = volRatio > 1.5 ? 'High Volume' : volRatio < 0.5 ? 'Low Volume' : 'Normal';

  return `<div class="tech-grid">

    <div class="tech-item">
      <label data-tip="RSI">RSI (14)</label>
      <div class="tech-val" style="color:${rsiColor}">${n2(rsi)}</div>
      <span class="tech-badge ${rsiClass}">${rsiLabel}</span>
      <div class="rsi-bar-wrap">
        <div class="rsi-bar-track">
          <div class="rsi-bar-fill" style="width:${rsiPct}%;background:${rsiColor}"></div>
        </div>
        <div class="rsi-labels"><span>0</span><span>30</span><span>70</span><span>100</span></div>
      </div>
    </div>

    <div class="tech-item">
      <label data-tip="MACD">MACD (12/26/9)</label>
      <div class="tech-val">${n2(macd.macd)}</div>
      <div class="tech-sub">Signal: ${n2(macd.signal)} &nbsp;|&nbsp; Hist: ${n2(macd.histogram)}</div>
      <span class="tech-badge ${macdBadge}">${macdLabel}</span>
    </div>

    <div class="tech-item">
      <label data-tip="MA_CROSS">MA Crossover</label>
      <div class="tech-val" style="font-size:14px">${gcLabel}</div>
      <div class="tech-sub">SMA50: ${n2(sma.sma50)} &nbsp;/&nbsp; SMA200: ${n2(sma.sma200)}</div>
      <span class="tech-badge ${gcBadge}">${gcLabel}</span>
    </div>

    <div class="tech-item">
      <label data-tip="BOLLINGER">Bollinger Bands</label>
      <div class="tech-val" style="font-size:13px">${bb.position || 'N/A'}</div>
      <div class="tech-sub">Upper: ${n2(bb.upper)} &nbsp;·&nbsp; Mid: ${n2(bb.mid)} &nbsp;·&nbsp; Lower: ${n2(bb.lower)}</div>
    </div>

    <div class="tech-item">
      <label data-tip="SMA">Moving Averages</label>
      <div class="tech-sub" style="line-height:1.9">
        SMA20: <b>${n2(sma.sma20)}</b> ${p && sma.sma20 ? (p > sma.sma20 ? '↑' : '↓') : ''}<br>
        SMA50: <b>${n2(sma.sma50)}</b> ${p && sma.sma50 ? (p > sma.sma50 ? '↑' : '↓') : ''}<br>
        SMA200: <b>${n2(sma.sma200)}</b> ${p && sma.sma200 ? (p > sma.sma200 ? '↑' : '↓') : ''}
      </div>
    </div>

    <div class="tech-item">
      <label data-tip="VOLUME">Volume (vs 20d avg)</label>
      <div class="tech-val">${volRatio != null ? (volRatio * 100).toFixed(0) + '%' : 'N/A'}</div>
      <span class="tech-badge ${volBadge}">${volLabel}</span>
    </div>

  </div>`;
}

/* ── Fundamentals ───────────────────────────────────────────────────────── */
function buildFundamentals() {
  const f = currentFund;
  if (!f || f.error) return '<p class="muted">Fundamentals unavailable (may be crypto/forex).</p>';

  const pct = v => v != null ? (v * 100).toFixed(2) + '%' : 'N/A';
  const num = v => v != null ? Number(v).toFixed(2) : 'N/A';

  return `
    <div class="fund-grid">
      <div class="fund-item"><label data-tip="MARKET_CAP">Market Cap</label><span>${f.market_cap || 'N/A'}</span></div>
      <div class="fund-item"><label data-tip="PE">P/E Ratio (TTM)</label><span>${num(f.pe_ratio)}</span></div>
      <div class="fund-item"><label data-tip="FORWARD_PE">Forward P/E</label><span>${num(f.forward_pe)}</span></div>
      <div class="fund-item"><label data-tip="EPS">EPS (TTM)</label><span>${num(f.eps)}</span></div>
      <div class="fund-item"><label data-tip="REVENUE">Revenue</label><span>${f.revenue || 'N/A'}</span></div>
      <div class="fund-item"><label data-tip="PROFIT_MARGIN">Profit Margin</label><span>${pct(f.profit_margin)}</span></div>
      <div class="fund-item"><label data-tip="BETA">Beta</label><span>${num(f.beta)}</span></div>
      <div class="fund-item"><label data-tip="DIVIDEND">Dividend Yield</label><span>${pct(f.dividend_yield)}</span></div>
      <div class="fund-item"><label data-tip="SECTOR">Sector</label><span>${f.sector || 'N/A'}</span></div>
      <div class="fund-item"><label data-tip="INDUSTRY">Industry</label><span>${f.industry || 'N/A'}</span></div>
      <div class="fund-item"><label data-tip="W52_CHANGE">52W Change</label><span class="${(f.week52_change??0)>=0?'':'neg'}">${pct(f.week52_change)}</span></div>
      <div class="fund-item"><label>Employees</label><span>${f.employees ? f.employees.toLocaleString() : 'N/A'}</span></div>
    </div>
    ${f.description ? `<div class="fund-desc">${f.description}</div>` : ''}`;
}

/* ── News ───────────────────────────────────────────────────────────────── */
function buildNews() {
  const news = currentNews;
  if (!news || news.error || !news.length) return '<p class="muted">No news available.</p>';

  const now = Date.now() / 1000;
  const items = news.map(n => {
    const age = now - (n.published || 0);
    const isNew = age < 86400;
    const dateStr = n.published ? new Date(n.published * 1000).toLocaleString() : '';
    return `<a class="news-item" href="${n.link}" target="_blank" rel="noopener">
      <div class="news-dot${isNew ? '' : ' old'}"></div>
      <div class="news-body">
        <div class="news-title">${esc(n.title)}</div>
        <div class="news-meta">
          <span>${esc(n.publisher)}</span>
          <span>${dateStr}</span>
          ${isNew ? '<span style="color:var(--pos)">● New</span>' : ''}
        </div>
      </div>
    </a>`;
  }).join('');

  return `<div class="news-list">${items}</div>`;
}

/* ── AI Analysis ────────────────────────────────────────────────────────── */
analyzeBtn.addEventListener('click', runAnalysis);

async function runAnalysis() {
  setTab('ai');
  tabContent.innerHTML = `<div class="ai-loading"><div class="spinner"></div> Analyzing ${currentSymbol} with Claude AI…</div>`;

  const result = await apiFetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      symbol: currentSymbol,
      quote: currentQuote,
      technicals: currentTech,
      fundamentals: currentFund,
      news: currentNews,
    }),
  });

  currentAI = result;
  renderTab('ai');

  // Trigger entry/exit notification if action is BUY or SELL
  if (result && result.entry_signal) {
    const action = result.entry_signal.action;
    if (action === 'BUY' || action === 'SELL') {
      pushAlert(currentSymbol, action.toLowerCase(), `${action}: ${result.entry_signal.trigger}`);
    }
  }
}

function renderAITab() {
  if (!currentAI) {
    tabContent.innerHTML = `<p class="muted">Click "Analyze with AI" to generate an analysis.</p>`;
    return;
  }
  if (currentAI.error) {
    tabContent.innerHTML = `<p class="muted">Analysis failed: ${esc(currentAI.error)}</p>`;
    return;
  }

  const ai = currentAI;
  const dir = (ai.direction || 'neutral').toLowerCase();
  const dirClass = dir === 'bullish' ? 'dir-bull' : dir === 'bearish' ? 'dir-bear' : 'dir-neutral';
  const dirIcon = dir === 'bullish' ? '▲' : dir === 'bearish' ? '▼' : '—';
  const conf = ai.confidence ?? 0;

  const listItems = arr => (arr || []).map(x => `<li>${esc(x)}</li>`).join('');

  const ent = ai.entry_signal || {};
  const ex = ai.exit_signal || {};
  const entAction = (ent.action || 'WAIT').toLowerCase();
  const exAction = (ex.action || 'HOLD').toLowerCase().replace(' ', '-');

  tabContent.innerHTML = `
    <div class="ai-direction ${dirClass}">${dirIcon} ${capitalize(dir)}</div>
    <div class="confidence-row">
      <span class="confidence-label">Confidence</span>
      <div class="confidence-track"><div class="confidence-fill" style="width:${conf}%"></div></div>
      <span class="confidence-pct">${conf}%</span>
    </div>
    <div class="ai-summary">${esc(ai.summary || '')}</div>

    <div class="ai-cols">
      <div class="ai-col bull">
        <h4>Bull Case</h4>
        <ul>${listItems(ai.bull_case)}</ul>
      </div>
      <div class="ai-col bear">
        <h4>Bear Case</h4>
        <ul>${listItems(ai.bear_case)}</ul>
      </div>
    </div>

    <div class="ai-row">
      <div class="ai-section">
        <h4>Key Catalysts</h4>
        <ul>${listItems(ai.key_catalysts)}</ul>
      </div>
      <div class="ai-section">
        <h4>Risks</h4>
        <ul>${listItems(ai.risks)}</ul>
      </div>
    </div>

    <h4 style="font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:12px">Entry / Exit Signals</h4>
    <div class="signals-grid">

      <div class="signal-card ${entAction}">
        <div class="signal-action ${entAction}">
          ${entAction === 'buy' ? '▲' : entAction === 'sell' ? '▼' : '—'} ${ent.action || 'WAIT'}
        </div>
        <div class="signal-trigger">${esc(ent.trigger || '')}</div>
        <div class="signal-levels">
          <div class="signal-level entry"><label data-tip="ENTRY">Entry</label><span>${esc(ent.suggested_entry || '—')}</span></div>
          <div class="signal-level rr"><label data-tip="RR">R/R</label><span>${esc(ent.risk_reward || '—')}</span></div>
          <div class="signal-level tp"><label data-tip="TAKE_PROFIT">Take Profit</label><span>${esc(ent.take_profit || '—')}</span></div>
          <div class="signal-level sl"><label data-tip="STOP_LOSS">Stop Loss</label><span>${esc(ent.stop_loss || '—')}</span></div>
        </div>
      </div>

      <div class="signal-card ${exAction}">
        <div class="signal-action ${exAction}">
          ${ex.action || 'HOLD'}
        </div>
        <div class="signal-trigger">${esc(ex.trigger || '')}</div>
        ${ex.note ? `<div class="signal-trigger" style="margin-top:6px;font-style:italic">${esc(ex.note)}</div>` : ''}
      </div>

    </div>
    <div class="horizon-badge">Time horizon: ${esc(ai.time_horizon || 'N/A')}</div>`;
}

/* ── Polling (current symbol) ───────────────────────────────────────────── */
pollIntervalSel.addEventListener('change', startPoll);

function startPoll() {
  clearInterval(pollTimer);
  const mins = parseInt(pollIntervalSel.value, 10);
  if (!mins || !currentSymbol) return;
  pollTimer = setInterval(async () => {
    const q = await apiFetch(`/api/quote/${currentSymbol}`);
    if (q && !q.error) {
      currentQuote = q;
      renderQuoteCard();
    }
  }, mins * 60 * 1000);
}

/* ── Watchlist ──────────────────────────────────────────────────────────── */
watchlistToggle.addEventListener('click', () => watchlistPanel.classList.toggle('open'));
closeWatchlist.addEventListener('click', () => watchlistPanel.classList.remove('open'));

addWatchlistBtn.addEventListener('click', () => {
  if (!currentSymbol || watchlist.includes(currentSymbol)) return;
  watchlist.push(currentSymbol);
  saveWatchlist();
  renderWatchlist();
  watchlistPanel.classList.add('open');
});

function saveWatchlist() {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function renderWatchlist() {
  if (!watchlist.length) {
    watchlistItems.innerHTML = '<li style="padding:12px 16px;color:var(--muted);font-size:13px">No symbols yet.</li>';
    return;
  }
  watchlistItems.innerHTML = watchlist.map(sym => `
    <li class="watchlist-item" data-sym="${sym}">
      <div>
        <div class="wi-sym">${sym}</div>
        <div class="wi-price muted" id="wq-${sym}">—</div>
      </div>
      <button class="wi-remove" data-sym="${sym}" title="Remove">✕</button>
    </li>`).join('');

  watchlistItems.querySelectorAll('.watchlist-item').forEach(li => {
    li.addEventListener('click', e => {
      if (e.target.classList.contains('wi-remove')) return;
      const sym = li.dataset.sym;
      searchInput.value = sym;
      loadSymbol(sym);
      watchlistPanel.classList.remove('open');
    });
  });

  watchlistItems.querySelectorAll('.wi-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      watchlist = watchlist.filter(s => s !== btn.dataset.sym);
      saveWatchlist();
      renderWatchlist();
    });
  });

  refreshWatchlistPrices();
}

async function refreshWatchlistPrices() {
  await Promise.all(watchlist.map(async sym => {
    const q = await apiFetch(`/api/quote/${sym}`);
    const el = document.getElementById(`wq-${sym}`);
    if (!el) return;
    if (q && !q.error && q.price != null) {
      const isPos = (q.change_pct ?? 0) >= 0;
      el.innerHTML = `<span style="color:var(--text);font-weight:500">${fmt(q.price, q.currency)}</span>
        <span style="color:${isPos ? 'var(--pos)' : 'var(--neg)'};font-size:11px"> ${isPos ? '+' : ''}${fmt2(q.change_pct)}%</span>`;
    }
  }));
}

watchlistPollSel.addEventListener('change', startWatchlistPoll);

function startWatchlistPoll() {
  clearInterval(watchlistPollTimer);
  const mins = parseInt(watchlistPollSel.value, 10);
  if (!mins) return;

  // Cache last-known technicals for alert comparisons
  let prevTech = {};

  watchlistPollTimer = setInterval(async () => {
    await refreshWatchlistPrices();

    for (const sym of watchlist) {
      const [q, t] = await Promise.all([apiFetch(`/api/quote/${sym}`), apiFetch(`/api/technicals/${sym}`)]);
      if (!q || !t) continue;

      const prev = prevTech[sym] || {};

      // RSI oversold / overbought crossing
      if (prev.rsi != null && t.rsi != null) {
        if (prev.rsi >= 30 && t.rsi < 30)
          pushAlert(sym, 'rsi', `${sym}: RSI dropped into oversold territory (${t.rsi?.toFixed(1)})`);
        if (prev.rsi <= 70 && t.rsi > 70)
          pushAlert(sym, 'rsi', `${sym}: RSI entered overbought territory (${t.rsi?.toFixed(1)})`);
      }

      // MACD crossover
      if (prev.macd_bullish != null && prev.macd_bullish !== t.macd_bullish) {
        if (t.macd_bullish) pushAlert(sym, 'buy', `${sym}: MACD turned bullish`);
        else pushAlert(sym, 'sell', `${sym}: MACD turned bearish`);
      }

      // Price alert from localStorage
      const priceAlert = parseFloat(localStorage.getItem(`alert_price_${sym}`) || '0');
      if (priceAlert > 0 && q.price != null) {
        const prev_price = parseFloat(localStorage.getItem(`alert_price_prev_${sym}`) || q.price);
        if ((prev_price < priceAlert && q.price >= priceAlert) || (prev_price > priceAlert && q.price <= priceAlert))
          pushAlert(sym, 'rsi', `${sym} hit your price alert at $${priceAlert}`);
        localStorage.setItem(`alert_price_prev_${sym}`, q.price);
      }

      prevTech[sym] = t;
    }
  }, mins * 60 * 1000);
}

/* ── Alerts ─────────────────────────────────────────────────────────────── */
bellBtn.addEventListener('click', () => {
  alertPanel.hidden = !alertPanel.hidden;
  if (!alertPanel.hidden) {
    alertBadge.hidden = true;
    alertBadge.textContent = '0';
  }
});
closeAlerts.addEventListener('click', () => { alertPanel.hidden = true; });

function pushAlert(sym, type, msg) {
  const item = { sym, type, msg, time: new Date().toLocaleTimeString() };
  alerts.unshift(item);

  // In-app
  alertBadge.hidden = false;
  const count = parseInt(alertBadge.textContent || '0') + 1;
  alertBadge.textContent = count;

  const div = document.createElement('div');
  div.className = 'alert-item';
  div.innerHTML = `<span class="alert-tag ${type}">${type.toUpperCase()}</span>
    <div>${esc(msg)}</div>
    <div class="news-meta"><span>${item.time}</span></div>`;
  if (alertList.querySelector('.muted')) alertList.innerHTML = '';
  alertList.prepend(div);

  // Browser push
  if (Notification.permission === 'granted') {
    new Notification(`Market Analyst — ${sym}`, { body: msg, icon: '' });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') new Notification(`Market Analyst — ${sym}`, { body: msg });
    });
  }
}

/* ── Report ─────────────────────────────────────────────────────────────── */
reportBtn.addEventListener('click', generateReport);
function closeReportModal() { reportOverlay.hidden = true; }
closeReport.addEventListener('click', closeReportModal);
reportOverlay.addEventListener('click', e => { if (e.target === reportOverlay) closeReportModal(); });

async function generateReport() {
  if (!currentSymbol) return;
  reportTitle.textContent = `${currentSymbol} — Market Report`;
  reportBody.innerHTML = '<div class="loading-placeholder">Generating report…</div>';
  reportOverlay.hidden = false;

  const data = await apiFetch(`/api/report/${currentSymbol}`);
  if (!data || data.error) {
    reportBody.innerHTML = `<p class="muted">Failed to generate report.</p>`;
    return;
  }

  const q = data.quote || {};
  const t = data.technicals || {};
  const f = data.fundamentals || {};
  const news = data.news || [];
  const isPos = (q.change_pct ?? 0) >= 0;

  const aiSummary = currentAI
    ? `<div class="report-section">
        <h3>AI Analysis</h3>
        <div class="ai-direction ${currentAI.direction === 'bullish' ? 'dir-bull' : currentAI.direction === 'bearish' ? 'dir-bear' : 'dir-neutral'}" style="margin-bottom:12px">
          ${capitalize(currentAI.direction || 'neutral')} — ${currentAI.confidence ?? '?'}% confidence
        </div>
        <div class="ai-summary">${esc(currentAI.summary || '')}</div>
      </div>`
    : '';

  reportBody.innerHTML = `
    <div class="report-section">
      <h3>Quote — ${new Date(data.generated_at).toLocaleString()}</h3>
      <table class="report-table">
        <tr><td>Symbol</td><td>${q.symbol}</td></tr>
        <tr><td>Name</td><td>${esc(q.name || '')}</td></tr>
        <tr><td>Price</td><td style="font-size:18px;font-weight:700">${fmt(q.price, q.currency)}</td></tr>
        <tr><td>Change</td><td style="color:${isPos ? 'var(--pos)' : 'var(--neg)'}">${isPos ? '+' : ''}${fmt2(q.change)} (${isPos ? '+' : ''}${fmt2(q.change_pct)}%)</td></tr>
      </table>
    </div>

    <div class="report-section">
      <h3>Technicals</h3>
      <table class="report-table">
        <tr><td>RSI (14)</td><td>${n2(t.rsi)}</td></tr>
        <tr><td>MACD Signal</td><td>${t.macd_bullish === true ? '🟢 Bullish' : t.macd_bullish === false ? '🔴 Bearish' : 'N/A'}</td></tr>
        <tr><td>Bollinger Band Position</td><td>${t.bollinger?.position || 'N/A'}</td></tr>
        <tr><td>MA Crossover</td><td>${t.golden_cross === true ? '🟢 Golden Cross' : t.golden_cross === false ? '🔴 Death Cross' : 'N/A'}</td></tr>
        <tr><td>SMA 50</td><td>${n2(t.sma?.sma50)}</td></tr>
        <tr><td>SMA 200</td><td>${n2(t.sma?.sma200)}</td></tr>
        <tr><td>Volume vs 20d Avg</td><td>${t.volume_ratio != null ? (t.volume_ratio * 100).toFixed(0) + '%' : 'N/A'}</td></tr>
      </table>
    </div>

    <div class="report-section">
      <h3>Fundamentals</h3>
      <table class="report-table">
        <tr><td>Market Cap</td><td>${f.market_cap || 'N/A'}</td></tr>
        <tr><td>P/E Ratio</td><td>${f.pe_ratio != null ? Number(f.pe_ratio).toFixed(2) : 'N/A'}</td></tr>
        <tr><td>EPS</td><td>${f.eps != null ? Number(f.eps).toFixed(2) : 'N/A'}</td></tr>
        <tr><td>Beta</td><td>${f.beta != null ? Number(f.beta).toFixed(2) : 'N/A'}</td></tr>
        <tr><td>Sector</td><td>${f.sector || 'N/A'}</td></tr>
        <tr><td>Dividend Yield</td><td>${f.dividend_yield != null ? (f.dividend_yield * 100).toFixed(2) + '%' : 'N/A'}</td></tr>
      </table>
    </div>

    ${aiSummary}

    <div class="report-section">
      <h3>Recent News</h3>
      ${news.map(n => `<div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:13px">
        <a href="${n.link}" target="_blank" style="color:var(--accent-h);text-decoration:none">${esc(n.title)}</a>
        <span style="color:var(--muted);font-size:11px;margin-left:8px">${esc(n.publisher)}</span>
      </div>`).join('')}
    </div>`;
}

/* ── Portfolio Builder ──────────────────────────────────────────────────── */
let pfChart = null;
let pfCurrentData = null;
let pfCurrentInputs = null;

portfolioBtn.addEventListener('click', () => portfolioPanel.classList.toggle('open'));
closePortfolio.addEventListener('click', () => portfolioPanel.classList.remove('open'));

const pfPosSlider = document.getElementById('pfPositions');
const pfPosAI = document.getElementById('pfPosAI');

pfPosSlider.addEventListener('input', function () {
  document.getElementById('pfPositionsVal').textContent = this.value;
});

pfPosAI.addEventListener('change', function () {
  pfPosSlider.classList.toggle('pf-ctrl-disabled', this.checked);
});
pfPosSlider.classList.toggle('pf-ctrl-disabled', pfPosAI.checked);

pfBuildBtn.addEventListener('click', () => buildPortfolio(false));
document.getElementById('pfRegenerateBtn').addEventListener('click', () => buildPortfolio(true));
document.getElementById('pfBackBtn').addEventListener('click', () => {
  portfolioResults.hidden = true;
  portfolioForm.hidden = false;
});
document.getElementById('pfExportBtn').addEventListener('click', exportPortfolioReport);

async function buildPortfolio(regenerate) {
  const inputs = (regenerate && pfCurrentInputs) ? pfCurrentInputs : collectPfInputs();
  pfCurrentInputs = inputs;

  portfolioForm.hidden = true;
  portfolioResults.hidden = false;
  pfHoldings.innerHTML = '<div class="loading-placeholder" style="padding:24px">Building your portfolio…</div>';
  pfThesis.innerHTML = '';
  if (pfChart) { pfChart.destroy(); pfChart = null; }

  const result = await apiFetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  });

  if (!result || result.error) {
    pfHoldings.innerHTML = `<p class="muted" style="padding:16px">Failed: ${esc((result && result.error) || 'unknown error')}</p>`;
    return;
  }

  pfCurrentData = result;
  renderPortfolioResults(result, inputs.capital, inputs.currency);
}

function collectPfInputs() {
  return {
    capital:   parseFloat(document.getElementById('pfCapital').value) || 10000,
    positions: pfPosAI.checked ? null : (parseInt(pfPosSlider.value) || 8),
    risk:      document.querySelector('input[name="pfRisk"]:checked')?.value || '',
    focus:     [...document.querySelectorAll('input[name="pfFocus"]:checked')].map(i => i.value),
    sectors:   [...document.querySelectorAll('input[name="pfSector"]:checked')].map(i => i.value),
    geography: document.querySelector('input[name="pfGeo"]:checked')?.value || '',
    currency:  document.getElementById('pfCurrency').value || 'USD',
  };
}

const PF_COLORS = [
  '#2962ff','#26a69a','#ef5350','#f59e0b','#a855f7','#ec4899',
  '#0ea5e9','#84cc16','#f97316','#06b6d4','#d946ef','#14b8a6',
];

function renderPortfolioResults(data, capital, currency) {
  const holdings = data.holdings || [];
  const currSym = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  // Doughnut chart
  const canvas = document.getElementById('portfolioChart');
  if (pfChart) pfChart.destroy();
  pfChart = new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: holdings.map(h => h.symbol),
      datasets: [{
        data: holdings.map(h => h.allocation_pct),
        backgroundColor: PF_COLORS.slice(0, holdings.length),
        borderColor: '#1a1d26',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%` } },
      },
      animation: { duration: 400 },
    },
  });

  // Holdings rows
  pfHoldings.innerHTML = holdings.map((h, i) => `
    <div class="pf-holding-row" data-idx="${i}">
      <div class="pf-holding-sym" style="color:${PF_COLORS[i % PF_COLORS.length]}">${esc(h.symbol)}</div>
      <div class="pf-holding-info">
        <div class="pf-holding-name">${esc(h.name)}</div>
        <div class="pf-holding-sector">${esc(h.sector || '')} · ${esc(h.asset_type || 'Stock')}</div>
        <div class="pf-holding-reason">${esc(h.reason || '')}</div>
        <input type="range" class="pf-slider" data-idx="${i}" min="0" max="50" step="0.5" value="${h.allocation_pct.toFixed(1)}">
      </div>
      <div class="pf-holding-right">
        <div class="pf-holding-pct" id="pfpct-${i}">${h.allocation_pct.toFixed(1)}%</div>
        <div class="pf-holding-amt" id="pfamt-${i}">${currSym}${Math.round(h.allocation_amount || 0).toLocaleString()}</div>
      </div>
    </div>`).join('');

  pfHoldings.querySelectorAll('.pf-slider').forEach(slider => {
    slider.addEventListener('input', () =>
      onPfSliderChange(parseInt(slider.dataset.idx), parseFloat(slider.value), capital, currency));
  });

  // Thesis + sector breakdown
  const sectors = data.sector_breakdown || {};
  const sectorBars = Object.entries(sectors).map(([s, pct], i) => `
    <div class="pf-sector-row">
      <span class="pf-sector-label">${esc(s)}</span>
      <div class="pf-sector-track"><div class="pf-sector-fill" style="width:${pct}%;background:${PF_COLORS[i % PF_COLORS.length]}"></div></div>
      <span class="pf-sector-pct">${pct}%</span>
    </div>`).join('');

  pfThesis.innerHTML = `
    ${data.thesis ? `<div class="pf-thesis-card"><h4>Portfolio Thesis</h4><p>${esc(data.thesis)}</p></div>` : ''}
    ${data.risk_assessment ? `<div class="pf-thesis-card"><h4>Risk Assessment</h4><p>${esc(data.risk_assessment)}</p></div>` : ''}
    ${sectorBars ? `<div class="pf-thesis-card"><h4>Sector Breakdown</h4>${sectorBars}</div>` : ''}
    ${data.expected_dividend_yield ? `<div class="pf-thesis-card"><h4>Expected Dividend Yield</h4><p>${esc(data.expected_dividend_yield)}</p></div>` : ''}
    ${data.diversification_note ? `<div class="pf-thesis-card"><h4>Diversification</h4><p>${esc(data.diversification_note)}</p></div>` : ''}`;
}

function onPfSliderChange(idx, newPct, capital, currency) {
  const holdings = pfCurrentData.holdings;
  const delta = newPct - holdings[idx].allocation_pct;
  const othersTotal = holdings.reduce((s, h, i) => i !== idx ? s + h.allocation_pct : s, 0);

  holdings[idx].allocation_pct = newPct;
  holdings[idx].allocation_amount = capital * newPct / 100;

  if (othersTotal > 0) {
    holdings.forEach((h, i) => {
      if (i !== idx) {
        h.allocation_pct = Math.max(0, h.allocation_pct - delta * (h.allocation_pct / othersTotal));
        h.allocation_amount = capital * h.allocation_pct / 100;
      }
    });
  }

  const currSym = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  holdings.forEach((h, i) => {
    const pEl = document.getElementById(`pfpct-${i}`);
    const aEl = document.getElementById(`pfamt-${i}`);
    if (pEl) pEl.textContent = h.allocation_pct.toFixed(1) + '%';
    if (aEl) aEl.textContent = currSym + Math.round(h.allocation_amount || 0).toLocaleString();
  });

  if (pfChart) {
    pfChart.data.datasets[0].data = holdings.map(h => h.allocation_pct);
    pfChart.update('none');
  }
}

function exportPortfolioReport() {
  if (!pfCurrentData) return;
  const data = pfCurrentData;
  const inputs = pfCurrentInputs || {};
  const currency = inputs.currency || 'USD';
  const currSym = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  const holdings = data.holdings || [];

  reportTitle.textContent = 'AI Portfolio Report';
  reportBody.innerHTML = `
    <div class="report-section">
      <h3>Portfolio Summary</h3>
      <table class="report-table">
        <tr><td>Capital</td><td>${currSym}${(inputs.capital || 0).toLocaleString()}</td></tr>
        <tr><td>Positions</td><td>${inputs.positions}</td></tr>
        <tr><td>Risk</td><td>${capitalize(inputs.risk || 'moderate')}</td></tr>
        <tr><td>Geography</td><td>${esc(inputs.geography || 'Global')}</td></tr>
        <tr><td>Expected Dividend Yield</td><td>${esc(data.expected_dividend_yield || 'N/A')}</td></tr>
      </table>
    </div>
    <div class="report-section">
      <h3>Holdings</h3>
      <table class="report-table">
        <tr style="font-size:10px;color:var(--muted)"><td>Symbol</td><td>Name / Sector</td><td style="text-align:right">%</td></tr>
        ${holdings.map(h => `<tr>
          <td style="font-weight:700;color:var(--accent-h)">${esc(h.symbol)}</td>
          <td>${esc(h.name)}<br><span style="font-size:11px;color:var(--muted)">${esc(h.sector||'')} · ${esc(h.reason||'')}</span></td>
          <td style="text-align:right;font-weight:700">${h.allocation_pct.toFixed(1)}%<br><span style="font-size:11px;color:var(--muted)">${currSym}${Math.round(h.allocation_amount||0).toLocaleString()}</span></td>
        </tr>`).join('')}
      </table>
    </div>
    ${data.thesis ? `<div class="report-section"><h3>Thesis</h3><p style="font-size:13px;line-height:1.7">${esc(data.thesis)}</p></div>` : ''}
    ${data.risk_assessment ? `<div class="report-section"><h3>Risk Assessment</h3><p style="font-size:13px;line-height:1.7">${esc(data.risk_assessment)}</p></div>` : ''}`;
  reportOverlay.hidden = false;
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
function fmt(v, currency = 'USD') {
  if (v == null) return 'N/A';
  const sym = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${sym}${Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
}

function fmt2(v) {
  return v != null ? Number(v).toFixed(2) : 'N/A';
}

function n2(v) {
  return v != null ? Number(v).toFixed(2) : 'N/A';
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Metric Tooltip ─────────────────────────────────────────────────────── */
function showTip(el) {
  const entry = METRIC_GLOSSARY[el.dataset.tip];
  if (!entry) return;
  tipName.textContent = entry.name;
  tipWhat.textContent = entry.what;
  tipIndicates.textContent = entry.indicates;
  tipUseful.textContent = entry.useful;
  metricTip.hidden = false;

  const tipW = 320;
  const tipH = metricTip.offsetHeight || 280;
  metricTip.style.left = Math.max(16, (window.innerWidth - tipW) / 2) + 'px';
  metricTip.style.top  = Math.max(16, (window.innerHeight - tipH) / 2) + 'px';
}

function hideTip() { metricTip.hidden = true; }

tabContent.addEventListener('click', e => {
  const el = e.target.closest('[data-tip]');
  if (el) { e.stopPropagation(); showTip(el); } else hideTip();
});
quoteCard.addEventListener('click', e => {
  const el = e.target.closest('[data-tip]');
  if (el) { e.stopPropagation(); showTip(el); } else hideTip();
});
tipClose.addEventListener('click', hideTip);
document.addEventListener('click', e => {
  if (!e.target.closest('#metricTip') && !e.target.closest('[data-tip]')) hideTip();
});

/* ── Learning Center ────────────────────────────────────────────────────── */
learnBtn.addEventListener('click', () => {
  learnPanel.classList.toggle('open');
  if (learnPanel.classList.contains('open') && !learnContent.innerHTML) renderLearnTab('guide');
});
closeLearn.addEventListener('click', () => learnPanel.classList.remove('open'));

learnTabsNav.querySelectorAll('.learn-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    learnTabsNav.querySelectorAll('.learn-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLearnTab(btn.dataset.ltab);
  });
});

function renderLearnTab(tab) {
  switch (tab) {
    case 'guide':       learnContent.innerHTML = lcGuide(); break;
    case 'technical':   learnContent.innerHTML = lcTechnical(); break;
    case 'fundamental': learnContent.innerHTML = lcFundamental(); break;
    case 'corporate':   learnContent.innerHTML = lcCorporate(); break;
    case 'resources':   learnContent.innerHTML = lcResources(); break;
  }
  learnContent.scrollTop = 0;
}

function lcGuide() {
  return `
  <div class="lc-section">
    <h2>Welcome to Market Analyst</h2>
    <p class="lc-subtitle">A complete walkthrough of every feature in this tool</p>
    <p>This tool is designed to help you make informed trading decisions by combining live market data, technical indicators, fundamental data, news, and AI-powered analysis in one place.</p>
  </div>

  <div class="lc-section">
    <h2>Searching a Symbol</h2>
    <p>Type a ticker symbol in the search bar at the top and press Search or Enter.</p>
    <div class="lc-card"><h3>Format examples</h3><p>
      <b>Stocks:</b> AAPL, MSFT, NVDA, TSLA<br>
      <b>ETFs:</b> SPY, QQQ, VTI, ARKK<br>
      <b>Crypto:</b> BTC-USD, ETH-USD, SOL-USD<br>
      <b>Forex:</b> EURUSD=X, GBPUSD=X, USDJPY=X<br>
      <b>Indices:</b> ^GSPC (S&amp;P 500), ^NDX (Nasdaq 100)
    </p></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>The Chart</h2>
    <p>The interactive TradingView chart loads automatically for any symbol. It includes built-in RSI and MACD overlays. Use the <b>1D / 1W / 1M</b> buttons to switch timeframes. You can zoom, draw trendlines, and change the chart type directly within the chart.</p>
    <div class="lc-highlight">Tip: Right-click on the chart for a full list of drawing tools and indicators you can add.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Quote Card</h2>
    <p>Shows the current price, day change, and key price levels. <b>Click any label</b> (Day Low, 52W High, etc.) to see a plain-English explanation of what it means.</p>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Tabs: Technicals, Fundamentals, News, AI Analysis</h2>

    <div class="lc-step"><div class="lc-step-num">1</div><div class="lc-step-body">
      <strong>Technicals</strong>
      <span>Six indicators computed from one year of daily price history: RSI, MACD, MA Crossover, Bollinger Bands, Moving Averages, and Volume. <b>Click any label</b> to get a full explanation.</span>
    </div></div>

    <div class="lc-step"><div class="lc-step-num">2</div><div class="lc-step-body">
      <strong>Fundamentals</strong>
      <span>Financial ratios and company data from Yahoo Finance. Useful for stocks and ETFs. Click any label to understand what each ratio means.</span>
    </div></div>

    <div class="lc-step"><div class="lc-step-num">3</div><div class="lc-step-body">
      <strong>News</strong>
      <span>Recent headlines from Yahoo Finance. Blue dots = published within the last 24 hours. Always read news before entering a trade — a single headline can move a stock dramatically.</span>
    </div></div>

    <div class="lc-step"><div class="lc-step-num">4</div><div class="lc-step-body">
      <strong>AI Analysis</strong>
      <span>Click <b>"Analyze with AI"</b> to send all the data to an AI model which produces a structured analysis: direction, confidence, bull/bear thesis, catalysts, risks, and entry/exit signals with stop-loss and take-profit levels.</span>
    </div></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Watchlist &amp; Alerts</h2>
    <p>Click <b>"Add to Watchlist"</b> to track a symbol. Open the Watchlist panel (top right ★) to see all your tracked symbols with live prices. Set an alert check interval and you'll receive browser notifications when RSI enters extreme zones or MACD flips direction.</p>
    <div class="lc-highlight">Important: Allow browser notifications when prompted to receive alerts.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Generate Report</h2>
    <p>Click <b>"Generate Report"</b> to open a printable summary with all data for the current symbol. If you have already run an AI analysis, it will be included. Use your browser's <b>Print → Save as PDF</b> to export it.</p>
  </div>`;
}

function lcTechnical() {
  return `
  <div class="lc-section">
    <h2>What is Technical Analysis?</h2>
    <p>Technical analysis (TA) is the study of historical price and volume data to forecast future price movements. Unlike fundamental analysis (which asks "is this company worth buying?"), TA asks "where is the price likely to go next?"</p>
    <div class="lc-highlight">Core belief: all known information is already reflected in the price. By studying price patterns and momentum, you can identify high-probability setups.</div>
    <p>TA works best for shorter time horizons (days to weeks). Long-term investors rely more on fundamentals.</p>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Trend, Momentum &amp; Volatility</h2>
    <div class="lc-card"><h3>Trend</h3><p>The overall direction of price movement. An uptrend = series of higher highs and higher lows. A downtrend = lower highs and lower lows. <b>Never fight the trend</b> — most trading strategies work better in the direction of the trend.</p></div>
    <div class="lc-card"><h3>Momentum</h3><p>How fast price is moving. Strong momentum means a trend is healthy. Fading momentum (price still rising but RSI and MACD weakening) often precedes a reversal.</p></div>
    <div class="lc-card"><h3>Volatility</h3><p>How much price fluctuates. High volatility = bigger moves, higher risk and reward. Bollinger Bands measure volatility directly. Options pricing also reflects implied volatility expectations.</p></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>RSI — Relative Strength Index</h2>
    <p>RSI measures momentum by comparing average gains to average losses over 14 periods. It ranges from 0 to 100.</p>
    <div class="lc-formula">RSI = 100 − [100 ÷ (1 + Average Gain / Average Loss)]</div>
    <ul>
      <li><b>Below 30:</b> Oversold — potential buy signal</li>
      <li><b>Above 70:</b> Overbought — potential sell/short signal</li>
      <li><b>Divergence:</b> Price hits new high but RSI doesn't → weakness signal</li>
    </ul>
    <div class="lc-highlight">RSI divergence is one of the most reliable signals in technical analysis. If price makes a new all-time high but RSI is lower than it was on the previous high, a reversal may be coming.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>MACD — Moving Average Convergence Divergence</h2>
    <p>MACD uses the difference between a 12-period and 26-period EMA. A 9-period EMA of that difference is the Signal line.</p>
    <div class="lc-formula">MACD = EMA(12) − EMA(26) &nbsp;|&nbsp; Signal = EMA(9) of MACD</div>
    <ul>
      <li><b>MACD crosses above Signal:</b> Bullish momentum building</li>
      <li><b>MACD crosses below Signal:</b> Bearish momentum building</li>
      <li><b>Histogram growing:</b> Momentum is accelerating</li>
      <li><b>Histogram shrinking:</b> Momentum is fading — watch for reversal</li>
    </ul>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Bollinger Bands</h2>
    <p>Three lines: middle = 20-day SMA. Upper and lower bands = ±2 standard deviations. The bands expand in volatile markets and contract in quiet ones.</p>
    <ul>
      <li><b>Price near upper band:</b> Potentially overbought in the short term</li>
      <li><b>Price near lower band:</b> Potentially oversold</li>
      <li><b>Band squeeze:</b> Low volatility period — a big move is coming (direction unknown)</li>
      <li><b>Band expansion:</b> Volatility is increasing</li>
    </ul>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Moving Averages &amp; Crossovers</h2>
    <p>A simple moving average (SMA) smooths out price noise over N days.</p>
    <ul>
      <li><b>SMA 20:</b> Short-term trend</li>
      <li><b>SMA 50:</b> Medium-term trend (most watched by traders)</li>
      <li><b>SMA 200:</b> Long-term trend (institutional benchmark)</li>
    </ul>
    <div class="lc-card"><h3>Golden Cross</h3><p>SMA 50 crosses above SMA 200 → long-term bullish signal. Often triggers significant institutional buying.</p></div>
    <div class="lc-card"><h3>Death Cross</h3><p>SMA 50 crosses below SMA 200 → long-term bearish signal. Can precede sustained downtrends.</p></div>
    <div class="lc-highlight">Price above all three SMAs (20, 50, 200) = strong uptrend alignment. The more SMAs align, the stronger the trend.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Volume</h2>
    <p>Volume measures how many shares (or units) were traded in a given period. It is the most important confirmation tool in TA.</p>
    <ul>
      <li><b>High volume + price up:</b> Buyers are in control — bullish</li>
      <li><b>High volume + price down:</b> Sellers are in control — bearish</li>
      <li><b>Low volume move:</b> Weak conviction — likely to reverse</li>
    </ul>
    <div class="lc-highlight">Never trust a breakout that happens on low volume. A stock breaking above resistance on 3× average volume is far more significant than the same move on 0.5× volume.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Support &amp; Resistance</h2>
    <p>Support is a price level where buyers tend to step in (floor). Resistance is where sellers tend to emerge (ceiling). These levels are visible on the chart as areas where price has repeatedly bounced or stalled.</p>
    <p>When resistance is broken, it often becomes new support — and vice versa. This concept is called <b>role reversal</b> and is one of the most useful patterns in TA.</p>
  </div>`;
}

function lcFundamental() {
  return `
  <div class="lc-section">
    <h2>What is Fundamental Analysis?</h2>
    <p>Fundamental analysis evaluates a company's intrinsic value by examining financial statements, business model, competitive position, and macroeconomic factors. The goal is to determine whether a stock is undervalued or overvalued relative to its true worth.</p>
    <div class="lc-highlight">Warren Buffett's approach: buy wonderful companies at fair prices, rather than fair companies at wonderful prices. Fundamental analysis is the foundation of long-term investing.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>The Income Statement</h2>
    <p>The income statement shows how much money a company made and spent over a period. Reading top to bottom:</p>
    <div class="lc-step"><div class="lc-step-num">1</div><div class="lc-step-body"><strong>Revenue (Top Line)</strong><span>Total sales. Growth here is the first thing investors check.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">2</div><div class="lc-step-body"><strong>Gross Profit</strong><span>Revenue minus cost of goods sold. Gross margin = Gross Profit ÷ Revenue.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">3</div><div class="lc-step-body"><strong>Operating Income (EBIT)</strong><span>After operating expenses (R&amp;D, sales, admin). Shows core business profitability.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">4</div><div class="lc-step-body"><strong>Net Income (Bottom Line)</strong><span>After taxes and interest. This is what flows to shareholders. Net Income ÷ Shares = EPS.</span></div></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>The Balance Sheet</h2>
    <p>A snapshot of what a company owns (assets) and owes (liabilities) at a point in time. The difference is shareholders' equity.</p>
    <div class="lc-formula">Assets = Liabilities + Shareholders' Equity</div>
    <ul>
      <li><b>Cash and cash equivalents:</b> Financial flexibility and safety buffer</li>
      <li><b>Total debt:</b> How leveraged the company is — compare to earnings (Debt/EBITDA)</li>
      <li><b>Book value:</b> Net assets per share — used in Price-to-Book (P/B) ratio</li>
    </ul>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Key Valuation Ratios</h2>
    <div class="lc-card"><h3>P/E Ratio</h3><p>Price ÷ EPS. The most common valuation metric. Compare to historical average and sector peers. A P/E of 15 is generally considered "fair value" for a stable company; high-growth companies often trade at 30–60×.</p></div>
    <div class="lc-card"><h3>PEG Ratio</h3><p>P/E ÷ Earnings Growth Rate. A PEG below 1.0 may indicate undervaluation — you're paying less per unit of growth. A PEG above 2.0 may be expensive relative to growth.</p></div>
    <div class="lc-card"><h3>P/B Ratio (Price-to-Book)</h3><p>Price per share ÷ Book value per share. Important for banks and asset-heavy companies. Below 1.0 = trading below net asset value (potentially very cheap).</p></div>
    <div class="lc-card"><h3>EV/EBITDA</h3><p>Enterprise Value ÷ EBITDA. A capital-structure-neutral valuation metric — better than P/E for comparing companies with different debt levels. A ratio of 10× or below is generally considered reasonable.</p></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>DCF Valuation — Basics</h2>
    <p>Discounted Cash Flow (DCF) analysis estimates a company's value by projecting future cash flows and discounting them back to today using a required rate of return (discount rate).</p>
    <div class="lc-formula">Intrinsic Value = Σ [FCF_t ÷ (1 + r)^t] + Terminal Value</div>
    <p>Where FCF = Free Cash Flow, r = discount rate, t = year. If the intrinsic value is higher than the current stock price, the stock may be undervalued.</p>
    <div class="lc-highlight">DCF is powerful but highly sensitive to assumptions. A small change in growth rate or discount rate can dramatically change the result. Always use a margin of safety (e.g. only buy if the stock trades 20–30% below your DCF estimate).</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Beta &amp; Market Risk</h2>
    <p>Beta measures a stock's sensitivity to market movements. It comes from the Capital Asset Pricing Model (CAPM):</p>
    <div class="lc-formula">Expected Return = Risk-Free Rate + Beta × (Market Return − Risk-Free Rate)</div>
    <p>A Beta of 1.5 means you expect 50% more return than the market — but also 50% more downside. Use Beta to calibrate your portfolio's overall risk level.</p>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Dividend Investing</h2>
    <p>Dividends are regular cash payments to shareholders from company profits. Dividend investing focuses on high-yield, stable companies (utilities, consumer staples, REITs).</p>
    <ul>
      <li><b>Dividend Yield:</b> Annual dividend ÷ stock price</li>
      <li><b>Payout Ratio:</b> Dividends paid ÷ Net Income — above 80% may be unsustainable</li>
      <li><b>Dividend growth rate:</b> Consistent dividend growth signals financial health</li>
    </ul>
    <div class="lc-highlight">Reinvesting dividends (DRIP) is one of the most powerful long-term compounding strategies. Over 20 years, reinvested dividends typically account for 40–50% of total returns.</div>
  </div>`;
}

function lcCorporate() {
  return `
  <div class="lc-section">
    <h2>Time Value of Money</h2>
    <p>The foundational concept of all finance: a dollar today is worth more than a dollar tomorrow, because today's dollar can be invested to earn a return.</p>
    <div class="lc-formula">Future Value = PV × (1 + r)^n &nbsp;|&nbsp; Present Value = FV ÷ (1 + r)^n</div>
    <p>Where PV = present value, FV = future value, r = interest rate, n = number of periods.</p>
    <div class="lc-card"><h3>Example</h3><p>$1,000 invested today at 8% annual return will be worth $1,000 × (1.08)^10 = $2,159 in 10 years. This is why starting to invest early matters so much.</p></div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Cost of Capital &amp; WACC</h2>
    <p>Every company finances itself using a mix of debt and equity. The Weighted Average Cost of Capital (WACC) is the blended rate the company must earn on its investments to satisfy all investors.</p>
    <div class="lc-formula">WACC = (E/V × Re) + (D/V × Rd × (1 − Tax Rate))</div>
    <p>Where E = equity value, D = debt value, V = E+D, Re = cost of equity, Rd = cost of debt.</p>
    <p>WACC is used as the discount rate in DCF valuation. A company that earns returns above its WACC creates value; below WACC destroys value.</p>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Free Cash Flow (FCF)</h2>
    <p>Free cash flow is the cash a company generates after paying for operations and capital expenditures. It is the true measure of a company's financial health — unlike earnings, it cannot be manipulated through accounting choices.</p>
    <div class="lc-formula">FCF = Operating Cash Flow − Capital Expenditure</div>
    <p>Companies with consistently growing FCF can reinvest in growth, pay dividends, buy back shares, or pay down debt. FCF-negative companies must raise external capital to survive.</p>
    <div class="lc-highlight">Warren Buffett calls FCF "owner earnings" — it's what actually belongs to shareholders after the business maintains itself.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Capital Structure</h2>
    <p>How a company finances its assets through a combination of equity and debt.</p>
    <div class="lc-card"><h3>Equity Financing</h3><p>Selling shares. No obligation to repay. But dilutes existing shareholders. Cost = required return of shareholders (higher risk → higher required return).</p></div>
    <div class="lc-card"><h3>Debt Financing</h3><p>Borrowing money (bonds, loans). Must be repaid with interest. Tax-deductible interest payments make debt cheaper than equity. But too much debt increases bankruptcy risk.</p></div>
    <p>The optimal capital structure minimises WACC. Most companies use 40–60% debt. Companies with stable cash flows (utilities, telecoms) use more debt; tech companies use less.</p>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>How IPOs Work</h2>
    <p>An Initial Public Offering (IPO) is when a private company sells shares to the public for the first time on a stock exchange.</p>
    <div class="lc-step"><div class="lc-step-num">1</div><div class="lc-step-body"><strong>Investment banks underwrite the IPO</strong><span>They set the initial price range and find institutional buyers.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">2</div><div class="lc-step-body"><strong>Roadshow</strong><span>Company management pitches to institutional investors to gauge demand.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">3</div><div class="lc-step-body"><strong>Shares go public</strong><span>First day of trading — price discovery by the market. Often volatile.</span></div></div>
    <div class="lc-step"><div class="lc-step-num">4</div><div class="lc-step-body"><strong>Lock-up expiry (90–180 days)</strong><span>Insiders can now sell. Often creates selling pressure.</span></div></div>
    <div class="lc-highlight">Be cautious buying IPOs on day one. The opening price is often inflated. Waiting 3–6 months allows the price to settle and gives you time to study actual public financial data.</div>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>How Markets Price Risk</h2>
    <p>Investors demand higher returns for taking on more risk. This is called the <b>risk premium</b>. The riskier the investment, the higher the expected return must be to attract capital.</p>
    <ul>
      <li><b>Risk-free rate:</b> Return on government bonds (e.g. US 10-year Treasury, ~4–5% currently)</li>
      <li><b>Equity risk premium:</b> Extra return demanded for owning stocks vs bonds (~5–6% historically)</li>
      <li><b>Company-specific risk:</b> Small companies, high debt, or unstable earnings demand even higher returns</li>
    </ul>
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Macro Factors That Move Markets</h2>
    <div class="lc-card"><h3>Interest Rates</h3><p>Rising rates = higher discount rates = lower valuations (especially for growth stocks). Falling rates = opposite. The Federal Reserve's decisions are the single biggest macro driver of equity markets.</p></div>
    <div class="lc-card"><h3>Inflation</h3><p>Moderate inflation (2%) is healthy. High inflation erodes earnings and forces central banks to raise rates, which hurts stocks. Companies with pricing power (luxury goods, software) outperform during inflation.</p></div>
    <div class="lc-card"><h3>Earnings Cycles</h3><p>Stock prices ultimately follow earnings. Earnings seasons (4× per year) are when companies report actual vs. expected EPS. Beats drive rallies; misses trigger selloffs — especially if guidance is cut.</p></div>
    <div class="lc-card"><h3>Geopolitical Events</h3><p>Wars, sanctions, trade disputes create uncertainty and short-term volatility. Defensive sectors (utilities, consumer staples, gold) typically outperform during geopolitical stress.</p></div>
  </div>`;
}

function lcResources() {
  const res = (icon, cls, title, desc, tag, url) => `
    <a class="lc-resource" href="${url}" target="_blank" rel="noopener">
      <div class="lc-resource-icon ${cls}">${icon}</div>
      <div class="lc-resource-body">
        <strong>${esc(title)} <span class="lc-resource-tag ${tag === 'Free' ? 'tag-free' : tag === 'Video' ? 'tag-video' : 'tag-book'}">${tag}</span></strong>
        <span>${esc(desc)}</span>
      </div>
    </a>`;

  return `
  <div class="lc-section">
    <h2>Free Books &amp; Reading</h2>
    <p class="lc-subtitle">Completely free, legally available</p>
    ${res('📖','book','Damodaran — Investment Valuation (full textbook)','The definitive textbook on valuation by NYU professor Aswath Damodaran. Free PDF on his website.','Free','https://pages.stern.nyu.edu/~adamodar/New_Home_Page/books.htm')}
    ${res('📖','book','Damodaran — The Little Book of Valuation','A concise, accessible guide to valuing any asset. Perfect starting point for students.','Free','https://pages.stern.nyu.edu/~adamodar/New_Home_Page/littlebook.htm')}
    ${res('📖','book','Damodaran Online — Data, spreadsheets &amp; notes','Free datasets, valuation models, and course notes from NYU Stern. Invaluable reference.','Free','https://pages.stern.nyu.edu/~adamodar/')}
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Free Online Courses</h2>
    ${res('🎓','course','Khan Academy — Finance &amp; Capital Markets','Complete free course covering stocks, bonds, interest rates, options, and more. Best starting point for beginners.','Free','https://www.khanacademy.org/economics-finance-domain/core-finance')}
    ${res('🎓','course','Yale / Robert Shiller — Financial Markets (Coursera)','Full university course from Nobel laureate Robert Shiller. Free to audit. Covers markets, risk, and behavioral finance.','Free','https://www.coursera.org/learn/financial-markets-global')}
    ${res('🎓','course','MIT OpenCourseWare — Finance courses','Free lecture notes, problem sets, and exams from MIT finance courses. Advanced but comprehensive.','Free','https://ocw.mit.edu/search/?d=Finance')}
    ${res('🎓','course','CFA Institute — Free Learning Resources','The world\'s leading investment credentials body offers free articles, videos, and practice materials.','Free','https://www.cfainstitute.org/en/research/foundation')}
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>YouTube Channels</h2>
    ${res('▶','video','Aswath Damodaran (NYU Professor)','Full semester university lectures on corporate finance and valuation. The best free finance education available anywhere.','Video','https://www.youtube.com/@AswathDamodaran')}
    ${res('▶','video','The Plain Bagel','Clear, evidence-based explanations of investing concepts, market events, and financial products. Great for students.','Video','https://www.youtube.com/@ThePlainBagel')}
    ${res('▶','video','Ben Felix — Common Sense Investing','Evidence-based investing from a portfolio manager. Challenges popular myths with academic research.','Video','https://www.youtube.com/@BenFelixCSI')}
    ${res('▶','video','Patrick Boyle','Hedge fund manager perspective on macro, derivatives, and market structure. Advanced but highly informative.','Video','https://www.youtube.com/@PBoyle')}
    ${res('▶','video','Investors Archive','Full-length interviews and lectures from legendary investors: Buffett, Munger, Lynch, Klarman, and more.','Video','https://www.youtube.com/@InvestorsArchive')}
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Reference Websites</h2>
    ${res('🌐','course','Investopedia','The most comprehensive financial dictionary and education site. Look up any term you don\'t understand.','Free','https://www.investopedia.com')}
    ${res('🌐','course','SEC EDGAR — Company Filings','Access real 10-K (annual), 10-Q (quarterly), and 8-K (material events) filings directly from public companies. Primary source.','Free','https://www.sec.gov/cgi-bin/browse-edgar')}
  </div>

  <hr class="lc-divider">

  <div class="lc-section">
    <h2>Practice</h2>
    ${res('📊','course','Trading212 Demo Account','Practice trading with virtual money in real market conditions. Risk-free way to test your analysis before committing real capital.','Free','https://www.trading212.com')}
    <div class="lc-highlight">Always test your strategies with a demo account before using real money. Track your trades in a journal — write down your reasoning before entering, and review your mistakes honestly.</div>
  </div>`;
}

/* ── Escape key (global) ─────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    hideTip();
    closeReportModal();
    learnPanel.classList.remove('open');
    portfolioPanel.classList.remove('open');
    searchDropdown.hidden = true;
  }
});

/* ── Init ───────────────────────────────────────────────────────────────── */
renderWatchlist();
startWatchlistPoll();

// Request notification permission proactively
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
