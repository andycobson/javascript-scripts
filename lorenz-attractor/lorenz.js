var pixel;
var q = 0.01;
var w = 0.001;
var e = 0.0

var a = 15;
var b = 28;
var c = (8.0/3.0);
var i = .01;

var dt = 0;
var dq = 0;
var dw = 0;
var de = 0;

var x = 400;
var y = 300;

function startThread() {
    pixel = new component(4, 4, 200, 150);
    tdMain.start();
}

var tdMain = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateTd, 30);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = tdMain.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function(nx, ny){
        dt = .01;
        dq = (a * (w - q)) * dt;
        dw = (q * (b - e) - w) * dt;
        de = (q * w - c * e) * dt;
        q += dq;
        w += dw;
        e += de;

        this.x += dq * 5;
        this.y += dw * 5;
    }
}

function updateTd() {
    tdMain.clear();
    pixel.newPos(x, y);
    pixel.update();
}