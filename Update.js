var rot = 0;
var free = true;
var rotate = document.getElementById("rotate");
var mouseX = 1;
var mouseY = 1;
var selectX = 1;
var selectY = 1;
var selectPiece = -1;

function freelook() {
    free = !free;
    if (!free) {
        rotate.setAttribute("disabled", true);
        rotate.value = (turn == "red" ? 45 : 315);
        rotate.style.opacity = 0.5;
        document.getElementById("view").innerHTML = "Free View";
    } else {
        rotate.removeAttribute("disabled");
        rotate.style.opacity = 1;
        document.getElementById("view").innerHTML = "Lock View";
    }
}

function update() {
    can.width = window.innerHeight * 0.8;
    can.height = window.innerHeight * 0.8;
    rot = document.getElementById("rotate").value;
}

function mousepos(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    selectX = Math.floor((mouseX - can.getBoundingClientRect().left) / (can.height / 8));
    selectY = Math.floor((mouseY - can.getBoundingClientRect().top) / (can.height / 8));
    selectPiece = -1;
    for (let p = 0; p < _pieces.length; p++) {
        if (_pieces[p].x == selectX && _pieces[p].y == selectY) {
            selectPiece = p;
        }
    }
}

function move_piece(id, x, y) {
    var collide = false;
    var enemy = false;
    var block_id;
    for (let p = 0; p < _pieces.length; p++) {
        if (x  == _pieces[p].x && y == _pieces[p].y && !_pieces[p].dead) {
            collide = true;
            (_pieces[p].team != _pieces[id].team ? enemy = true : "")
            block_id = p;
        }
    }
    if (!collide) {
        _pieces[id].x = x;
        _pieces[id].y = y;
        console.log("> %cMoved %cpiece: '%c" + _pieces[id].type + "%c' to " + x + "x, " + y + "y.",
        "color: #aaffaa", "color: #ffffff", "color: #" + (_pieces[id].team == "blue" ? "aaaaff" : "ffaaaa") + "", "color: #ffffff");
    } else if (collide && !enemy) {
        console.log("> Piece: '%c" + _pieces[block_id].type + "%c' is %cblocked %cat: " + x + "x, " + y + "y by piece: '%c" + _pieces[id].type + "%c'.",
        "color: #" + (_pieces[id].team == "blue" ? "aaaaff" : "ffaaaa") + "", "color: #ffffff", "color: #ffffaa", "color: #ffffff", "color: #" + (_pieces[block_id].team == "blue" ? "aaaaff" : "ffaaaa"), "color: #ffffff");
    } else if (collide && enemy) {
        _pieces[block_id].dead = true;
        _pieces[id].x = x;
        _pieces[id].y = y;
        console.log("> Piece: '%c" + _pieces[block_id].type + "%c' is %ckilled %cat: " + x + "x, " + y + "y by piece: '%c" + _pieces[id].type + "%c'.",
        "color: #" + (_pieces[block_id].team == "blue" ? "aaaaff" : "ffaaaa") + "", "color: #ffffff", "color: #ffddaa", "color: #ffffff", "color: #" + (_pieces[id].team == "blue" ? "aaaaff" : "ffaaaa") + "", "color: #ffffff");
    }
}