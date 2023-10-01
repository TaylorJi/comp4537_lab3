const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const currentDate = require('./module/utils.js').getDate();
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/getDate/') {
        const name = parsedUrl.query.name || "Guest";
        // const currentTime = new Date().toLocaleTimeString();

        const responseMessage = `
            <span style="color: blue;">
                <strong>
                Hello, ${name}! What a beautiful day. Server current date and time is ${currentDate}.
                </strong>            </span>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' }); // head
        res.end(responseMessage); // body
    } else if (parsedUrl.pathname === '/COMP4537/labs/3/writeFile/') { // append to file
        // to append/text?= context
        const textToWrite = parsedUrl.query.text + '\n';
        
        fs.appendFile('file.txt', textToWrite, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to write to the file.');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Text appended successfully.');
        });
    } else if (parsedUrl.pathname.startsWith('/COMP4537/labs/3/readFile/')) {
        const filename = parsedUrl.pathname.split('/COMP4537/labs/3/readFile/')[1];
        const filePath = path.join(__dirname, filename);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end(`File "${filename}" not found.`);
                    return;
                }
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to read the file.');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
}).listen(10000, () => {
    console.log('Server is running on port 3000');
});