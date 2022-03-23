window.addEventListener("load", init);
window.addEventListener("resize", change_size)

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


var board_size = 5;
var lepes = 0;
var p1_name = "X";
var p2_name = "O";

function change_size()
{
    querry("#ttt").style.height = window.getComputedStyle(querry("#ttt")).width;
    querry_all("#ttt>div", q=>q.style.height = window.getComputedStyle(querry("#ttt>div")).width);
}

function background_in(evt)
{
    evt.target.style.backgroundColor = "darkgray";
    if(evt.target.className == "mezo, selected")
        evt.target.removeEventListener("mouseover", background_in);
}

function background_out(evt)
{
    evt.target.style.backgroundColor = "";
}

function change_simbol(evt)
{
    p_elem = evt.target.firstChild;
    if(lepes % 2 == 0)
    {
        p_elem.innerHTML = "X";
        querry("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: " + p2_name;
    }
    else
    {
        p_elem.innerHTML = "O";
        querry("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: " + p1_name;
    }
    evt.target.removeEventListener("click", change_simbol);
    evt.target.removeEventListener("mouseover", background_in);
    evt.target.className += ", selected";
    lepes++;
    let status = calculate_winner();
    if(status != 0 || lepes==Math.pow(board_size, 2))
    {
        let winner_text = "Döntetlen!";
        if(status == 1)
            winner_text = p1_name + " nyert!";
        else if(status == -1)
            winner_text = p2_name + " nyert!";
        querry("#progress>p:nth-child(2)").innerHTML = `Eredmény: ${winner_text}`;
        querry_all("#ttt>.mezo", q=>q.className += ", selected");
        querry_all("#ttt>.selected", q=>q.removeEventListener("click", change_simbol));
        querry_all("#ttt>.selected", q=>q.removeEventListener("mouseover", background_in));
    }
}

function start_play(p1, p2)
{
    if(p1!="")
        p1_name = p1;
    if(p2!="")
        p2_name = p2;
    //disable forms
    querry_all("section>form>input", q=>q.disabled = true);
    //addevent
    querry_all("#ttt>div", q=>q.className = "mezo");
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseout", background_out));
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseover", background_in));
    querry_all("#ttt>.mezo", q=>q.addEventListener("click", change_simbol));
    //kezd txt
    querry("#progress>p:nth-child(2)").innerHTML = p1_name + " kezd.";
    change_size();
}

function init() {
    querry("body").innerHTML = '<main><header><h1>Tic-Tac-Toe</h1></header><section></section><article></article><aside><div id="title"></div><div id="progress"><p>Játék állapota:</p><p>Névmegadásra várrás...</p></div></aside></main>';
    querry("section").innerHTML = '<p>A játékosok neve:</p><form onsubmit="start_play(p1.value, p2.value);return false"><label for="p1">1. játékos (X)</label><br><input type="text" id="p1" name="p1" value="X"><br><label for="p2">2. játékos (O)</label><br><input type="text" id="p2" name="p2" value="O"><br><br><input type="submit" value="Kezdhetjük?"></form>';
    querry("article").innerHTML += '<div id="ttt"></div>';
    for (let x = 0; x < Math.pow(board_size, 2); x++)
    {
        querry("#ttt").innerHTML += '<div><p> </p></div>';
    }
    querry_all("#ttt>div", q=>q.style.width = (100 / board_size) + "%");
    change_size();
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
    let p1_check = "";
    let p2_check = "";
    if(board_size < 5)
    {
        for (let x = 0; x < board_size; x++)
        {
            p1_check += "X";
            p2_check += "O";
        }
    }
    else
    {
        p1_check = "XXXXX";
        p2_check = "OOOOO";
    }
    let x_points = 0, o_points = 0;
    let line = "";
    //row
    for(let x = 0; x < board_size; x++)
    {
        for(let y = 0; y < board_size; y++)
        {
            if(board[x][y] != "X" && board[x][y] != "O")
                line += " "
            else
                line += board[x][y];
        }
    }
    //console.log(line);
    if(line.indexOf(p1_check) != -1)
        x_points++;
    else if(line.indexOf(p2_check) != -1)
        o_points++;
    //column
    line = "";
    for(let y = 0; y < board_size; y++)
    {
        for(let x = 0; x < board_size; x++)
        {
            if(board[x][y] != "X" && board[x][y] != "O")
                line += " "
            else
                line += board[x][y];
        }
    }
    //console.log(line);
    if(line.indexOf(p1_check) != -1)
        x_points++;
    else if(line.indexOf(p2_check) != -1)
        o_points++;
    //diagonal
    for (let y = 0-board_size; y < board_size; y++)
    {
        let cross1 = "", cross2 = "";
        for(let x = 0; x < board_size; x++)
        {
            try
            {
                if(board[x][x+y] != "X" && board[x][x+y] != "O")
                    cross1 += " "
                else
                    cross1 += board[x][x+y];
                if(board[x][board_size-1-x+y] != "X" && board[x][board_size-1-x+y] != "O")
                    cross2 += " "
                else
                    cross2 += board[x][board_size-1-x+y];
            } catch (TypeError){}
        }
        //console.log("shift " + y + ", cross 1: " + cross1);
        //console.log("shift " + y + ", cross 2: " + cross2);
        if(cross1.indexOf(p1_check) != -1)
            x_points++;
        else if(cross1.indexOf(p2_check) != -1)
            o_points++;
        if(cross2.indexOf(p1_check) != -1)
            x_points++;
        else if(cross2.indexOf(p2_check) != -1)
            o_points++;
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