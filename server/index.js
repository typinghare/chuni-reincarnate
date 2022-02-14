const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = req.url;
  const filepath = path.join(__dirname, '../public' + url);
  let content = '';
  try {
    content = fs.readFileSync(filepath);
  } catch (e) {
    console.log('No such file.');
  }
  res.end(content);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});