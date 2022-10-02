var express = require('express');
const { text } = require("express");
app = express();
server = require('http').createServer(app);
io = require('socket.io')(server);

var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort({path: "/COM4", baudRate: 9600 });

var fs = require("fs");
const { inflate } = require('zlib');
const str = fs.readFileSync('./logs.txt', 'utf8');

var username = str.split('\n')[0];
var password = str.split('\n')[1];
var riderID = str.split('\n')[2];

console.log(username);
console.log(password);
console.log(riderID);



var ZwiftAccount = require("zwift-mobile-api");
var account = new ZwiftAccount(username, password);
var world = account.getWorld(1);




 
server.listen(8080);
app.use(express.static('public'));
 
var data;

io.sockets.on('connection', function (socket) {
        socket.on('led', function (receivedData) {
                data = receivedData.value;
                
                serialPort.write(data);
                //console.log(brightness);
                io.sockets.emit('led', {value: data});

                if(data = "z1"){
                        world.riderStatus(riderID).then(status => {
                        console.log("Hi - 2");
                        console.log("heart rate: "+status.riderStatus.heartrate);
                        });
                };
        });
        
        socket.emit('led', {value: data});
});

function zwiftSendData(){

}

console.log("Web Server Started go to 'http://localhost:8080' in your Browser.");
