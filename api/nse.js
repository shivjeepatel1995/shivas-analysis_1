// api/nse.js — Vercel Serverless Function
// Uses Yahoo Finance to fetch real NSE/BSE data — NO API KEY NEEDED

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=300"); // cache 5 min

  const { type } = req.query;

  // All 50 NSE stocks with Yahoo Finance tickers (.NS suffix)
  const SYMBOLS = [
    { symbol: "RELIANCE",    ticker: "RELIANCE.NS",   sector: "Energy",        fo: true  },
    { symbol: "TCS",         ticker: "TCS.NS",         sector: "IT",            fo: true  },
    { symbol: "HDFCBANK",    ticker: "HDFCBANK.NS",    sector: "Banking",       fo: true  },
    { symbol: "INFY",        ticker: "INFY.NS",        sector: "IT",            fo: true  },
    { symbol: "ICICIBANK",   ticker: "ICICIBANK.NS",   sector: "Banking",       fo: true  },
    { symbol: "HINDUNILVR",  ticker: "HINDUNILVR.NS",  sector: "FMCG",          fo: true  },
    { symbol: "SBIN",        ticker: "SBIN.NS",        sector: "Banking",       fo: true  },
    { symbol: "BAJFINANCE",  ticker: "BAJFINANCE.NS",  sector: "NBFC",          fo: true  },
    { symbol: "BHARTIARTL",  ticker: "BHARTIARTL.NS",  sector: "Telecom",       fo: true  },
    { symbol: "KOTAKBANK",   ticker: "KOTAKBANK.NS",   sector: "Banking",       fo: true  },
    { symbol: "WIPRO",       ticker: "WIPRO.NS",       sector: "IT",            fo: true  },
    { symbol: "HCLTECH",     ticker: "HCLTECH.NS",     sector: "IT",            fo: true  },
    { symbol: "LT",          ticker: "LT.NS",          sector: "Infrastructure",fo: true  },
    { symbol: "AXISBANK",    ticker: "AXISBANK.NS",    sector: "Banking",       fo: true  },
    { symbol: "ASIANPAINT",  ticker: "ASIANPAINT.NS",  sector: "Paints",        fo: true  },
    { symbol: "MARUTI",      ticker: "MARUTI.NS",      sector: "Automobile",    fo: true  },
    { symbol: "SUNPHARMA",   ticker: "SUNPHARMA.NS",   sector: "Pharma",        fo: true  },
    { symbol: "TATAMOTORS",  ticker: "TATAMOTORS.NS",  sector: "Automobile",    fo: true  },
    { symbol: "NESTLEIND",   ticker: "NESTLEIND.NS",   sector: "FMCG",          fo: false },
    { symbol: "ULTRACEMCO",  ticker: "ULTRACEMCO.NS",  sector: "Cement",        fo: true  },
    { symbol: "TITAN",       ticker: "TITAN.NS",       sector: "Consumer",      fo: true  },
    { symbol: "POWERGRID",   ticker: "POWERGRID.NS",   sector: "Power",         fo: true  },
    { symbol: "ONGC",        ticker: "ONGC.NS",        sector: "Energy",        fo: true  },
    { symbol: "NTPC",        ticker: "NTPC.NS",        sector: "Power",         fo: true  },
    { symbol: "M&M",         ticker: "M&M.NS",         sector: "Automobile",    fo: true  },
    { symbol: "BAJAJFINSV",  ticker: "BAJAJFINSV.NS",  sector: "NBFC",          fo: true  },
    { symbol: "JSWSTEEL",    ticker: "JSWSTEEL.NS",    sector: "Metals",        fo: true  },
    { symbol: "TATASTEEL",   ticker: "TATASTEEL.NS",   sector: "Metals",        fo: true  },
    { symbol: "ADANIENT",    ticker: "ADANIENT.NS",    sector: "Conglomerate",  fo: true  },
    { symbol: "ADANIPORTS",  ticker: "ADANIPORTS.NS",  sector: "Infrastructure",fo: true  },
    { symbol: "CIPLA",       ticker: "CIPLA.NS",       sector: "Pharma",        fo: true  },
    { symbol: "DRREDDY",     ticker: "DRREDDY.NS",     sector: "Pharma",        fo: true  },
    { symbol: "EICHERMOT",   ticker: "EICHERMOT.NS",   sector: "Automobile",    fo: true  },
    { symbol: "HEROMOTOCO",  ticker: "HEROMOTOCO.NS",  sector: "Automobile",    fo: true  },
    { symbol: "INDUSINDBK",  ticker: "INDUSINDBK.NS",  sector: "Banking",       fo: true  },
    { symbol: "TECHM",       ticker: "TECHM.NS",       sector: "IT",            fo: true  },
    { symbol: "BRITANNIA",   ticker: "BRITANNIA.NS",   sector: "FMCG",          fo: true  },
    { symbol: "COALINDIA",   ticker: "COALINDIA.NS",   sector: "Mining",        fo: true  },
    { symbol: "GRASIM",      ticker: "GRASIM.NS",      sector: "Diversified",   fo: true  },
    { symbol: "BAJAJ-AUTO",  ticker: "BAJAJ-AUTO.NS",  sector: "Automobile",    fo: true  },
    { symbol: "HINDALCO",    ticker: "HINDALCO.NS",    sector: "Metals",        fo: true  },
    { symbol: "APOLLOHOSP",  ticker: "APOLLOHOSP.NS",  sector: "Healthcare",    fo: true  },
    { symbol: "TATACONSUM",  ticker: "TATACONSUM.NS",  sector: "FMCG",          fo: true  },
    { symbol: "BPCL",        ticker: "BPCL.NS",        sector: "Energy",        fo: true  },
    { symbol: "ITC",         ticker: "ITC.NS",         sector: "FMCG",          fo: true  },
    { symbol: "VEDL",        ticker: "VEDL.NS",        sector: "Metals",        fo: true  },
    { symbol: "ZOMATO",      ticker: "ZOMATO.NS",      sector: "Consumer Tech", fo: true  },
    { symbol: "DIVISLAB",    ticker: "DIVISLAB.NS",    sector: "Pharma",        fo: true  },
    { symbol: "LTIM",        ticker: "LTIM.NS",        sector: "IT",            fo: true  },
    { symbol: "PIDILITIND",  ticker: "PIDILITIND.NS",  sector: "Chemicals",     fo: false },
  ];

  // Fetch a single stock's quote from Yahoo Finance
  const fetchQuote = async (ticker) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=7d`;
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    if (!r.ok) throw new Error(`Failed: ${ticker}`);
    return r.json();
  };

  try {
    if (type === "stocks") {
      // Fetch all stocks in parallel (batched to avoid rate limits)
      const BATCH = 10;
      const results = [];

      for (let i = 0; i < SYMBOLS.length; i += BATCH) {
        const batch = SYMBOLS.slice(i, i + BATCH);
        const settled = await Promise.allSettled(batch.map(s => fetchQuote(s.ticker)));

        settled.forEach((result, idx) => {
          const meta = batch[idx];
          if (result.status === "fulfilled") {
            const chart = result.value?.chart?.result?.[0];
            if (!chart) return;
            const q = chart.meta;
            const closes = chart.indicators?.quote?.[0]?.close || [];
            const validCloses = closes.filter(Boolean);
            const price = q.regularMarketPrice || 0;
            const prevClose = q.chartPreviousClose || q.previousClose || price;
            const weekAgoClose = validCloses[0] || prevClose;
            const dailyChange = parseFloat((price - prevClose).toFixed(2));
            const dailyChangePct = parseFloat(((dailyChange / prevClose) * 100).toFixed(2));
            const weeklyChange = parseFloat((price - weekAgoClose).toFixed(2));
            const weeklyChangePct = parseFloat(((weeklyChange / weekAgoClose) * 100).toFixed(2));
            results.push({
              symbol: meta.symbol,
              name: q.longName || q.shortName || meta.symbol,
              sector: meta.sector,
              fo: meta.fo,
              exchange: "NSE",
              price: parseFloat(price.toFixed(2)),
              dailyChange,
              dailyChangePct,
              weeklyChange,
              weeklyChangePct,
              w52High: parseFloat((q.fiftyTwoWeekHigh || price * 1.2).toFixed(2)),
              w52Low: parseFloat((q.fiftyTwoWeekLow || price * 0.8).toFixed(2)),
              volume: q.regularMarketVolume || 0,
              marketCap: q.marketCap || 0,
              history: validCloses.slice(-7).map(v => parseFloat(v.toFixed(2))),
            });
          }
        });

        // Small delay between batches to avoid rate limiting
        if (i + BATCH < SYMBOLS.length) {
          await new Promise(r => setTimeout(r, 300));
        }
      }

      return res.status(200).json({ success: true, data: results, timestamp: new Date().toISOString() });
    }

    // Fetch indices (NIFTY 50, SENSEX, BANK NIFTY)
    if (type === "indices") {
      const indexTickers = ["^NSEI", "^BSESN", "^NSEBANK"];
      const indexNames   = ["NIFTY 50", "SENSEX", "BANK NIFTY"];
      const settled = await Promise.allSettled(indexTickers.map(t => fetchQuote(t)));
      const indices = {};
      settled.forEach((r, i) => {
        if (r.status === "fulfilled") {
          const meta = r.value?.chart?.result?.[0]?.meta;
          if (meta) {
            const price = meta.regularMarketPrice || 0;
            const prev  = meta.chartPreviousClose || price;
            indices[indexNames[i]] = {
              last: parseFloat(price.toFixed(2)),
              previousClose: parseFloat(prev.toFixed(2)),
              change: parseFloat((price - prev).toFixed(2)),
              percentChange: parseFloat(((price - prev) / prev * 100).toFixed(2)),
            };
          }
        }
      });
      return res.status(200).json({ success: true, data: indices });
    }

    return res.status(400).json({ error: "Invalid type. Use: stocks or indices" });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
