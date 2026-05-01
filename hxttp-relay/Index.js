const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
const TARGET_URL = process.env.TARGET_URL || "https://hisdepvercel.duckdns.org:2096";

const xhttpProxy = createProxyMiddleware({
  target: TARGET_URL,
  changeOrigin: true,
  secure: true,
  logLevel: 'warn',
  onError: (err, req, res) => {
    console.error('Proxy Error:', err.message);
    res.status(502).send('Bad Gateway');
  }
});

app.use('*', xhttpProxy);
app.listen(port, () => {
  console.log(`XHTTP Relay running on port ${port}, proxying to ${TARGET_URL}`);
});
