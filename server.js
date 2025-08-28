import fs from 'fs';
import https from 'https';
import express from 'express';
import path from 'path';

const app = express();
const certDir = '/app/certs';

const options = {
  key: fs.readFileSync(path.join(certDir, 'server.key')),
  cert: fs.readFileSync(path.join(certDir, 'server.crt')),
  ca: fs.readFileSync(path.join(certDir, 'ca.crt')),
  requestCert: true,
  rejectUnauthorized: true // Reject clients without valid cert
};

// Route for downloading main.exe
app.get('/main.exe', (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Unauthorized: Client certificate required');
  }

  const filePath = path.join('/app', 'main.exe');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.download(filePath);
});

// Start server on Railway's port or fallback to 443
const PORT = process.env.PORT || 443;
https.createServer(options, app).listen(PORT, () => {
  console.log(`[INFO] Mutual TLS server running on port ${PORT}`);
});
