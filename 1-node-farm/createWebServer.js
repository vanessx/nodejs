const http = require("http");
const fs = require("fs");

const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%COUNTRY%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	return output;
};

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

		const cardsHTML = dataObject
			.map((el) => replaceTemplate(cardPage, el))
			.join("");

		const output = overviewPage.replace("{%PRODUCT_CARDS%}", cardsHTML);

		res.end(output);

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
