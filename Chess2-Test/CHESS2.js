var can = document.getElementById("canvas");
var ctx = can.getContext("2d");
var lnd;

var Pieces = [
    new Piece(1, 1, "r", true, true, true, false, false),
    new Piece(2, 1, "n", true, true, true, false, false),
    new Piece(3, 1, "b", true, true, true, false, false),
    new Piece(4, 1, "q", true, true, true, false, false),
    new Piece(5, 1, "k", true, true, true, false, false),
    new Piece(6, 1, "b", true, true, true, false, false),
    new Piece(7, 1, "n", true, true, true, false, false),
    new Piece(8, 1, "r", true, true, true, false, false),
    new Piece(1, 2, "p", true, true, true, false, false),
    new Piece(2, 2, "p", true, true, true, false, false),
    new Piece(3, 2, "p", true, true, true, false, false),
    new Piece(4, 2, "p", true, true, true, false, false),
    new Piece(5, 2, "p", true, true, true, false, false),
    new Piece(6, 2, "p", true, true, true, false, false),
    new Piece(7, 2, "p", true, true, true, false, false),
    new Piece(8, 2, "p", true, true, true, false, false),

    new Piece(1, 8, "r", false, true, true, false, false),
    new Piece(2, 8, "n", false, true, true, false, false),
    new Piece(3, 8, "b", false, true, true, false, false),
    new Piece(4, 8, "q", false, true, true, false, false),
    new Piece(5, 8, "k", false, true, true, false, false),
    new Piece(6, 8, "b", false, true, true, false, false),
    new Piece(7, 8, "n", false, true, true, false, false),
    new Piece(8, 8, "r", false, true, true, false, false),
    new Piece(1, 7, "p", false, true, true, false, false),
    new Piece(2, 7, "p", false, true, true, false, false),
    new Piece(3, 7, "p", false, true, true, false, false),
    new Piece(4, 7, "p", false, true, true, false, false),
    new Piece(5, 7, "p", false, true, true, false, false),
    new Piece(6, 7, "p", false, true, true, false, false),
    new Piece(7, 7, "p", false, true, true, false, false),
    new Piece(8, 7, "p", false, true, true, false, false),
];

var msX = -1;
var msY = -1;
var select = -1;
var selectPiece = -1;

var dlt = 0;
var lst = performance.now();
var interval = setInterval(tick, 0);

function tick() {
    var now = performance.now();
    dlt += now - lst;
    lst = now;
    while (dlt >= 1000 / 20) {
        dlt -= 1000 / 20;
        update();
    }
    render();
}

function mspos(event) {
    msX = event.clientX - can.getBoundingClientRect().x;
    msY = event.clientY - can.getBoundingClientRect().y;
    if (select == Math.floor((msX + 1) / (can.width / 8)) + Math.floor((msY + 1) / (can.height / 8)) * 8) {
        select = -1;
    } else {
        if (select != -1) {
            selectPiece = fPiece(select % 8, Math.floor(select / 8));
            Pieces[selectPiece].y = Math.floor((msY + 1) / (can.height / 8)) + 1;
            Pieces[selectPiece].x = Math.floor((msX + 1) / (can.width / 8)) + 1;
            select = -1;
        } else {
            select = Math.floor((msX + 1) / (can.width / 8)) + Math.floor((msY + 1) / (can.height / 8)) * 8;
            if (Pieces[fPiece(Math.floor((msX + 1) / (can.width / 8))), Math.floor((msY + 1) / (can.height / 8))].type == "p") {
                console.log("p");
            }
        }
    }

}

function update() {
    lnd = window.innerWidth < window.innerHeight;
}

function render() {
    can.width = lnd ? window.innerWidth : window.innerHeight;
    can.height = lnd ? window.innerWidth : window.innerHeight;
    ctx.clearRect(0, 0, can.width, can.height);
    for (var i = 0; i < 64; i++) {
        ctx.fillStyle = (Math.floor(i / 8) + i) % 2 ? "#555" : "#aaa";
        ctx.fillRect((i % 8) * can.width / 8, Math.floor(i / 8) * can.height / 8, can.width / 8, can.height / 8);
    }

    if (select != -1) {
        ctx.fillStyle = "#ff0";
        ctx.fillRect((select % 8) * can.width / 8, Math.floor(select / 8) * can.height / 8, can.width / 8, can.height / 8);
    }

    for (var i = 0; i < Pieces.length; i++) {
        ctx.font = can.width / 10 + "px Arial";
        ctx.fillStyle = Pieces[i].blue ? "#00f" : "#f00";
        ctx.fillText(Pieces[i].type, (Pieces[i].x - 1) * can.width / 8 + can.width / 32, (Pieces[i].y - 1) * can.height / 8 + can.height / 12);
    }
}

function Piece (x, y, type, blue, dead, ability, check, pawn) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.blue = blue;
    this.dead = dead;
    this.ability = ability;
    this.check = check;
    this.pawn = pawn;
}

function fPiece(x, y) {
    for (var i = 0; i < Pieces.length; i++) {
        if (Pieces[i].x - 1 == x && Pieces[i].y - 1 == y) {
            return i;
        }
    }
}