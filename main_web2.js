var express = require('express');
const { text } = require("express");
app = express();
server = require('http').createServer(app);
io = require('socket.io')(server);

var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort({path: "/COM4", baudRate: 9600 });
 
server.listen(8080);
app.use(express.static('public'));
 
var brightness;

io.sockets.on('connection', function (socket) {
        socket.on('led', function (data) {
                brightness = data.value;
                
                serialPort.write("p"+brightness);
                serialPort.write("c0");
                io.sockets.emit('led', {value: brightness});   
                });
        
        socket.emit('led', {value: brightness});
});
console.log("Web Server Started go to 'http://localhost:8080' in your Browser.");
