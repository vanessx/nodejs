const fs = require("fs");

// blocking, synchronous way
const readText = fs.readFileSync("./txt/input.txt", "utf-8"); // read to a file
console.log(readText);

const writeText = `This is what we know about the avocado: ${readText}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", writeText); // write to a file
console.log("File written!");

// non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
	if (err) return console.log("ERROR");

	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
		console.log(data2);
		fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
			console.log(data3);

			fs.writeFile("./txt/final.txt", `${data2} ${data3}`, "utf-8", (err) => {
				console.log("Files have been written.");
			});
		});
	});
});
console.log("Will read file!");
