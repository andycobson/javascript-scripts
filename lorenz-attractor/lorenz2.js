var x = 400;
var y = 300;
function startThread() {
    tdMain.start();
    pixel.start(4, 4, 200, 150);
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
    },
    getContext : function(){
        return this.context;
    }
}

var pixel = {
    start : function(width, height, x, y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        
        this.q = 0.01;
        this.w = 0.001;
        this.e = 0.0

        this.a = 15;
        this.b = 28;
        this.c = (8.0/3.0);
        this.i = .01;

        this.dt = 0;
        this.dq = 0;
        this.dw = 0;
        this.de = 0;

    },
    draw : function() {
        let ctx = tdMain.getContext();
        this.ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    },
    update : function(nx, ny) {
        this.dt = .01;
        this.dq = (this.a * (this.w - this.q)) * this.dt;
        this.dw = (this.q * (this.b - this.e) - this.w) * this.dt;
        this.de = (this.q * this.w - this.c * this.e) * this.dt;
        this.q += this.dq;
        this.w += this.dw;
        this.e += this.de;

        this.x += this.dq * 5;
        this.y += this.dw * 5;
    }
}

function updateTd() {
    tdMain.clear();
    pixel.update(x, y);
    pixel.draw();
}