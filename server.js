import fs from 'fs';
import https from 'https';
import express from 'express';
import path from 'path';

const app = express();

// Paths for certs
const certDir = '/app/certs';

const options = {
  key: fs.readFileSync(path.join(certDir, 'server.key')),
  cert: fs.readFileSync(path.join(certDir, 'server.crt')),
  ca: fs.readFileSync(path.join(certDir, 'ca.crt')),
  requestCert: true,
  rejectUnauthorized: true // Enforce client cert validation
};

// Route for downloading main.exe
app.get('/main.exe', (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Client certificate required');
  }

  const filePath = path.join('/app', 'main.exe');
  res.download(filePath);
});

// Start HTTPS server
const PORT = process.env.PORT || 443;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Mutual TLS server running on port ${PORT}`);
});
