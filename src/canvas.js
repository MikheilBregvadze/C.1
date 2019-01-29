import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth -3.5
canvas.height = innerHeight -3.5 

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let gravity = 0.9;
var friction = 0.95;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth -3.5
    canvas.height = innerHeight -3.5

    init()
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
// Objects
function Ball(x, y, dy, dx, radius, color) {
    this.x = x
    this.y = y
    this.dx =dx
    this.dy = dy
    this.radius = radius
    this.color = color
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
}

Object.prototype.update = function() {
    if(this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
    }else {
        this.dy += gravity;
        // console.log(this.dy)
    }
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
}

// Implementation
let ball
let ballArray;
function init() {
    ballArray = [];
    for (let i = 0; i < 300; i++) {
        var radius = randomIntFromRange(4, 20);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors)
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    console.log(ballArray)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)

    for(var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
