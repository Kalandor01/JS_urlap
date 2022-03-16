window.addEventListener("load", init);

function querry(name) {
    return document.querySelector(name);
}

var list = [
    {
        auto: "Opel",
        ar: 15248
    },
    {
        auto: "Audi",
        ar: 4256
    },
    {
        auto: "Skoda",
        ar: 25548
    },
    {
        auto: "Ford",
        ar: 152
    },
    {
        auto: "Opel",
        ar: 1871
    },
    {
        auto: "Lada",
        ar: 9124
    }
]

function querry_some(name) {
    return document.querySelectorAll(name);
}

function init() {
    make_table(list);
}

function sort_list() {
    list = list.sort(function (a, b){return a.auto > b.auto});
    console.log(list);
    querry("body").removeChild(querry("#autok"));
    make_table(list);
}

function make_table(autok) {
    querry("body").innerHTML += `<table id="autok"><tbody><tr><td>Tipus</td><td>Ár</td></tr></tbody></table>`;
    autok.forEach(auto_element => {
        querry("#autok>tbody").innerHTML += `<tr class="not_title"><td>${auto_element.auto}</td><td>${auto_element.ar}Ft</td></tr>`;
    });
    //style/addevent
    querry("#autok>tbody>tr:nth-child(1)>td:nth-child(1)").addEventListener("click", sort_list);
    querry("#autok").style.color = "red";
    querry_all("td", q=>q.style.backgroundColor = "blue");
    querry_all("tr", q=>q.addEventListener("mouseover", function hatter(Event) {Event.target.style.backgroundColor = "gray";}));
    querry_all("tr", q=>q.addEventListener("mouseout", function hatter_2(Event) {Event.target.style.backgroundColor = "";}));
}



function querry_all(name, arg) {
    //querry_all("name", q => q.argument);
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}