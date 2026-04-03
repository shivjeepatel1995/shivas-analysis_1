// api/nse.js — Vercel Serverless Function (NSE CORS Proxy)
const https = require('https');

const NSE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.nseindia.com/',
  Origin: 'https://www.nseindia.com',
  Connection: 'keep-alive',
};

async function fetchNSE(path) {
  return new Promise((resolve, reject) => {
    const cookieReq = https.request(
      {
        hostname: 'www.nseindia.com',
        path: '/',
        method: 'GET',
        headers: NSE_HEADERS,
      },
      (cookieRes) => {
        const cookies = (cookieRes.headers['set-cookie'] || [])
          .map((c) => c.split(';')[0])
          .join('; ');
        const apiReq = https.request(
          {
            hostname: 'www.nseindia.com',
            path,
            method: 'GET',
            headers: { ...NSE_HEADERS, Cookie: cookies },
          },
          (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
              try {
                resolve(JSON.parse(data));
              } catch {
                reject(new Error('Invalid JSON'));
              }
            });
          }
        );
        apiReq.on('error', reject);
        apiReq.end();
      }
    );
    cookieReq.on('error', reject);
    cookieReq.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=900');
  const { type, symbol } = req.query;
  try {
    const paths = {
      nifty50: '/api/equity-stockIndices?index=NIFTY%2050',
      gainers: '/api/live-analysis-variations?index=gainers&limit=20',
      losers: '/api/live-analysis-variations?index=loosers&limit=20',
      fo: '/api/equity-stockIndices?index=NIFTY%20F%26O',
      indices: '/api/allIndices',
      quote: `/api/quote-equity?symbol=${encodeURIComponent(symbol || '')}`,
    };
    if (!paths[type]) return res.status(400).json({ error: 'Invalid type' });
    const data = await fetchNSE(paths[type]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'NSE fetch failed', details: err.message });
  }
};
