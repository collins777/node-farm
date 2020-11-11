const fs = require("fs");
const http = require("http"); // used for networking such as building an http server
const url = require("url"); // allows us to implement routing

///////////////////////////////////////////////////////////////////////
//// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written!");

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error!");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", err => {
//         console.log("File has been written!");
//       });
//     });
//   });
// });

// console.log("Will read file");

///////////////////////////////////////////////////////////////////////
//// SERVER

// read data from dev-data/data.json then parse json into javascript, send data back to client
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Implement routing using the URL
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    // always send headers before content
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world"
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

// Listen to incoming request
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
