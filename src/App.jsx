import { useState, useEffect, useCallback } from 'react';

const NSE_STOCKS = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy',
    fo: true,
  },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', fo: true },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', fo: true },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', fo: true },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', fo: true },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever',
    sector: 'FMCG',
    fo: true,
  },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', fo: true },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'NBFC', fo: true },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', fo: true },
  {
    symbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank',
    sector: 'Banking',
    fo: true,
  },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT', fo: true },
  { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', fo: true },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', fo: true },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', fo: true },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Paints', fo: true },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Automobile', fo: true },
  {
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical',
    sector: 'Pharma',
    fo: true,
  },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Automobile', fo: true },
  { symbol: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG', fo: false },
  {
    symbol: 'ULTRACEMCO',
    name: 'UltraTech Cement',
    sector: 'Cement',
    fo: true,
  },
  { symbol: 'TITAN', name: 'Titan Company', sector: 'Consumer', fo: true },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', sector: 'Power', fo: true },
  { symbol: 'ONGC', name: 'ONGC', sector: 'Energy', fo: true },
  { symbol: 'NTPC', name: 'NTPC', sector: 'Power', fo: true },
  {
    symbol: 'M&M',
    name: 'Mahindra & Mahindra',
    sector: 'Automobile',
    fo: true,
  },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', sector: 'NBFC', fo: true },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', sector: 'Metals', fo: true },
  { symbol: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', fo: true },
  {
    symbol: 'ADANIENT',
    name: 'Adani Enterprises',
    sector: 'Conglomerate',
    fo: true,
  },
  {
    symbol: 'ADANIPORTS',
    name: 'Adani Ports',
    sector: 'Infrastructure',
    fo: true,
  },
  { symbol: 'CIPLA', name: 'Cipla', sector: 'Pharma', fo: true },
  { symbol: 'DRREDDY', name: "Dr. Reddy's Labs", sector: 'Pharma', fo: true },
  {
    symbol: 'DIVISLAB',
    name: "Divi's Laboratories",
    sector: 'Pharma',
    fo: true,
  },
  {
    symbol: 'EICHERMOT',
    name: 'Eicher Motors',
    sector: 'Automobile',
    fo: true,
  },
  {
    symbol: 'HEROMOTOCO',
    name: 'Hero MotoCorp',
    sector: 'Automobile',
    fo: true,
  },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank', sector: 'Banking', fo: true },
  { symbol: 'TECHM', name: 'Tech Mahindra', sector: 'IT', fo: true },
  {
    symbol: 'BRITANNIA',
    name: 'Britannia Industries',
    sector: 'FMCG',
    fo: true,
  },
  { symbol: 'COALINDIA', name: 'Coal India', sector: 'Mining', fo: true },
  {
    symbol: 'GRASIM',
    name: 'Grasim Industries',
    sector: 'Diversified',
    fo: true,
  },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto', sector: 'Automobile', fo: true },
  {
    symbol: 'HINDALCO',
    name: 'Hindalco Industries',
    sector: 'Metals',
    fo: true,
  },
  {
    symbol: 'APOLLOHOSP',
    name: 'Apollo Hospitals',
    sector: 'Healthcare',
    fo: true,
  },
  {
    symbol: 'TATACONSUM',
    name: 'Tata Consumer Products',
    sector: 'FMCG',
    fo: true,
  },
  { symbol: 'BPCL', name: 'Bharat Petroleum', sector: 'Energy', fo: true },
  { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG', fo: true },
  { symbol: 'VEDL', name: 'Vedanta Ltd', sector: 'Metals', fo: true },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', sector: 'Consumer Tech', fo: true },
  {
    symbol: 'PAYTM',
    name: 'One97 Communications',
    sector: 'Fintech',
    fo: false,
  },
  {
    symbol: 'NYKAA',
    name: 'FSN E-Commerce (Nykaa)',
    sector: 'Consumer Tech',
    fo: false,
  },
];

const BASE_PRICES = {
  RELIANCE: 2850,
  TCS: 3920,
  HDFCBANK: 1680,
  INFY: 1480,
  ICICIBANK: 1245,
  HINDUNILVR: 2340,
  SBIN: 762,
  BAJFINANCE: 7120,
  BHARTIARTL: 1625,
  KOTAKBANK: 1890,
  WIPRO: 462,
  HCLTECH: 1540,
  LT: 3620,
  AXISBANK: 1095,
  ASIANPAINT: 2280,
  MARUTI: 12400,
  SUNPHARMA: 1720,
  TATAMOTORS: 725,
  NESTLEIND: 2280,
  ULTRACEMCO: 10500,
  TITAN: 3340,
  POWERGRID: 298,
  ONGC: 268,
  NTPC: 342,
  'M&M': 2890,
  BAJAJFINSV: 1680,
  JSWSTEEL: 920,
  TATASTEEL: 148,
  ADANIENT: 2380,
  ADANIPORTS: 1235,
  CIPLA: 1480,
  DRREDDY: 6200,
  DIVISLAB: 5100,
  EICHERMOT: 4850,
  HEROMOTOCO: 4280,
  INDUSINDBK: 965,
  TECHM: 1520,
  BRITANNIA: 5150,
  COALINDIA: 388,
  GRASIM: 2680,
  'BAJAJ-AUTO': 8950,
  HINDALCO: 628,
  APOLLOHOSP: 6800,
  TATACONSUM: 1020,
  BPCL: 298,
  ITC: 460,
  VEDL: 285,
  ZOMATO: 195,
  PAYTM: 520,
  NYKAA: 175,
};

const SECTOR_COLORS = {
  IT: '#6366f1',
  Banking: '#0ea5e9',
  Energy: '#f59e0b',
  FMCG: '#10b981',
  Pharma: '#ec4899',
  Automobile: '#f97316',
  Metals: '#94a3b8',
  Infrastructure: '#84cc16',
  Telecom: '#a855f7',
  Power: '#eab308',
  NBFC: '#06b6d4',
  Cement: '#78716c',
  Consumer: '#f43f5e',
  Mining: '#64748b',
  Diversified: '#8b5cf6',
  Healthcare: '#14b8a6',
  Conglomerate: '#fb923c',
  Paints: '#c084fc',
  'Consumer Tech': '#38bdf8',
  Fintech: '#34d399',
};

const generateStocks = () =>
  NSE_STOCKS.map((s) => {
    const base = BASE_PRICES[s.symbol] || 500;
    const price = parseFloat(
      (base * (1 + (Math.random() - 0.5) * 0.04)).toFixed(2)
    );
    const dPct = parseFloat(((Math.random() - 0.47) * 8).toFixed(2));
    const wPct = parseFloat(((Math.random() - 0.45) * 14).toFixed(2));
    const w52H = parseFloat(
      (price * (1 + Math.random() * 0.5 + 0.08)).toFixed(2)
    );
    const w52L = parseFloat(
      (price * (1 - Math.random() * 0.35 + 0.02)).toFixed(2)
    );
    const vol = Math.floor(Math.random() * 20000000 + 100000);
    const mktCap = parseFloat(
      (price * (Math.random() * 800 + 50) * 1e6).toFixed(0)
    );
    const history = Array.from({ length: 7 }, (_, i) =>
      parseFloat(
        (price * (1 + ((Math.random() - 0.5) * 0.06 * (7 - i)) / 7)).toFixed(2)
      )
    ).reverse();
    history[6] = price;
    return {
      ...s,
      price,
      dailyChange: parseFloat(((price * dPct) / 100).toFixed(2)),
      dailyChangePct: dPct,
      weeklyChange: parseFloat(((price * wPct) / 100).toFixed(2)),
      weeklyChangePct: wPct,
      w52High: w52H,
      w52Low: w52L,
      volume: vol,
      marketCap: mktCap,
      history,
      oi: s.fo ? Math.floor(Math.random() * 5000000 + 100000) : null,
      iv: s.fo ? parseFloat((Math.random() * 40 + 10).toFixed(1)) : null,
    };
  });

const fmt = (n) =>
  n?.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const fmtP = (n) => `${n > 0 ? '+' : ''}${n?.toFixed(2)}%`;
const fmtV = (n) =>
  n >= 1e7
    ? `${(n / 1e7).toFixed(2)}Cr`
    : n >= 1e5
    ? `${(n / 1e5).toFixed(2)}L`
    : `${(n / 1e3).toFixed(1)}K`;
const fmtMC = (n) =>
  n >= 1e12
    ? `₹${(n / 1e12).toFixed(2)}L Cr`
    : n >= 1e9
    ? `₹${(n / 1e9).toFixed(2)}K Cr`
    : `₹${(n / 1e7).toFixed(2)}Cr`;

/* ── Sparkline ── */
const Sparkline = ({ data, positive }) => {
  if (!data || data.length < 2) return null;
  const w = 80,
    h = 28,
    pad = 2,
    mn = Math.min(...data),
    mx = Math.max(...data),
    rng = mx - mn || 1;
  const pts = data
    .map(
      (v, i) =>
        `${pad + (i * (w - 2 * pad)) / (data.length - 1)},${
          pad + (1 - (v - mn) / rng) * (h - 2 * pad)
        }`
    )
    .join(' ');
  return (
    <svg width={w} height={h}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? '#22c55e' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ── Sector Heatmap ── */
const SectorHeatmap = ({ stocks }) => {
  const map = {};
  stocks.forEach((s) => {
    if (!map[s.sector]) map[s.sector] = { stocks: [], totalMC: 0 };
    map[s.sector].stocks.push(s);
    map[s.sector].totalMC += s.marketCap || 0;
  });
  const entries = Object.entries(map)
    .map(([k, v]) => [
      k,
      {
        ...v,
        avg:
          v.stocks.reduce((a, s) => a + s.dailyChangePct, 0) / v.stocks.length,
      },
    ])
    .sort((a, b) => b[1].totalMC - a[1].totalMC);
  return (
    <div>
      <h2
        style={{
          color: '#f1f5f9',
          fontSize: 18,
          fontWeight: 800,
          margin: '0 0 16px',
        }}
      >
        🟩 Sector Heatmap
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
          gap: 8,
        }}
      >
        {entries.map(([sec, d]) => {
          const p = d.avg,
            i = Math.min(1, Math.abs(p) / 5);
          return (
            <div
              key={sec}
              style={{
                background:
                  p >= 0
                    ? `rgba(34,197,94,${0.1 + i * 0.5})`
                    : `rgba(239,68,68,${0.1 + i * 0.5})`,
                border: `1px solid ${
                  p >= 0 ? `rgba(34,197,94,.4)` : `rgba(239,68,68,.4)`
                }`,
                borderRadius: 12,
                padding: '14px 16px',
                minHeight: 90,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 12 }}>
                {sec}
              </span>
              <div>
                <div
                  style={{
                    color: p >= 0 ? '#22c55e' : '#ef4444',
                    fontSize: 22,
                    fontWeight: 900,
                  }}
                >
                  {fmtP(p)}
                </div>
                <div style={{ color: '#475569', fontSize: 10 }}>
                  {d.stocks.length} stocks · {fmtMC(d.totalMC)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── F&O Section ── */
const FOSection = ({ stocks }) => {
  const fo = stocks.filter((s) => s.fo).sort((a, b) => b.oi - a.oi);
  const thS = {
    padding: '10px 12px',
    textAlign: 'left',
    color: '#475569',
    fontSize: 10,
    fontWeight: 700,
    borderBottom: '2px solid #1e293b',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    background: '#0a0f1e',
  };
  return (
    <div>
      <h2
        style={{
          color: '#f1f5f9',
          fontSize: 18,
          fontWeight: 800,
          margin: '0 0 12px',
        }}
      >
        📊 F&O Stocks{' '}
        <span
          style={{
            background: '#7c3aed33',
            color: '#a78bfa',
            borderRadius: 6,
            padding: '2px 8px',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          Futures & Options
        </span>
      </h2>
      <div
        style={{
          overflowX: 'auto',
          borderRadius: 12,
          border: '1px solid #1e293b',
        }}
      >
        <table
          style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}
        >
          <thead>
            <tr>
              {[
                'Symbol',
                'Name',
                'Price',
                'Day %',
                'Week %',
                'Open Interest',
                'IV %',
                '52W Range',
                '7D Chart',
              ].map((h) => (
                <th key={h} style={thS}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fo.map((s) => {
              const p = Math.min(
                100,
                Math.max(
                  0,
                  ((s.price - s.w52Low) / (s.w52High - s.w52Low)) * 100
                )
              );
              return (
                <tr
                  key={s.symbol}
                  style={{ borderBottom: '1px solid #0f172a' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#1e293b')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontWeight: 800,
                        color: '#f1f5f9',
                        fontSize: 13,
                      }}
                    >
                      {s.symbol}
                    </span>{' '}
                    <span
                      style={{
                        background: '#7c3aed33',
                        color: '#a78bfa',
                        borderRadius: 4,
                        padding: '1px 5px',
                        fontSize: 9,
                        fontWeight: 700,
                      }}
                    >
                      F&O
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      color: '#94a3b8',
                      fontSize: 12,
                    }}
                  >
                    {s.name}
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      color: '#f1f5f9',
                      fontWeight: 700,
                    }}
                  >
                    ₹{fmt(s.price)}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        color: s.dailyChangePct >= 0 ? '#22c55e' : '#ef4444',
                        fontWeight: 700,
                      }}
                    >
                      {s.dailyChangePct >= 0 ? '▲' : '▼'}{' '}
                      {fmtP(s.dailyChangePct)}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        color: s.weeklyChangePct >= 0 ? '#22c55e' : '#ef4444',
                        fontWeight: 600,
                      }}
                    >
                      {fmtP(s.weeklyChangePct)}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      color: '#94a3b8',
                      fontSize: 12,
                    }}
                  >
                    {fmtV(s.oi)}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        color: s.iv > 25 ? '#f59e0b' : '#94a3b8',
                        fontWeight: 700,
                      }}
                    >
                      {s.iv}%
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', minWidth: 130 }}>
                    <div
                      style={{
                        height: 4,
                        background: '#0f172a',
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          borderRadius: 2,
                          background:
                            'linear-gradient(90deg,#ef4444,#f59e0b,#22c55e)',
                          width: `${p}%`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 9,
                        color: '#334155',
                        marginTop: 2,
                      }}
                    >
                      <span>₹{fmt(s.w52Low)}</span>
                      <span>₹{fmt(s.w52High)}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Sparkline
                      data={s.history}
                      positive={s.dailyChangePct >= 0}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ══ MAIN APP ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [stocks, setStocks] = useState([]);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortDir, setSortDir] = useState('desc');
  const [updated, setUpdated] = useState('');
  const [selected, setSelected] = useState(null);
  const [ticker, setTicker] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shiva_wl') || '[]');
    } catch {
      return [];
    }
  });

  const load = useCallback(() => {
    const d = generateStocks();
    setStocks(d);
    setTicker([...d].sort(() => Math.random() - 0.5).slice(0, 16));
    setUpdated(
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) + ' IST'
    );
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const toggleWL = (sym) => {
    const next = watchlist.includes(sym)
      ? watchlist.filter((s) => s !== sym)
      : [...watchlist, sym];
    setWatchlist(next);
    try {
      localStorage.setItem('shiva_wl', JSON.stringify(next));
    } catch {}
  };

  const sectors = [
    'All',
    ...Array.from(new Set(stocks.map((s) => s.sector))).sort(),
  ];
  const filtered = stocks.filter((s) => {
    const ms =
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    return ms && (sector === 'All' || s.sector === sector);
  });
  const sorted = [...filtered].sort((a, b) => {
    const va = a[sortBy],
      vb = b[sortBy];
    if (typeof va === 'string')
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return sortDir === 'asc' ? va - vb : vb - va;
  });
  const topG = [...stocks]
    .sort((a, b) => b.dailyChangePct - a.dailyChangePct)
    .slice(0, 20);
  const topL = [...stocks]
    .sort((a, b) => a.dailyChangePct - b.dailyChangePct)
    .slice(0, 20);
  const wlStocks = stocks.filter((s) => watchlist.includes(s.symbol));

  const mktUp = stocks.filter((s) => s.dailyChangePct > 0).length;
  const mktDn = stocks.filter((s) => s.dailyChangePct <= 0).length;
  const avgCh = stocks.length
    ? (
        stocks.reduce((a, s) => a + s.dailyChangePct, 0) / stocks.length
      ).toFixed(2)
    : 0;
  const nifty = (21500 * (1 + parseFloat(avgCh) / 100)).toLocaleString(
    'en-IN',
    { maximumFractionDigits: 2 }
  );
  const sensex = (71000 * (1 + parseFloat(avgCh) / 100)).toLocaleString(
    'en-IN',
    { maximumFractionDigits: 2 }
  );
  const bnifty = (48000 * (1 + parseFloat(avgCh) / 100)).toLocaleString(
    'en-IN',
    { maximumFractionDigits: 2 }
  );

  const hs = (col) => {
    if (sortBy === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(col);
      setSortDir('desc');
    }
  };
  const SIco = ({ col }) => (
    <span style={{ color: '#334155' }}>
      {sortBy === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
    </span>
  );
  const thS = {
    padding: '10px 10px',
    textAlign: 'left',
    color: '#475569',
    fontSize: 10,
    fontWeight: 700,
    borderBottom: '2px solid #1e293b',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    userSelect: 'none',
    background: '#0a0f1e',
  };

  const StockRow = ({ s, rank }) => {
    const p52 = Math.min(
      100,
      Math.max(0, ((s.price - s.w52Low) / (s.w52High - s.w52Low)) * 100)
    );
    const inWL = watchlist.includes(s.symbol);
    return (
      <tr
        style={{ borderBottom: '1px solid #0a0f1e', cursor: 'pointer' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#1a2235')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {rank !== undefined && (
          <td
            style={{
              padding: '8px 10px',
              color: '#475569',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {rank}
          </td>
        )}
        <td
          style={{ padding: '8px 6px' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWL(s.symbol);
          }}
        >
          <span style={{ fontSize: 15, cursor: 'pointer' }}>
            {inWL ? '⭐' : '☆'}
          </span>
        </td>
        <td style={{ padding: '8px 10px' }} onClick={() => setSelected(s)}>
          <div style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 13 }}>
            {s.symbol}
          </div>
          <div
            style={{ display: 'flex', gap: 4, marginTop: 2, flexWrap: 'wrap' }}
          >
            <span
              style={{
                background: (SECTOR_COLORS[s.sector] || '#6366f1') + '22',
                color: SECTOR_COLORS[s.sector] || '#6366f1',
                borderRadius: 4,
                padding: '1px 5px',
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              {s.sector}
            </span>
            {s.fo && (
              <span
                style={{
                  background: '#7c3aed22',
                  color: '#a78bfa',
                  borderRadius: 4,
                  padding: '1px 5px',
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                F&O
              </span>
            )}
          </div>
        </td>
        <td
          style={{
            padding: '8px 10px',
            color: '#64748b',
            fontSize: 12,
            maxWidth: 150,
          }}
          onClick={() => setSelected(s)}
        >
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {s.name}
          </div>
        </td>
        <td
          style={{
            padding: '8px 10px',
            color: '#f1f5f9',
            fontWeight: 700,
            fontSize: 14,
          }}
          onClick={() => setSelected(s)}
        >
          ₹{fmt(s.price)}
        </td>
        <td style={{ padding: '8px 10px' }} onClick={() => setSelected(s)}>
          <div
            style={{
              background: s.dailyChangePct >= 0 ? '#14532d44' : '#7f1d1d44',
              borderRadius: 6,
              padding: '3px 7px',
              display: 'inline-block',
            }}
          >
            <span
              style={{
                color: s.dailyChangePct >= 0 ? '#22c55e' : '#ef4444',
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {s.dailyChangePct >= 0 ? '▲' : '▼'} {fmtP(s.dailyChangePct)}
            </span>
          </div>
          <div
            style={{
              color: s.dailyChange >= 0 ? '#16a34a' : '#dc2626',
              fontSize: 10,
              marginTop: 2,
            }}
          >
            {s.dailyChange >= 0 ? '+' : ''}₹{fmt(s.dailyChange)}
          </div>
        </td>
        <td style={{ padding: '8px 10px' }} onClick={() => setSelected(s)}>
          <span
            style={{
              color: s.weeklyChangePct >= 0 ? '#22c55e' : '#ef4444',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {fmtP(s.weeklyChangePct)}
          </span>
        </td>
        <td
          style={{ padding: '8px 10px', minWidth: 130 }}
          onClick={() => setSelected(s)}
        >
          <div style={{ height: 4, background: '#0f172a', borderRadius: 2 }}>
            <div
              style={{
                height: '100%',
                borderRadius: 2,
                background: 'linear-gradient(90deg,#ef4444,#f59e0b,#22c55e)',
                width: `${p52}%`,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              color: '#334155',
              marginTop: 2,
            }}
          >
            <span>₹{fmt(s.w52Low)}</span>
            <span>₹{fmt(s.w52High)}</span>
          </div>
        </td>
        <td style={{ padding: '8px 10px' }} onClick={() => setSelected(s)}>
          <Sparkline data={s.history} positive={s.dailyChangePct >= 0} />
        </td>
        <td
          style={{ padding: '8px 10px', color: '#475569', fontSize: 11 }}
          onClick={() => setSelected(s)}
        >
          {fmtV(s.volume)}
        </td>
        <td
          style={{ padding: '8px 10px', color: '#475569', fontSize: 11 }}
          onClick={() => setSelected(s)}
        >
          {fmtMC(s.marketCap)}
        </td>
      </tr>
    );
  };

  const THead = ({ withRank }) => (
    <tr>
      {withRank && <th style={thS}>#</th>}
      <th style={thS}>⭐</th>
      <th onClick={() => hs('symbol')} style={{ ...thS, cursor: 'pointer' }}>
        Symbol
        <SIco col="symbol" />
      </th>
      <th onClick={() => hs('name')} style={{ ...thS, cursor: 'pointer' }}>
        Company
        <SIco col="name" />
      </th>
      <th onClick={() => hs('price')} style={{ ...thS, cursor: 'pointer' }}>
        Price
        <SIco col="price" />
      </th>
      <th
        onClick={() => hs('dailyChangePct')}
        style={{ ...thS, cursor: 'pointer' }}
      >
        Day %<SIco col="dailyChangePct" />
      </th>
      <th
        onClick={() => hs('weeklyChangePct')}
        style={{ ...thS, cursor: 'pointer' }}
      >
        Week %<SIco col="weeklyChangePct" />
      </th>
      <th style={thS}>52W Range</th>
      <th style={thS}>7D Chart</th>
      <th onClick={() => hs('volume')} style={{ ...thS, cursor: 'pointer' }}>
        Volume
        <SIco col="volume" />
      </th>
      <th onClick={() => hs('marketCap')} style={{ ...thS, cursor: 'pointer' }}>
        Mkt Cap
        <SIco col="marketCap" />
      </th>
    </tr>
  );

  const TABS = [
    ['all', '📋 All Stocks'],
    ['gainers', '🚀 Gainers'],
    ['losers', '📉 Losers'],
    [
      'watchlist',
      `⭐ Watchlist${watchlist.length ? ` (${watchlist.length})` : ''}`,
    ],
    ['heatmap', '🟩 Heatmap'],
    ['fo', '📊 F&O'],
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#070c18',
        color: '#f1f5f9',
        fontFamily: "'Inter',system-ui,sans-serif",
      }}
    >
      {/* ── Ticker Tape ── */}
      <div
        style={{
          background: '#0a0f1e',
          borderBottom: '1px solid #1e293b',
          overflow: 'hidden',
          height: 30,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 28,
            animation: 'ticker 45s linear infinite',
            whiteSpace: 'nowrap',
            paddingLeft: 20,
          }}
        >
          {[...ticker, ...ticker].map((s, i) => (
            <span key={i} style={{ fontSize: 11, color: '#64748b' }}>
              <b style={{ color: '#94a3b8' }}>{s.symbol}</b>{' '}
              <span
                style={{ color: s.dailyChangePct >= 0 ? '#22c55e' : '#ef4444' }}
              >
                ₹{fmt(s.price)} {fmtP(s.dailyChangePct)}
              </span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ── Header ── */}
      <div
        style={{
          background: 'linear-gradient(135deg,#0a0f1e,#0d1a35)',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <div style={{ maxWidth: 1500, margin: '0 auto', padding: '14px 18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            {/* Branding */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>🇮🇳</span>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#f97316',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Shiva's Analysis Site
                </div>
                <h1
                  style={{
                    margin: '2px 0 0',
                    fontSize: 22,
                    fontWeight: 900,
                    background: 'linear-gradient(90deg,#f97316,#facc15)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  IndiaStocks
                </h1>
                <p style={{ margin: 0, color: '#334155', fontSize: 10 }}>
                  NSE · BSE · 15-min delayed · {updated}
                </p>
              </div>
            </div>

            {/* Index Cards */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {[
                ['NIFTY 50', nifty],
                ['SENSEX', sensex],
                ['BANK NIFTY', bnifty],
              ].map(([n, v]) => (
                <div
                  key={n}
                  style={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: 10,
                    padding: '8px 12px',
                    minWidth: 120,
                  }}
                >
                  <div
                    style={{
                      color: '#475569',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      color: '#f1f5f9',
                      fontSize: 17,
                      fontWeight: 900,
                      margin: '2px 0 1px',
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      color: parseFloat(avgCh) >= 0 ? '#22c55e' : '#ef4444',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {parseFloat(avgCh) >= 0 ? '▲' : '▼'} {Math.abs(avgCh)}%
                  </div>
                </div>
              ))}
              <div
                style={{
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: 10,
                  padding: '8px 12px',
                }}
              >
                <div
                  style={{
                    color: '#475569',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Breadth
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>
                    ▲{mktUp}
                  </span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>
                    ▼{mktDn}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: '#1e293b',
                    borderRadius: 2,
                    marginTop: 5,
                    width: 80,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 2,
                      background: '#22c55e',
                      width: `${(mktUp / (mktUp + mktDn)) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={load}
                style={{
                  background: 'linear-gradient(135deg,#f97316,#f59e0b)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 700,
                  alignSelf: 'center',
                }}
              >
                ⟳ Refresh
              </button>
            </div>
          </div>

          {/* Search + Sector */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search symbol or company..."
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                background: '#0f172a',
                border: '1px solid #1e293b',
                color: '#f1f5f9',
                fontSize: 12,
                outline: 'none',
                width: 220,
              }}
            />
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                background: '#0f172a',
                border: '1px solid #1e293b',
                color: '#94a3b8',
                fontSize: 12,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Sectors' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div
            style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}
          >
            {TABS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 7,
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                  background:
                    tab === key
                      ? 'linear-gradient(135deg,#f97316,#f59e0b)'
                      : '#0f172a',
                  border: tab === key ? 'none' : '1px solid #1e293b',
                  color: tab === key ? '#fff' : '#64748b',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 18,
              padding: 24,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 24,
                      fontWeight: 900,
                      color: '#f1f5f9',
                    }}
                  >
                    {selected.symbol}
                  </h2>
                  <span
                    style={{
                      background:
                        (SECTOR_COLORS[selected.sector] || '#6366f1') + '33',
                      color: SECTOR_COLORS[selected.sector] || '#6366f1',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {selected.sector}
                  </span>
                  {selected.fo && (
                    <span
                      style={{
                        background: '#7c3aed33',
                        color: '#a78bfa',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      F&O
                    </span>
                  )}
                </div>
                <p
                  style={{ margin: '4px 0 0', color: '#475569', fontSize: 13 }}
                >
                  {selected.name}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWL(selected.symbol);
                  }}
                  style={{
                    background: watchlist.includes(selected.symbol)
                      ? '#ca8a0422'
                      : '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: 8,
                    color: watchlist.includes(selected.symbol)
                      ? '#f59e0b'
                      : '#64748b',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {watchlist.includes(selected.symbol)
                    ? '⭐ Watching'
                    : '☆ Watch'}
                </button>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: '#1e293b',
                    border: 'none',
                    color: '#64748b',
                    fontSize: 16,
                    cursor: 'pointer',
                    borderRadius: 8,
                    width: 30,
                    height: 30,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#f1f5f9' }}>
                ₹{fmt(selected.price)}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 6,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    background:
                      selected.dailyChangePct >= 0 ? '#14532d55' : '#7f1d1d55',
                    color: selected.dailyChangePct >= 0 ? '#22c55e' : '#ef4444',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {selected.dailyChangePct >= 0 ? '▲' : '▼'}{' '}
                  {fmtP(selected.dailyChangePct)} Today
                </span>
                <span
                  style={{
                    background:
                      selected.weeklyChangePct >= 0 ? '#14532d33' : '#7f1d1d33',
                    color:
                      selected.weeklyChangePct >= 0 ? '#16a34a' : '#dc2626',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {fmtP(selected.weeklyChangePct)} Week
                </span>
              </div>
            </div>
            {/* Expanded 7-day chart */}
            <div
              style={{
                marginTop: 14,
                background: '#1e293b',
                borderRadius: 10,
                padding: '10px 14px',
              }}
            >
              <div
                style={{
                  color: '#475569',
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                7-Day Price Chart
              </div>
              <svg
                width="100%"
                height="56"
                viewBox="0 0 300 56"
                preserveAspectRatio="none"
              >
                {selected.history &&
                  (() => {
                    const d = selected.history,
                      mn = Math.min(...d),
                      mx = Math.max(...d),
                      rng = mx - mn || 1;
                    const pts = d
                      .map(
                        (v, i) =>
                          `${i * (300 / (d.length - 1))},${
                            4 + (1 - (v - mn) / rng) * 48
                          }`
                      )
                      .join(' ');
                    return (
                      <>
                        <polyline
                          points={pts}
                          fill="none"
                          stroke={
                            selected.dailyChangePct >= 0 ? '#22c55e' : '#ef4444'
                          }
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        {d.map((v, i) => (
                          <circle
                            key={i}
                            cx={i * (300 / (d.length - 1))}
                            cy={4 + (1 - (v - mn) / rng) * 48}
                            r="2.5"
                            fill={
                              selected.dailyChangePct >= 0
                                ? '#22c55e'
                                : '#ef4444'
                            }
                          />
                        ))}
                      </>
                    );
                  })()}
              </svg>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 8,
                marginTop: 12,
              }}
            >
              {[
                [
                  'Day Chg',
                  `${selected.dailyChange >= 0 ? '+' : ''}₹${fmt(
                    selected.dailyChange
                  )}`,
                ],
                [
                  'Week Chg',
                  `${selected.weeklyChange >= 0 ? '+' : ''}₹${fmt(
                    selected.weeklyChange
                  )}`,
                ],
                ['Volume', fmtV(selected.volume)],
                ['52W High', `₹${fmt(selected.w52High)}`],
                ['52W Low', `₹${fmt(selected.w52Low)}`],
                ['Mkt Cap', fmtMC(selected.marketCap)],
                ...(selected.fo
                  ? [
                      ['Open Int.', fmtV(selected.oi)],
                      ['Impl. Vol.', `${selected.iv}%`],
                    ]
                  : [[]]),
              ]
                .filter((x) => x.length)
                .map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      background: '#1e293b',
                      borderRadius: 8,
                      padding: '10px 12px',
                    }}
                  >
                    <div
                      style={{
                        color: '#475569',
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      style={{
                        color: '#f1f5f9',
                        fontWeight: 800,
                        fontSize: 13,
                        marginTop: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  color: '#475569',
                  fontSize: 9,
                  marginBottom: 5,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                52-Week Range
              </div>
              <div
                style={{ height: 6, background: '#1e293b', borderRadius: 4 }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 4,
                    background:
                      'linear-gradient(90deg,#ef4444,#f59e0b,#22c55e)',
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        ((selected.price - selected.w52Low) /
                          (selected.w52High - selected.w52Low)) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: '#475569',
                  marginTop: 4,
                }}
              >
                <span>₹{fmt(selected.w52Low)}</span>
                <span>₹{fmt(selected.w52High)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div
        style={{ maxWidth: 1500, margin: '0 auto', padding: '16px 16px 32px' }}
      >
        {(tab === 'all' ||
          tab === 'gainers' ||
          tab === 'losers' ||
          tab === 'watchlist') &&
          (() => {
            const dataMap = {
              all: sorted,
              gainers: topG,
              losers: topL,
              watchlist: wlStocks,
            };
            const titles = {
              gainers: "🚀 Top 20 Gainers — Today's Best",
              losers: "📉 Top 20 Losers — Today's Worst",
              watchlist: '⭐ Your Watchlist',
            };
            const data = dataMap[tab];
            return (
              <>
                {titles[tab] && (
                  <h2
                    style={{
                      color: '#f1f5f9',
                      fontSize: 18,
                      fontWeight: 800,
                      margin: '0 0 12px',
                    }}
                  >
                    {titles[tab]}
                  </h2>
                )}
                {tab === 'all' && (
                  <p
                    style={{
                      color: '#334155',
                      fontSize: 11,
                      margin: '0 0 8px',
                    }}
                  >
                    Showing {data.length} of {stocks.length} stocks · ☆ to
                    watchlist · click row for details
                  </p>
                )}
                {tab === 'watchlist' && data.length === 0 && (
                  <div
                    style={{
                      background: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: 12,
                      padding: '40px',
                      textAlign: 'center',
                      color: '#475569',
                    }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 12 }}>☆</div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#64748b',
                      }}
                    >
                      Watchlist is empty
                    </div>
                    <div style={{ fontSize: 13, marginTop: 6 }}>
                      Click ☆ next to any stock to add it here
                    </div>
                  </div>
                )}
                {data.length > 0 && (
                  <div
                    style={{
                      overflowX: 'auto',
                      borderRadius: 12,
                      border: '1px solid #1e293b',
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        minWidth: 900,
                      }}
                    >
                      <thead>
                        <THead
                          withRank={tab === 'gainers' || tab === 'losers'}
                        />
                      </thead>
                      <tbody>
                        {data.map((s, i) => (
                          <StockRow
                            key={s.symbol}
                            s={s}
                            rank={
                              tab !== 'all' && tab !== 'watchlist'
                                ? i + 1
                                : undefined
                            }
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            );
          })()}
        {tab === 'heatmap' && <SectorHeatmap stocks={stocks} />}
        {tab === 'fo' && <FOSection stocks={stocks} />}

        <div
          style={{
            marginTop: 24,
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 10,
            padding: '12px 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#334155',
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            ⚠️ Data is simulated for demo. For live NSE data deploy the{' '}
            <b style={{ color: '#f97316' }}>api/nse.js</b> backend on Vercel.
            Not SEBI-registered financial advice. © Shiva's Analysis Site
          </p>
        </div>
      </div>
    </div>
  );
}
