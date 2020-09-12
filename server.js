const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
const PATH = "www/";
let oglasi = [
    {
        "id": 1,
        "Kategorija": "Stan",
        "tekst": "Jednosoban stan, sa terasom u centru grada",
        "Email": "marko@gmail.com"
    },
    {
        "id": 2,
        "Kategorija": "Stan",
        "tekst": "dvosoban stan, sa dva kupatila u rakovici",
        "Email": "@zarko23gmail.com"
    },
    {
        "id": 3,
        "Kategorija": "Automobil",
        "tekst": "vw bora,malo presao, dizel 1.9, ide kao nov",
        "Email": "jelena@gmail.com"
    },
    {
        "id": 4,
        "Kategorija": "Automobil",
        "tekst": "mercedes benz a klasa, 3.0 motor benzin",
        "Email": "viktor@gmail.com"
    }
];


http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-oglasi"){ 
            fs.readFile(PATH + "svi-oglasi.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/api/svi-oglasi"){ 
            res.writeHead(200);
            data = JSON.stringify(sviOglasi());
            res.end(data);
        }
        if (urlObj.pathname == "postavi-tekst"){
            fs.readFile(PATH + "postavi-tekst.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/dodaj-oglas"){
            fs.readFile(PATH + "dodaj-oglas.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
    else if(req.method == "POST") {
        if (urlObj.pathname == "/postavi-tekst"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                postaviTekst(querystring.parse(body).id,querystring.parse(body).tekst)
                res.writeHead(302, {
                    'Location': '/postavi-tekst'
                });
                res.end()
            });
        }
        if (urlObj.pathname == "/obrisi-oglas"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiOglas(querystring.parse(body).id);
                res.writeHead(302, {
                    'Location': 'svi-oglasi'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-oglas"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajOglas(querystring.parse(body).id,querystring.parse(body).proizvodjac,
                           querystring.parse(body).email,querystring.parse(body).tekst);
                res.writeHead(302, {
                    'Location': '/dodaj-oglas'
                });
                res.end();
            });
        }
    }
}).listen(4000);
console.log("Server radi na portu 4000");


function sviOglasi(){
    return oglasi;
}
function postaviTekst(id,tekst){
    for(let i=0;i<oglasi.length;i++){
        if(oglas[i].id == id){
            oglas[i].tekst = tekst
        }
    }
}
function obrisiOglas(id){
    let pomocni = []
    for(let i=0;i<oglasi.length;i++){
        if(oglasi[i].id != id){
            pomocni.push(oglasi[i])
        }
    }
    oglasi = pomocni
    return oglasi
}
function dodajOglas(id,proizvodjac,email,tekst){
    let oglas = {
        'id': id,
        'Proizvodjac': proizvodjac,
        'Email': email,
        'tekst': tekst
    };
    oglasi.push(oglas);
}

