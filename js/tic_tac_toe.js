window.addEventListener("load", init);

function querry(name) {
    return document.querySelector(name);
}

function querry_all_raw(name) {
    return document.querySelectorAll(name);
}

function querry_all(name, arg) {
    //querry_all("name", q => q.argument);
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}

var board_size = 4;
var lepes = 0;

function init() {
    querry("body").innerHTML = '<main><header><h1>Tic-Tac-Toe</h1></header><section></section><article></article><aside><div id="title"></div><div id="progress"><p>Játék állapota:</p><p>X kezd.</p></div></aside></main>';
    querry("article").innerHTML += '<div id="ttt"></div>';
    for (let x = 0; x < Math.pow(board_size, 2); x++) {
        querry("#ttt").innerHTML += '<div class="mezo"><p></p></div>';
    }
    //css grid
    let grids = "";
    for (let x = 0; x < board_size; x++)
        grids += "1fr ";
    querry("#ttt").style.gridTemplateColumns = grids;
    //addevent
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseout", function change(Event) {Event.target.style.backgroundColor = "";}));
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseover", function change(Event) {
        Event.target.style.backgroundColor = "darkgray";
        if(Event.target.className == "mezo, selected")
            Event.target.removeEventListener("mouseover", change);
    }));
    querry_all("#ttt>.mezo", q=>q.addEventListener("click", function change_simbol(Event) {
        p_elem = Event.target.firstChild;
        if(lepes % 2 == 0)
        {
            p_elem.innerHTML = "X";
            querry("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: O";
        }
        else
        {
            p_elem.innerHTML = "O";
            querry("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: X";
        }
        Event.target.removeEventListener("click", change_simbol);
        Event.target.className += ", selected";
        lepes++;
        let status = calculate_winner();
        if(status != 0 || lepes==Math.pow(board_size, 2))
        {
            let winner_text = "Döntetlen!";
            if(status == 1)
                winner_text = "X nyert!"
            else if(status == -1)
                winner_text = "O nyert!"
            querry("#progress>p:nth-child(2)").innerHTML = `Eredmény: ${winner_text}`;
            querry_all("#ttt>.mezo", q=>q.className += ", selected");
            querry_all("#ttt>.mezo", q=>q.removeEventListener("click", change_simbol));
        }
    }));
}

function calculate_winner()
{
    //get board
    let board = [];
    let board_h = [];
    board_elements = querry_all_raw("#ttt>div>p");
    for(let x=0; x < board_elements.length; x++)
    {
        board_h.push(board_elements[x].innerHTML);
        if((x+1) % board_size == 0)
        {
            board.push(board_h);
            board_h = [];
        }
    }
    console.log(board);
    //get points
    let x_points = 0, o_points = 0;
    let line = true;
    //row
    for(let x = 0; x < board_size; x++)
    {
        line = true;
        for(let y = 1; y < board_size; y++)
        {
            if(board[x][y-1] != board[x][y])
                line = false;
        }
        if(line)
        {
            if(board[x][0] == "X")
                x_points += 1;
            else if(board[x][0] == "O")
                o_points += 1;
        }

    }
    //column
    for(let y = 0; y < board_size; y++)
    {
        line = true;
        for(let x = 1; x < board_size; x++)
        {
            if(board[x-1][y] != board[x][y])
                line = false;
        }
        if(line)
        {
            if(board[0][y] == "X")
                x_points += 1;
            else if(board[0][y] == "O")
                o_points += 1;
        }

    }
    //diagonal
    let cross1 = true, cross2 = true;
    for(let x = 1; x < board_size; x++)
    {
        if(board[x-1][x-1] != board[x][x])
            cross1 = false;
        if(board[x-1][board_size-x] != board[x][board_size-1-x])
            cross2 = false;
    }
    if(cross1)
    {
        if(board[0][0] == "X")
            x_points += 1;
        else if(board[0][0] == "O")
            o_points += 1;
    }
    if(cross2)
    {
        if(board[0][board_size-1] == "X")
            x_points += 1;
        else if(board[0][board_size-1] == "O")
            o_points += 1;
    }
    console.log("x: " + x_points + ", o: " + o_points);
    //get winner
    if(x_points>o_points)
        return 1;
    else if(x_points<o_points)
        return -1;
    else
        return 0;
}