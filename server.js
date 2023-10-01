const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
const currentDate = require('./module/utils.js').getDate();
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/getDate/') {
        const name = parsedUrl.query.name || "Guest";
        // const currentTime = new Date().toLocaleTimeString();

        const responseMessage = `
            <span style="color: blue;">
                <strong>
                Hello, ${name}! What a beautiful day. Server current date and time is ${currentDate}.
                </strong>
            </span>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' }); // head
        res.end(responseMessage); // body
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});