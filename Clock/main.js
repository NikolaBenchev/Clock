"use strict"

let canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),

interval = 0.05;

canvas.width = canvas.clientWidth;
canvas.height =  canvas.clientHeight;

class Pointer{
    constructor(color, height)
    {
        this.rotation = 180;
        this.color = color;
        this.height = height;
    }
    Draw()
    {
        ctx.save();
        ctx.translate(canvas.width / 2 + 5, canvas.height / 2 + 5);
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.fillStyle = this.color;
        ctx.fillRect(-5, -5, 10, this.height);
        ctx.restore();
    }
}

let secondPointer = new Pointer('#58508d', 500),
minutePointer = new Pointer('#bc5090', 400),
hourPointer = new Pointer('#ffa600', 250);

const Move = function()
{
    console.log('move');
    secondPointer.rotation += 6;
    if(secondPointer.rotation == 540)
    {
        secondPointer.rotation = 180;
        minutePointer.rotation += 6;
    }
    if(minutePointer.rotation == 540)
    {
        minutePointer.rotation = 180;
        hourPointer.rotation += 6;
    }
}

const Draw = function()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.arc(canvas.width / 2, canvas.height / 2, 525, 0, 2 * Math.PI);
    ctx.fillStyle = "#2A3958";
    ctx.fill();
    ctx.stroke();
    // Drawing the second pointer
    secondPointer.Draw();
    // Drawing the minute pointe
    minutePointer.Draw();
    // Drawing the hour pointer
    hourPointer.Draw();
    // Drawing dot
    ctx.fillStyle = '#ff6361';
    ctx.fillRect(canvas.width / 2 - 5, canvas.height / 2 - 5, 20, 20);
}

const Main = function()
{
    requestAnimationFrame(Main);
    Draw();
}

Main();
setInterval(Move, interval * 1000);