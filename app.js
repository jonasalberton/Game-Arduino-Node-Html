var app = require("express")();
var express = require("express");

// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
    res.sendfile("index.html");
})


var mySocket;

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var mySerial = new serialport("COM4", {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\r\n')
});
mySerial.on("open", function() {
    console.log("porta aberta");
});

var map = new Map();
map.set('U', 38);
map.set('D', 40);
map.set('L', 37);
map.set('R', 39);
map.set('S', 0);
map.set('0', 32);
map.set('1', 32)

mySerial.on("data", function(data) {
    if(data) {
        

        io.emit("dadoArduino", {
        valor: data + '1',    
        keyCode: map.get((data + '1').substr(0,1))
        })
    }
})

io.on("connection", function(socket) {
    console.log("conectou");
});

http.listen(3000, function(){
    console.log("server OK");
});




// var app = require("express")();
// var express = require("express");


// app.use(express.static(__dirname + '/public'));
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

// app.get('/', function(req, res) {
//     res.sendFile("index.html");
// });


// var mySocket;

// console.log('teste de conexão')

// var serialport = require('serialport');
// var portName = "COM4";

// var myPort = new serialport(portName, {
//     baudRate: 9600,
//     parser: new serialport.parsers.Readline('\n')
// });

// myPort.on('open', onOpen);
// myPort.on('data', onData);
// myPort.on('error', function (err) {
//     console.log('Mensagem de erro: ', err.message);
// })

// function onOpen() {
//     console.log('Porta Aberta! Para interromper aplicativo clique em CTRL+ C');
// }

// function onData(data) {
//   console.log('Dado recebido: ' + data);

// io.emit("dadoArduino", {
//     valor: data
// });
// }


// io.on("connection", function(socket){
//     console.log("Um usuario esta conectado!");
// });


// http.listen(3000, function() {
//     console.log("O servidor está disponivel na porta 3000");
// })




