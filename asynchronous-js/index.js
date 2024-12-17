const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("I could not find that file");
			resolve(data);
		});
	});
};

readFilePromise(`${__dirname}/dog.txt`).then((data) => {
	superagent
		.get(`https://dog.ceo/api/breed/${data}/images/random`)
		.then((res) => {
			console.log(res.body.message);

			fs.writeFile("dog-img.txt", res.body.message, (err) => {
				console.log("Random dog image saved to file.");
			});
		})
		.catch((err) => {
			console.log(err.message);
		});
});
