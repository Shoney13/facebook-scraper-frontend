const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const dotenv = require("dotenv");
const expressStaticGzip = require("express-static-gzip");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.server == "production") {
	app.use(function (req, res, next) {
		if (!req.secure) {
			res.redirect("https://" + req.get("Host") + req.url);
		} else {
			next();
		}
	});
}

app.get("/.well-known/acme-challenge/:slug", async (req, res) => {
	const filePath = path.resolve(
		__dirname,
		"..",
		".well-known/acme-challenge",
		`${req.params.slug}`
	);
	fs.readFile(filePath, "utf8", async (err, data) => {
		if (err) {
			console.error(err);
			console.log("Error in acme-challenge");
			return res.status(500).end();
		}

		res.send(data);
	});
});


app.use(
	"/",
	expressStaticGzip(path.resolve(__dirname, "..", "build"), {
		orderPreference: ["br", "gzip"],
		enableBrotli: true,
		serveStatic: {
			dotfiles: "allow",
			setHeaders: (res, path) => {
				if (path.includes("static") || path.includes("fonts")) {
					res.setHeader("Cache-Control", "public, max-age=1204800");
				} else {
					res.setHeader("Cache-Control", "no-cache");
				}
			},
		},
	})
);

app.get("/*", async (req, res) => {
	const filePath = path.resolve(__dirname, "..", "build", "index.html");
	fs.readFile(filePath, "utf8", async (err, data) => {
		if (err) {
			console.error(err);
			console.log("Error reading HTML in /*");
			return res.status(500).end();
		}

		res.send(data);
	});
});

//const privateKey1 = fs.readFileSync("/var/www/html/privkey.pem", "utf8");
//const certificate1 = fs.readFileSync("/var/www/html/cert.pem", "utf8");
//const ca1 = fs.readFileSync("/var/www/html/chain.pem", "utf8");

if (process.env.server == "production") {
	const privateKey1 = fs.readFileSync(
		"/etc/letsencrypt/live/fbscraper.pankajbaranwal.com/privkey.pem",
		"utf8"
	);
	const certificate1 = fs.readFileSync(
		"/etc/letsencrypt/live/fbscraper.pankajbaranwal.com/fullchain.pem",
		"utf8"
	);
	const credentials = {
		key: privateKey1,
		cert: certificate1,
	};

	const httpsServer = https.createServer(credentials, app);


	httpsServer.listen(443, () => {
		console.log("HTTPS Server running on port 443");
	});
	httpsServer.on("error", (err) => {
		console.log("Error in https Server");
		console.error(err);
	});
}

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
	console.log("HTTP Server running on port", PORT);
});

httpServer.on("error", (err) => {
	console.log("Error in http Server");
	console.error(err);
});