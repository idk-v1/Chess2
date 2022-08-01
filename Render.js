var alt = false;

function render() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.save();
    if (free) {
        ctx.translate(can.height / 2, can.height / 2);
        ctx.scale(0.7, 0.35);
        ctx.rotate((rot % 360) * Math.PI / 180);
        ctx.translate(-can.height / 2, -can.height / 2);
    }

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            alt = !alt;
            ctx.fillStyle = "#" + (alt ? "888" : "555") + "";
            ctx.fillRect(x * can.height / 8, y * can.height / 8, can.height / 8, can.height / 8);
        }
        alt = !alt;
    }

    if (!free) {
        ctx.fillStyle = "#ffffaaaa";
        ctx.fillRect(Math.floor((mouseX - can.getBoundingClientRect().left) / (can.height / 8)) * (can.height / 8), Math.floor((mouseY - can.getBoundingClientRect().top) / (can.height / 8)) * (can.height / 8), can.height / 8, can.height / 8);
    }

    show_moves(selectX, selectY, selectPiece);

    for (let p = 0; p < _pieces.length; p++) {
        ctx.font = window.innerHeight / 10 + "px serif";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#" + (_pieces[p].team == "red" ? "ff0000" : "0000ff") + "";
        if (!_pieces[p].dead) {ctx.fillText(piece_icon(_pieces[p].team, _pieces[p].type), _pieces[p].x * can.height / 8 + 5, _pieces[p].y * can.height / 8 + 10);}
    }

    ctx.restore();
}

function piece_icon(team, type) {
    if (type == "rook") return "♖";
    if (type == "knight") return "♘";
    if (type == "bishop") return "♗";
    if (type == "queen") return "♕";
    if (type == "king") return "♔";
    if (type == "pawn") return "♙";
}

function show_moves(x, y, id) {
    ctx.fillStyle = "#ffffaa50";
    if (id != -1) {
        if (_pieces[id].type == "pawn") {
            ctx.fillRect(x * can.height / 8, (y + (_pieces[id].team == "blue" ? 1 : -1)) * can.height / 8, can.height / 8, can.height / 8);
        }
    }
}