var app = require("express")();
var express = require("express");


app.use(express.static(__dirname + '/public'));
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res) {
    res.sendFile("index.html");
});


var mySocket;

console.log('teste de conexão')

var serialport = require('serialport');
var portName = "COM4";

var myPort = new serialport(portName, {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\n')
});

myPort.on('open', onOpen);
myPort.on('data', onData);
myPort.on('error', function (err) {
    console.log('Mensagem de erro: ', err.message);
})

function onOpen() {
    console.log('Porta Aberta! Para interromper aplicativo clique em CTRL+ C');
}

function onData(data) {
//  console.log('Dado recebido: ' + data);

io.emit("dadoArduino", {
    valor: data
});
}


io.on("connection", function(socket){
    console.log("Um usuario esta conectado!");
});


http.listen(3000, function() {
    console.log("O servidor está disponivel na porta 3000");
})




