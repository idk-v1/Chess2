var can = document.getElementById("canvas");
var ctx = can.getContext("2d");
var lnd;

var Pieces = [
    new Piece(1, 1, "r", true, false, true, false, false),
    new Piece(2, 1, "n", true, false, true, false, false),
    new Piece(3, 1, "b", true, false, true, false, false),
    new Piece(4, 1, "q", true, false, true, false, false),
    new Piece(5, 1, "k", true, false, true, false, false),
    new Piece(6, 1, "b", true, false, true, false, false),
    new Piece(7, 1, "n", true, false, true, false, false),
    new Piece(8, 1, "r", true, false, true, false, false),
    new Piece(1, 2, "p", true, false, true, false, false),
    new Piece(2, 2, "p", true, false, true, false, false),
    new Piece(3, 2, "p", true, false, true, false, false),
    new Piece(4, 2, "p", true, false, true, false, false),
    new Piece(5, 2, "p", true, false, true, false, false),
    new Piece(6, 2, "p", true, false, true, false, false),
    new Piece(7, 2, "p", true, false, true, false, false),
    new Piece(8, 2, "p", true, false, true, false, false),

    new Piece(1, 8, "r", false, false, true, false, false),
    new Piece(2, 8, "n", false, false, true, false, false),
    new Piece(3, 8, "b", false, false, true, false, false),
    new Piece(4, 8, "q", false, false, true, false, false),
    new Piece(5, 8, "k", false, false, true, false, false),
    new Piece(6, 8, "b", false, false, true, false, false),
    new Piece(7, 8, "n", false, false, true, false, false),
    new Piece(8, 8, "r", false, false, true, false, false),
    new Piece(1, 7, "p", false, false, true, false, false),
    new Piece(2, 7, "p", false, false, true, false, false),
    new Piece(3, 7, "p", false, false, true, false, false),
    new Piece(4, 7, "p", false, false, true, false, false),
    new Piece(5, 7, "p", false, false, true, false, false),
    new Piece(6, 7, "p", false, false, true, false, false),
    new Piece(7, 7, "p", false, false, true, false, false),
    new Piece(8, 7, "p", false, false, true, false, false),
];

