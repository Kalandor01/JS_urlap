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
    querry("body").innerHTML += '<div id="ttt"></div>';
    for (let x = 0; x < 9; x++) {
        querry("body>#ttt").innerHTML += '<div class="mezo"><p></p></div>';
    }
    //addevent
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseout", function change(Event) {Event.target.style.backgroundColor = "";}));
    querry_all("#ttt>.mezo", q=>q.addEventListener("mouseover", function change(Event) {Event.target.style.backgroundColor = "darkgray";}));
    querry_all("#ttt>.mezo", q=>q.addEventListener("click", function change_simbol(Event) {
        p_elem = Event.target.firstChild;
        if(lepes % 2 == 0)
            p_elem.innerHTML = "X";
        else
            p_elem.innerHTML = "O";
        Event.target.removeEventListener("click", change_simbol);
        Event.target.className = "selected";
        lepes++;
    }));
}
