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

var lepes = 0;

function init() {
    querry("body").innerHTML = '<main><header><h1>Tic-Tac-Toe</h1></header><section></section><article></article><aside><div id="title"></div><div id="progress"><p>Játék állapota:</p><p>X kezd.</p></div></aside></main>';
    querry("article").innerHTML += '<div id="ttt"></div>';
    for (let x = 0; x < 9; x++) {
        querry("#ttt").innerHTML += '<div class="mezo"><p></p></div>';
    }
    //addevent
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseout", function change(Event) {Event.target.style.backgroundColor = "";}));
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseover", function change(Event) {Event.target.style.backgroundColor = "darkgray";}));
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
        if(lepes==9)
        {
            querry("#progress>p:nth-child(2)").innerHTML = `Eredmény: ${calculate_winner()}`;
        }
    }));
}

function calculate_winner()
{
    let board = [];
    let board_h = [];
    board_elements = querry_all_raw("#ttt>.selected>p");
    for(let x=0; x < board_elements.length; x++)
    {
        board_h.push(board_elements[x].innerHTML);
        if((x+1) % 3 == 0)
        {
            board.push(board_h);
            board_h = [];
        }
    }
    console.log(board);
    let winner_text = "X nyert!";
    return winner_text;
}