$(document).ready(
    function () 
    {
        createTableForPlayer("boardPlayer0");
        createShipsForPlayer("shipsPlayer0");

        createTableForPlayer("boardPlayer1");
        createShipsForPlayer("shipsPlayer1");

        dragStuffTest();
    }
);

function createTableForPlayer(sWhere) 
{
    var here = document.getElementById(sWhere);
    
    for (let i = 0; i < 100; i++) {
        var gridBlock = document.createElement("div");
        gridBlock.setAttribute("class", "block");
        gridBlock.setAttribute("id", "block[0][" + i + "][" + sWhere[sWhere.length-1] + "]");
        gridBlock.classList.add("container");
        here.appendChild(gridBlock);
    }
}

function createShipsForPlayer(sWhere) {
    var here = document.getElementById(sWhere);
    var ships = [
        ["battleship", 1],
        ["cruiser", 2],
        ["destroyer", 3],
        ["submarine", 4]
    ];

    ships.forEach(element => {
        for (var i = 0; i < element[1]; i++) {
            var ship = document.createElement("div");
            ship.setAttribute("id", element[0] + i + "[" + sWhere[sWhere.length-1] + "]");
            ship.setAttribute("draggable", "true");
            ship.classList.add(element[0], "draggable");
            here.appendChild(ship);
        }
    });
}

function dragStuffTest() {

var draggables = document.querySelectorAll(".draggable");
var containers = document.querySelectorAll(".container");


draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", function () {
        draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", function () {
        draggable.classList.remove("dragging");
    });
});

containers.forEach(container => {
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
        var draggable = document.querySelector(".dragging");
        container.appendChild(draggable);
    });
});   

}