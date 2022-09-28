const {Board, Servo} = require("johnny-five");
const board = new Board({
    port: "COM4"
});

board.on("ready",()=>{
    const servo = new Servo(3);
    servo.to(40);
});