import { createServer } from "http";
import { parse } from "url";

const currentDate = require("./module/utils.js").getDate();

createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    if (parsedUrl.pathname === "/getDate/") {
      const name = parsedUrl.query.name || "Guest";
      // const currentTime = new Date().toLocaleTimeString();

      const responseMessage = `
            <span style="color: blue;">
                <strong>
                Hello, ${name}! What a beautiful day. Server current date and time is ${currentDate}.
                </strong>
            </span>
        `;

      res.writeHead(200, { "Content-Type": "text/html" }); // head
      res.end(responseMessage); // body
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  })
  .listen(8888);