var msX = -1;
var msY = -1;
var select = -1;
var selectPiece = -1;
var highlight = -1;

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
        highlight = -1;
    } else {
        if (select != -1) {
            selectPiece = fPiece(select % 8, Math.floor(select / 8));
            Pieces[selectPiece].y = Math.floor((msY + 1) / (can.height / 8)) + 1;
            Pieces[selectPiece].x = Math.floor((msX + 1) / (can.width / 8)) + 1;
            select = -1;
            highlight = -1;
        } else {
            select = Math.floor((msX + 1) / (can.width / 8)) + Math.floor((msY + 1) / (can.height / 8)) * 8;
            if (Pieces[fPiece(select % 8, Math.floor(select / 8))] != undefined) {
                highlight = fPiece(select % 8, Math.floor(select / 8));
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

    if (highlight != -1) {
        //lightSq(Pieces[highlight].x, Pieces[highlight].y, "ffff0050");

        //Blue Pawn
        if (Pieces[highlight].blue && Pieces[highlight].type == "p") {
            for (var i = 0; i < 3 && Pieces[highlight].ability; i++) {
                if (fPiece(Pieces[highlight].x - 1, Pieces[highlight].y + i) != undefined) {
                    break;
                }
                lightSq(Pieces[highlight].x, Pieces[highlight].y + 1 + i, "ffff0050");
            }
        }

        //Red Pawn
        if (!Pieces[highlight].blue && Pieces[highlight].type == "p") {
            for (var i = 0; i < 3 && Pieces[highlight].ability; i++) {
                if (fPiece(Pieces[highlight].x - 1, Pieces[highlight].y - 2 - i) != undefined) {
                    break;
                }
                lightSq(Pieces[highlight].x, Pieces[highlight].y - 1 - i, "ffff0050");
            }
        }

        //Blue King
        if (Pieces[highlight].type == "k") {
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y - 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y - 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y - 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 0 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 0, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 0 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 0, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 0 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 0, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 0 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 0, "ffff0050");}
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y + 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y + 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 1, "ffff0050");} else if (!Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 1, "ffff0050");}

        }

        //Red King
        if (Pieces[highlight].type == "k") {
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y - 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y - 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y - 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y - 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y - 1 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y - 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 0 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 0, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 0 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 0, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 0 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 0, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 0 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 0, "ffff0050");}
            if (fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x - 1 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x - 1, Pieces[highlight].y + 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y + 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x + 0 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x + 0, Pieces[highlight].y + 1, "ffff0050");}
            if (fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 1 - 1) == undefined) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 1, "ffff0050");} else if (Pieces[fPiece(Pieces[highlight].x + 1 - 1, Pieces[highlight].y + 1 - 1)].blue) {lightSq(Pieces[highlight].x + 1, Pieces[highlight].y + 1, "ffff0050");}

        }

        //Blue Bishop
        if (Pieces[highlight].type == "b" && Pieces[highlight].blue) {
            for (var nxny = 0; nxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); nxny++) {
                if (fPiece(Pieces[highlight].x + nxny, Pieces[highlight].y + nxny) == undefined) {
                    lightSq(Pieces[highlight].x + nxny + 1, Pieces[highlight].y + nxny + 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x + nxny, Pieces[highlight].y + nxny)].dead) {
                    lightSq(Pieces[highlight].x + nxny + 1, Pieces[highlight].y + nxny + 1, "ffff0050");
                } else if (!Pieces[fPiece(Pieces[highlight].x + nxny, Pieces[highlight].y + nxny)].blue) {
                    lightSq(Pieces[highlight].x + nxny + 1, Pieces[highlight].y + nxny + 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var pxny = 0; pxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); pxny++) {
                if (fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y + pxny) == undefined) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y + pxny + 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y + pxny)].dead) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y + pxny + 1, "ffff0050");
                } else if (!Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y + pxny)].blue) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y + pxny + 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var nxpy = 0; nxpy < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); nxpy++) {
                if (fPiece(Pieces[highlight].x + nxpy, Pieces[highlight].y - nxpy - 2) == undefined) {
                    lightSq(Pieces[highlight].x + nxpy + 1, Pieces[highlight].y - nxpy - 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x + nxpy, Pieces[highlight].y - nxpy - 2)].dead) {
                    lightSq(Pieces[highlight].x + nxpy + 1, Pieces[highlight].y - nxpy - 1, "ffff0050");
                } else if (!Pieces[fPiece(Pieces[highlight].x + nxpy, Pieces[highlight].y - nxpy - 2)].blue) {
                    lightSq(Pieces[highlight].x + nxpy + 1, Pieces[highlight].y - nxpy - 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var pxny = 0; pxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); pxny++) {
                if (fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y - pxny - 2) == undefined) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y - pxny - 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y - pxny - 2)].dead) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y - pxny - 1, "ffff0050");
                } else if (!Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y - pxny - 2)].blue) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y - pxny - 1, "ffff0050");
                    break;
                } else {break;}
            }
        }

        //Red Bishop
        if (Pieces[highlight].type == "b" && !Pieces[highlight].blue) {
            for (var nxny = 0; nxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); nxny++) {
                if (fPiece(Pieces[highlight].x + nxny, Pieces[highlight].y + nxny) == undefined) {
                    lightSq(Pieces[highlight].x + nxny + 1, Pieces[highlight].y + nxny + 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x + nxny, Pieces[highlight].y + nxny)].blue) {
                    lightSq(Pieces[highlight].x + nxny + 1, Pieces[highlight].y + nxny + 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var pxny = 0; pxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); pxny++) {
                if (fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y + pxny) == undefined) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y + pxny + 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y + pxny)].blue) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y + pxny + 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var nxpy = 0; nxpy < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); nxpy++) {
                if (fPiece(Pieces[highlight].x + nxpy, Pieces[highlight].y - nxpy - 2) == undefined) {
                    lightSq(Pieces[highlight].x + nxpy + 1, Pieces[highlight].y - nxpy - 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x + nxpy, Pieces[highlight].y - nxpy - 2)].blue) {
                    lightSq(Pieces[highlight].x + nxpy + 1, Pieces[highlight].y - nxpy - 1, "ffff0050");
                    break;
                } else {break;}
            }
            for (var pxny = 0; pxny < 8 - Math.min(Pieces[highlight].x, Pieces[highlight].y); pxny++) {
                if (fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y - pxny - 2) == undefined) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y - pxny - 1, "ffff0050");
                } else if (Pieces[fPiece(Pieces[highlight].x - pxny - 2, Pieces[highlight].y - pxny - 2)].blue) {
                    lightSq(Pieces[highlight].x - pxny - 1, Pieces[highlight].y - pxny - 1, "ffff0050");
                    break;
                } else {break;}
            }
        }
    }

    for (var i = 0; i < Pieces.length; i++) {
        ctx.font = can.width / 10 + "px Arial";
        ctx.fillStyle = Pieces[i].blue ? "#00f" : "#f00";
        if (!Pieces[i].dead) {
            ctx.fillText(Pieces[i].type, (Pieces[i].x - 1) * can.width / 8 + can.width / 32, (Pieces[i].y - 1) * can.height / 8 + can.height / 12);
        }
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

function lightSq(x, y, c) {
        ctx.fillStyle = "#" + c;
        ctx.fillRect((x - 1) * can.width / 8 + 5, (y - 1) * can.height / 8 + 5, can.width / 8 - 10, can.height / 8 - 10);
}