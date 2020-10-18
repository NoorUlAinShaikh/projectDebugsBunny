const path = require("path");
const express = require("express");
const jsonServer = require("json-server");

const app = express();

//using the inbuilt json parser : express 4.16^
app.use(express.json());

//middleware integration json server with express
app.use("/api", jsonServer.defaults(), jsonServer.router(path.resolve(__dirname, "db", "db.json")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
