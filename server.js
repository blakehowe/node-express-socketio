"use strict";

//required dependencies
var http = require("http"), express = require("express"), socketIo = require("socket.io");

//initialise the app to be an express app
const app = express();

//set template engine to Jade
app.set("view engine", "jade");

//change root html location
app.use(express.static("./public"));


app.get("/", (request, response) => {
	response.end("Hello World");
});

app.get("/home", (request, response) => {
	response.render("index", {title: "TITLE"});
});

const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("Client connected!");
	socket.on("chat:add", data => {
		console.log(data);
		io.emit("chat:added", data);
	});
});

const port = 3000;
server.listen(port, () => {
	console.log("Server started on Port " + port);
});

