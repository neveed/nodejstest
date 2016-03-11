var http = require('http');

const PORT=8080; 
var dispatcher = require('httpdispatcher');
function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}
var request = require("request");
var title = '';
dispatcher.onGet("/I/want/title", function(req, res) {
	var address = req.params.address;
	var htmlResponse = '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>';

	htmlResponse += '<li> ' + address + ' - ';
			request(address, function(error, response, body) {
			title = (error == null) ? body.match("<title>(.*?)</title>")[1] : 'NO RESPONSE';
			htmlResponse += title + '</li>';
			htmlResponse += '</ul></body></html>';
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(htmlResponse);
		});
});

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});