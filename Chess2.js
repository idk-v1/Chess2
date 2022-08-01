//Canvas
var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

//Create Pieces
var _pieces = [
    new piece(0, 0, "blue", "rook",     false, false, false, false),
    new piece(1, 0, "blue", "knight",   false, false, false, false),
    new piece(2, 0, "blue", "bishop",   false, false, false, false),
    new piece(3, 0, "blue", "queen",    false, false, false, false),
    new piece(4, 0, "blue", "king",     false, false, false, false),
    new piece(5, 0, "blue", "bishop",   false, false, false, false),
    new piece(6, 0, "blue", "knight",   false, false, false, false),
    new piece(7, 0, "blue", "rook",     false, false, false, false),

    new piece(0, 1, "blue", "pawn",     false, false, false, false),
    new piece(1, 1, "blue", "pawn",     false, false, false, false),
    new piece(2, 1, "blue", "pawn",     false, false, false, false),
    new piece(3, 1, "blue", "pawn",     false, false, false, false),
    new piece(4, 1, "blue", "pawn",     false, false, false, false),
    new piece(5, 1, "blue", "pawn",     false, false, false, false),
    new piece(6, 1, "blue", "pawn",     false, false, false, false),
    new piece(7, 1, "blue", "pawn",     false, false, false, false),

    new piece(0, 7, "red", "rook",      false, false, false, false),
    new piece(1, 7, "red", "knight",    false, false, false, false),
    new piece(2, 7, "red", "bishop",    false, false, false, false),
    new piece(3, 7, "red", "queen",     false, false, false, false),
    new piece(4, 7, "red", "king",      false, false, false, false),
    new piece(5, 7, "red", "bishop",    false, false, false, false),
    new piece(6, 7, "red", "knight",    false, false, false, false),
    new piece(7, 7, "red", "rook",      false, false, false, false),

    new piece(0, 6, "red", "pawn",      false, false, false, false),
    new piece(1, 6, "red", "pawn",      false, false, false, false),
    new piece(2, 6, "red", "pawn",      false, false, false, false),
    new piece(3, 6, "red", "pawn",      false, false, false, false),
    new piece(4, 6, "red", "pawn",      false, false, false, false),
    new piece(5, 6, "red", "pawn",      false, false, false, false),
    new piece(6, 6, "red", "pawn",      false, false, false, false),
    new piece(7, 6, "red", "pawn",      false, false, false, false)
];

//Misc Game Vars
var squashed_red = [];
var squashed_blue = [];
var turn = "red";

//Game Loop
var dlt = 0;
var lst = performance.now();
var interval = setInterval(tick, 0);

function tick() {
    var now = performance.now();
    dlt += now - lst;
    lst = now;
    while (dlt >= 1000 / 60) {
        dlt -= 1000 / 60;
        update();
    }
    render();
}

function piece(x, y, team, type, dead, check, frompawn, boosted) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.type = type;
    this.dead = dead;
    this.check = check;
    this.frompawn = frompawn;
    this.boosted = boosted;
}