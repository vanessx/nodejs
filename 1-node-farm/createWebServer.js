const http = require("http");
const fs = require("fs");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

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

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
// dataObject.forEach((el, i) => (el["slug"] = slugs[i])); // adding the slugs to each object in the array

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// overview page
	if (pathname === "/" || pathname === "/overview") {
		res.writeHead(200, { "content-type": "text/html" });

		const cardsHTML = dataObject
			.map((el) => replaceTemplate(cardPage, el))
			.join("");

		const output = overviewPage.replace("{%PRODUCT_CARDS%}", cardsHTML);

		res.end(output);

		// product page
	} else if (pathname === "/product") {
		res.writeHead(200, { "content-type": "text/html" });
		const product = dataObject[query.id];
		const output = replaceTemplate(productPage, product);

		res.end(output);

		// api page
	} else if (pathname === "/api") {
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
