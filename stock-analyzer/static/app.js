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
      <div class="quote-stat"><label>Day Low</label><span>${fmt(q.day_low, q.currency)}</span></div>
      <div class="quote-stat"><label>Day High</label><span>${fmt(q.day_high, q.currency)}</span></div>
      <div class="quote-stat"><label>52W Low</label><span>${fmt(q.week52_low, q.currency)}</span></div>
      <div class="quote-stat"><label>52W High</label><span>${fmt(q.week52_high, q.currency)}</span></div>
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
      <label>RSI (14)</label>
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
      <label>MACD (12/26/9)</label>
      <div class="tech-val">${n2(macd.macd)}</div>
      <div class="tech-sub">Signal: ${n2(macd.signal)} &nbsp;|&nbsp; Hist: ${n2(macd.histogram)}</div>
      <span class="tech-badge ${macdBadge}">${macdLabel}</span>
    </div>

    <div class="tech-item">
      <label>MA Crossover</label>
      <div class="tech-val" style="font-size:14px">${gcLabel}</div>
      <div class="tech-sub">SMA50: ${n2(sma.sma50)} &nbsp;/&nbsp; SMA200: ${n2(sma.sma200)}</div>
      <span class="tech-badge ${gcBadge}">${gcLabel}</span>
    </div>

    <div class="tech-item">
      <label>Bollinger Bands</label>
      <div class="tech-val" style="font-size:13px">${bb.position || 'N/A'}</div>
      <div class="tech-sub">Upper: ${n2(bb.upper)} &nbsp;·&nbsp; Mid: ${n2(bb.mid)} &nbsp;·&nbsp; Lower: ${n2(bb.lower)}</div>
    </div>

    <div class="tech-item">
      <label>Moving Averages</label>
      <div class="tech-sub" style="line-height:1.9">
        SMA20: <b>${n2(sma.sma20)}</b> ${p && sma.sma20 ? (p > sma.sma20 ? '↑' : '↓') : ''}<br>
        SMA50: <b>${n2(sma.sma50)}</b> ${p && sma.sma50 ? (p > sma.sma50 ? '↑' : '↓') : ''}<br>
        SMA200: <b>${n2(sma.sma200)}</b> ${p && sma.sma200 ? (p > sma.sma200 ? '↑' : '↓') : ''}
      </div>
    </div>

    <div class="tech-item">
      <label>Volume (vs 20d avg)</label>
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
      <div class="fund-item"><label>Market Cap</label><span>${f.market_cap || 'N/A'}</span></div>
      <div class="fund-item"><label>P/E Ratio (TTM)</label><span>${num(f.pe_ratio)}</span></div>
      <div class="fund-item"><label>Forward P/E</label><span>${num(f.forward_pe)}</span></div>
      <div class="fund-item"><label>EPS (TTM)</label><span>${num(f.eps)}</span></div>
      <div class="fund-item"><label>Revenue</label><span>${f.revenue || 'N/A'}</span></div>
      <div class="fund-item"><label>Profit Margin</label><span>${pct(f.profit_margin)}</span></div>
      <div class="fund-item"><label>Beta</label><span>${num(f.beta)}</span></div>
      <div class="fund-item"><label>Dividend Yield</label><span>${pct(f.dividend_yield)}</span></div>
      <div class="fund-item"><label>Sector</label><span>${f.sector || 'N/A'}</span></div>
      <div class="fund-item"><label>Industry</label><span>${f.industry || 'N/A'}</span></div>
      <div class="fund-item"><label>52W Change</label><span class="${(f.week52_change??0)>=0?'':'neg'}">${pct(f.week52_change)}</span></div>
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
          <div class="signal-level entry"><label>Entry</label><span>${esc(ent.suggested_entry || '—')}</span></div>
          <div class="signal-level rr"><label>R/R</label><span>${esc(ent.risk_reward || '—')}</span></div>
          <div class="signal-level tp"><label>Take Profit</label><span>${esc(ent.take_profit || '—')}</span></div>
          <div class="signal-level sl"><label>Stop Loss</label><span>${esc(ent.stop_loss || '—')}</span></div>
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
closeReport.addEventListener('click', () => { reportOverlay.hidden = true; });
reportOverlay.addEventListener('click', e => { if (e.target === reportOverlay) reportOverlay.hidden = true; });

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

/* ── Init ───────────────────────────────────────────────────────────────── */
renderWatchlist();
startWatchlistPoll();

// Request notification permission proactively
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
