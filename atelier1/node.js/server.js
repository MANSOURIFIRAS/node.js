var http = require ('http');
var url = require ('url');
var querystring = require('querystring');

var server = http.createServer (function (req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    // console.log(page);
    // res.writeHead (200, {"Content-Type": "text/plain"});
//     res.write ('<!DOCTYPE html>'+
//  '<html>'+
//      '<head>'+
//           '<meta charset="utf-8">'+
//           '<title>Ma page Node.js !</title>'+
//      '</head>'+
//       '<body>'+
//          '<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
//       '</body>'+
//  '</html>');
    if (page == '/') {
    res.writeHead (200, {"Content-Type": "text/plain"});
        res.write ('Vous etes dans la page d\'accueil \n');
    }
    else if (page == '/Contact') {
    res.writeHead (200, {"Content-Type": "text/plain"});

        res.write ('Vous etes dans la page Contact ! \n');
    }
    else if (page ==  '/Affichage/1/user') {
        res.writeHead (200, {"Content-Type": "text/plain"});
        res.write ('Affichez 1\'utilisateur qui a 1\'id 1 ! ');
    }
    else{
        res.writeHead (404, {"Content-Type": "text/plain"});
        res.write ('error ');
    }

    //params
    if ('id' in params && 'login' in params) {
        res.write ('Votre id est ' + params['id'] + ' et votre login est ' + params ['login']);
     }
     else {
        res.write ('Veuillez saisir votre id et login!');
     }
    
    res.end();
});
server.listen (5000);
