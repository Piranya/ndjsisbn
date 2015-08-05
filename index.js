var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/search"] = requestHandlers.search;
handle["/show"] = requestHandlers.show;
handle["/isbn"] = requestHandlers.isbn;
handle["/isbn/"] = requestHandlers.isbn;


server.start(router.route, handle);
