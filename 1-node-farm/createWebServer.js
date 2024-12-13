const http = require("http");
const fs = require("fs");

const overviewPage = fs.readFileSync(
	`${__dirname}/templates/overview.html`,
	"utf-8"
);
const productPage = fs.readFileSync(
	`${__dirname}/templates/product.html`,
	"utf-8"
);
const cardPage = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // __dirname = directory name currently on
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	// overview page
	if (pathName === "/" || pathName === "/overview") {
		res.writeHead(200, { "content-type": "text/html" });
		res.end(overviewPage);

		// product page
	} else if (pathName === "/product") {
		res.writeHead(200, { "content-type": "text/html" });
		res.end(productPage);

		// api page
	} else if (pathName === "/api") {
		res.writeHead(200, { "content-type": "application/json" }); // 200 stands for everything is ok
		res.end(data);

		// not found page
	} else {
		res.writeHead(404, { "content-type": "text/html" }); // 404 stands for error
		res.end("<h1>Page not found!</h1>");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Listen to requests on port 8000");
});
