const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("I could not find that file.");
			resolve(data);
		});
	});
};

const writeFilePromise = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("I could not write the file.");
			resolve("Success");
		});
	});
};

const getDogPicture = async () => {
	try {
		const data = await readFilePromise(`${__dirname}/dog.txt`);

		const res = await superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		console.log(res.body.message);

		await writeFilePromise("dog-img.txt", res.body.message);
		console.log("Random dog image saved to file!");
	} catch (err) {
		console.log(err);
	}
};

getDogPicture();

/*
readFilePromise(`${__dirname}/dog.txt`)
	.then((data) => {
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);
		return writeFilePromise("dog-img.txt", res.body.message);
	})
	.then(() => {
		console.log("Random dog image saved to file!");
	})
	.catch((err) => {
		console.log(err.message);
	});
*/
