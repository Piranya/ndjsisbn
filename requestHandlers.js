var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");
  // request = require("request");


function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/search" '+
    'method="post">'+
    '<input type="text" name="isbn">'+
    '<input type="submit" value="search" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}



function search(response, request) {
  console.log("Request handler 'search' was called.");
  var form = new formidable.IncomingForm();
  isbn='';
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    // console.log(fields);
    console.log(fields.isbn);
    isbn=fields.isbn;
    console.log(isbn);

     var http = require("http");
     console.log('isbn');
     console.log(isbn);
     var options = {
       host: 'www.yakaboo.ua',
       port: 80,
       path: '/search/?cat=&q='+isbn
     };

    request = require("request"),
         options = {
           uri: 'http://www.yakaboo.ua/search/?cat=&q='+isbn,
           timeout: 5000,
           followAllRedirects: true
         };
         request( options, function(error, resp, body) {
             // console.log( response );
              // console.log(response2.request.uri.href);

              var cheerio = require('cheerio'),
                $ = cheerio.load(body);
              title = $('#product-title h1').text();
              price = $('.product-essential .price').text();

              console.log(title,price);

              responseBody = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                title + '<br/>' + price +
                '</body>'+
                '</html>';

              response.writeHead(200, {"Content-Type": "text/html"});
              response.write(responseBody);
              response.end();
         });

  });
  //978-5-17-075637-7 - зеленая миля. Кинг

}


function isbn(response, request) {
  console.log("Request handler 'isbn' was called.");
  var url = require('url');
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(url_parts.query.isbn);
  isbn = url_parts.query.isbn;

  request = require("request"),
       options = {
         uri: 'http://www.yakaboo.ua/search/?cat=&q='+isbn,
         timeout: 5000,
         followAllRedirects: true
       };
       request( options, function(error, resp, body) {
           // console.log( response );
            // console.log(response2.request.uri.href);

            var cheerio = require('cheerio'),
              $ = cheerio.load(body);
            title = $('#product-title h1').text();
            // price = $('#product-price-1037299 .price span').eq(0).text();
            price = "10$";
            image = $('.product-image #image').attr('src');
            console.log(title,price);


            response.writeHead(200, {"Content-Type": "application/json",'charset' : 'utf-8'});
            var bookObject = { title: title, cover:image, price: price, "author": "King", "store":"Yakaboo"};
            var json = JSON.stringify({
              books: bookObject
            });
            console.log(json);
            response.end(json);
       });

  //978-5-17-075637-7 - зеленая миля. Кинг

}


exports.start = start;
exports.search = search;
exports.isbn = isbn;
