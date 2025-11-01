#!/usr/bin/env node
import https from 'https';
import http from 'http';
import { URL } from 'url';

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].replace(/^--/, '');
      parsed[key] = args[i + 1];
      i++;
    }
  }
  return parsed;
}

const { title, body } = parseArgs();

if (!title || !body) {
  console.error('Usage: notify --title <title> --body <body>');
  process.exit(1);
}

const SERVER = process.env.NOTIFY_SERVER || 'http://192.168.1.53:8080/notify';
const TOKEN = process.env.NOTIFY_TOKEN || 'changeme';

const data = JSON.stringify({
  token: TOKEN,
  title,
  message: body,
});

const url = new URL(SERVER);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  // this assumes theres a trailing / in the SERVER env var
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Authorization': `Bearer ${TOKEN}`,
  },
};

const client = url.protocol === 'https:' ? https : http;

const req = client.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Notification sent!');
  } else {
    console.error(`❌ Server responded with ${res.statusCode}`);
    console.warn(' did you add the /notify part to the url?')
  }
});

req.on('error', (err) => console.error('❌ Request failed:', err.message));
req.write(data);
req.end();
