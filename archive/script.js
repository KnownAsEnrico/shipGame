$(document).ready(function ()
{
  createGrid("leftside");
  createGrid("rightside");
  createShips("leftside");
  createShips("rightside");
  createMenuButtons();
  EventL();
});


// Eine Variable, welches alle Schiffe als Objekte abgespeichert hat
const ships = {
  battleship: mSO("battleship_1", 5, "blue"),
  cruiser1: mSO("cruiser_1", 4, "red"),
  // cruiser2: mSO("cruiser_2", 4, "red"),
  destroyer1: mSO("destroyer_1", 3, "orange"),
  destroyer2: mSO("destroyer_2", 3, "orange"),
  submarine1: mSO("submarine_1", 2, "yellow")
  // submarine2: mSO("submarine_2", 2, "yellow"),
  // submarine3: mSO("submarine_3", 2, "yellow")
};

// Mithilfe der Parameter wird ein Schiffsobjekt erstellt
function mSO(sName, iSize, sColor)
{
  return { name: sName, size: iSize, color: sColor };
}


const leftside = document.querySelector(".leftside");
const rightside = document.querySelector(".rightside");
const aBorderChar = ["R", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const aBorder = {
  R0: { borderText: null },
  R1: { borderText: "1" }, R2: { borderText: "2" }, R3: { borderText: "3" },
  R4: { borderText: "4" }, R5: { borderText: "5" }, R6: { borderText: "6" },
  R7: { borderText: "7" }, R8: { borderText: "8" }, R9: { borderText: "9" },
  R10: { borderText: "10" },
  A0: { borderText: "A" }, B0: { borderText: "B" }, C0: { borderText: "C" },
  D0: { borderText: "D" }, E0: { borderText: "E" }, F0: { borderText: "F" },
  G0: { borderText: "G" }, H0: { borderText: "H" }, I0: { borderText: "I" },
  J0: { borderText: "J" }
};
var sideNum;
var bombing = false;
var onclickAllowed = false;


// Erstellt ein Grid, wo man die Schiffe platzieren kann, mit "Randnummerierung"
function createGrid(side)
{

  var grid = document.createElement("div");


  if (side == "leftside")
  {
    sideNum = "_0";
    grid.setAttribute("id", "boardPlayer0");
    grid.classList.add("grid");
    grid.classList.add("ships_container_0");
    leftside.appendChild(grid);
  }
  else if (side == "rightside")
  {
    sideNum = "_1";
    grid.setAttribute("id", "boardPlayer1");
    grid.classList.add("grid");
    grid.classList.add("ships_container_1");
    rightside.appendChild(grid);
  }

  aBorderChar.forEach(i =>
  {
    for (let j = 0; j < 11; j++)
    {

      var gridBlock = document.createElement("div");
      gridBlock.setAttribute("id", i.toString() + j.toString());


      if (i == "R" || j == 0)
      {
        gridBlock.classList.add("borderBlock");

        Object.entries(aBorder).forEach(borderCode =>
        {
          const [key, value] = borderCode;

          if (gridBlock.id == key)
          {
            gridBlock.textContent = value.borderText;
          }
        });
      }
      gridBlock.setAttribute("id", gridBlock.getAttribute("id") + sideNum.toString());
      gridBlock.classList.add("block");
      grid.appendChild(gridBlock);
    }
  });

}


// Erstellt die Schiffe
function createShips(side)
{
  const containerForShips = document.createElement("div");

  if (side == "leftside")
  {
    sideNum = "_0";
    containerForShips.setAttribute("id", "shipParking_0");
    containerForShips.classList.add("ships_container_0");
  }
  else if (side == "rightside")
  {
    sideNum = "_1";
    containerForShips.setAttribute("id", "shipParking_1");
    containerForShips.classList.add("ships_container_1");
  }

  containerForShips.classList.add("shipParking");

  Object.entries(ships).forEach(ship =>
  {
    const [key, value] = ship;
    var shipDiv = document.createElement("div");
    var shipPic = document.createElement("div");
    shipDiv.setAttribute("id", value.name + sideNum.toString());
    shipDiv.classList.add("ship");
    shipDiv.style.height = 40 * value.size;
    shipDiv.style.width = 40;
    shipDiv.setAttribute("rotation", "vertical");
    shipDiv.setAttribute("draggable", "true");
    shipDiv.setAttribute("onmouseup", "rotateShip(" + value.name + sideNum.toString() + ")");

    shipPic.classList.add("picture_" + value.name + sideNum.toString());
    shipPic.classList.add("shipPic");
    shipPic.classList.add("ship_imagesetting");
    shipPic.style.backgroundImage = "url('images/" + value.name.slice(0, -2) + ".png')";
    shipPic.style.height = 40 * value.size;
    shipPic.style.width = 40;

    shipDiv.appendChild(shipPic);
    containerForShips.appendChild(shipDiv);
  });

  if (side == "leftside")
  {
    leftside.appendChild(containerForShips);
  }
  else if (side == "rightside")
  {
    rightside.appendChild(containerForShips);
  }


}

// Fuehrt die noetigen EventListener aus fuer das ziehen der Schiffe
function EventL()
{

  var sourceElement;
  var ship;
  var click;
  document.addEventListener("dragstart", function (e)
  {
    sourceElement = e;
    ship = sourceElement.target;

    ship.id.slice(-2) == "_0" && e.target.id.slice(-2) == "_0" ? sideNum = "_0" : sideNum = "_1";

    sourceElement.target.classList.add("hide");

    removeOccupied(ship, e.target.parentNode);
    removeMarked(ship, e.target.parentNode);
    removePlaceShip(ship, e.target.parentNode);
  });

  document.addEventListener("dragover", function (e)
  {
    e.preventDefault();
    e.target.classList.contains("block") && !(e.target.classList.contains("borderBlock")) ? mark(ship, e.target) : {};
  });

  document.addEventListener("dragend", function (e)
  {
    sourceElement.target.classList.remove("hide");
  });

  document.addEventListener("dragenter", function (e)
  {
    // e.target.classList.contains("block") && !(e.target.classList.contains("borderBlock")) ? mark(ship, e.target) : {};
  });

  document.addEventListener("dragleave", function (e)
  {
    e.target.classList.contains("block") && !e.target.classList.contains("borderBlock") ? removeMarked(ship, e.target) : {};
  });


  document.addEventListener("drop", function (e)
  {
    if ((e.target.classList.contains("block") || e.target.classList.contains("shipParking")) && !(e.target.classList.contains("borderBlock")))
    {
      placeShip(ship, e.target);
      dropAndPlace(ship, e.target);
    }
    else
    {
      dropAndPlace(ship, ship.parentNode);
    }

    removeMarked(ship, e.target);
  });

  const grids = document.querySelectorAll(".grid");

  grids.forEach(grid =>
  {

    grid.addEventListener("click", function (e)
    {
      if (onclickAllowed)
      {

        if (click.classList.contains("block") && !(click.classList.contains("borderBlock")))
        {
          if (click && click.classList.value.includes("shipPlaced_") && !click.classList.value.includes("red"))
          {

            click.classList.add("red");

            // click.classList.value.includes("shipPlaced") ? console.log(click) : {};

          }
          else
          {
            showShipsEndBomb();
          }


        }



      }



    });

    grid.addEventListener("mouseover", function (e)
    {
      if (bombing)
      {
        if (e.target.classList.contains("borderBlock"))
        { }
        else if (e.target.classList.contains("block"))
        {
          mouseTrace(click);
        }
      }

    });

    grid.addEventListener("mousemove", function (e)
    {
      if (e.target.classList.contains("borderBlock"))
      { }
      else if (e.target.classList.contains("block"))
      {
        click = e.target;
      }
    });



  });









}

// Diese Funktion dreht das Schiff;
function rotateShip(ship)
{
  if (ship.parentNode.id.includes("shipParking"))
  {
    var newXYShip = XandY(ship.style.width, ship.style.height);

    if (ship.getAttribute("rotation") == "vertical")
    {
      ship.setAttribute("rotation", "horizontal");
      ship.children[0].classList.add("horizontal_image");
    }
    else if (ship.getAttribute("rotation") == "horizontal")
    {
      ship.setAttribute("rotation", "vertical");
      ship.children[0].classList.remove("horizontal_image");
    } else { }

    ship.style.width = newXYShip[0];
    ship.style.height = newXYShip[1];
  }

}

// Wechselt die X und Y Werte
function XandY(X, Y)
{
  var temp;
  temp = X;
  X = Y;
  Y = temp;

  return [X, Y];
}


// Checkt ob es moeglich ist das Schiff zu platzieren
function checkValid(ship, where)
{
  var valid;

  if (ship.id.slice(-2) == where.id.slice(-2))
  {

    if (where.id.includes("shipParking"))
    {
      return valid = true;
    }

    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]);
      var y = where.id.slice(1);
      for (let i = 0; i < length; i++)
      {

        var occupied = document.getElementById(aBorderChar[x + i] + y);

        if (occupied === null)
        {

          return valid = false;
        }
        if (occupied.classList.value.includes("occupied"))
        {

          return valid = false;
        }
        else
        {

          valid = true;
        }

      }
    }
    else if (ship.getAttribute("rotation") == "horizontal")
    {
      var length = parseInt(ship.style.width) / 40;
      var x = where.id[0];
      var y = where.id.slice(1, -2);

      for (let i = 0; i < length; i++)
      {
        var occupied = document.getElementById(x + (parseInt(y) + i) + sideNum.toString());

        if (occupied === null)
        {

          return valid = false;
        }
        if (occupied.classList.value.includes("occupied"))
        {

          return valid = false;
        }
        else
        {

          valid = true;
        }
      }
    }
    return valid;
  }
}


// Die Zustaendige Funktion fuer das droppen und Flaechen besetzen
function dropAndPlace(ship, where)
{
  var dropPosition = document.getElementById(where.id);


  if (where.classList.contains("block"))
  {
    dropPosition.classList.remove("followMouse");
  }


  // Check ob das Feld belegt ist

  if (checkValid(ship, where))
  {

    var shipId = ship.id;

    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1, -2) - 1;

      for (let i = 0; i < length + 2; i++)
      {

        for (let j = 0; j < 3; j++)
        {

          var occupy = document.getElementById(aBorderChar[x + i] + (y + j) + sideNum.toString());

          if (occupy === null || occupy.classList.contains("borderBlock"))
          {
            if (!ship.parentNode.id.includes("shipParking"))
            {

              // dropAndPlace(ship, where.parentNode);
            }
          }
          else
          {

            occupy.classList.add("occupied_" + shipId);
          }
        }
      }

      dropPosition.appendChild(ship);
    }
    else
    {
      var length = parseInt(ship.style.width) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1, -2) - 1;
      for (let i = 0; i < length + 2; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          var occupy = document.getElementById(aBorderChar[x + j] + (parseInt(y) + i) + sideNum.toString());

          if (occupy === null || occupy.classList.contains("borderBlock"))
          {

          }
          else
          {

            occupy.classList.add("occupied_" + shipId);
          }
        }
      }

      dropPosition.appendChild(ship);
    }
  }
  else
    // Ist nur da um die Moeglichkeit zu geben, dass man das Schiff wieder zuruecklegen kann
    if (where.id == "shipParking")
    {

      dropPosition.appendChild(ship);
      return;
    }
}


//  Entfernt die besetzte Markierung
function removeOccupied(ship, where)
{

  if (where.classList.value.includes("occupied"))
  {
    var shipId = ship.id;

    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1, -2) - 1;

      for (let i = 0; i < length + 2; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          var occupy = document.getElementById(aBorderChar[x + i] + (y + j) + sideNum.toString());

          if (occupy === null || occupy.classList.contains("borderBlock"))
          { }
          else
            if (occupy.classList.value.includes("occupied"))
            {
              occupy.classList.remove("occupied_" + shipId);
            }

        }
      }
    }
    else
    {
      var length = parseInt(ship.style.width) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1, -2) - 1;

      for (let i = 0; i < length + 2; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          var occupy = document.getElementById(aBorderChar[x + j] + (parseInt(y) + i) + sideNum.toString());

          if (occupy === null || occupy.classList.contains("borderBlock"))
          { }
          else
            if (occupy.classList.value.includes("occupied"))
            {
              occupy.classList.remove("occupied_" + shipId);
            }

        }
      }
    }
  }

}


// Zeigt wo und wie du aktuell dein Schiff platzierst
function mark(ship, where)
{
  if (checkValid(ship, where))
  {
    if (ship.id.slice(-2) == where.id.slice(-2))
    {
      if (ship.getAttribute("rotation") == "vertical")
      {
        var length = parseInt(ship.style.height) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);

        for (let i = 0; i < length; i++)
        {
          const toMark = document.getElementById(aBorderChar[x + i] + y + sideNum.toString());

          // console.log(toMark);
          if (toMark && toMark.classList.contains("block"))
          {
            // console.log(toMark);
            toMark.classList.add("marked_" + ship.id);
            // console.log();
          }
        }
      }
      else
      {
        var length = parseInt(ship.style.width) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);
        for (let i = 0; i < length; i++)
        {
          var toMark = document.getElementById(aBorderChar[x] + (parseInt(y) + i) + sideNum.toString());

          if (toMark && toMark.classList.contains("block"))
          {
            toMark.classList.add("marked_" + ship.id);
          }
        }
      }
    }
  }
}


// Entfernt wieder die Anzeige des Schiffs
function removeMarked(ship, where)
{
  if (ship.id.slice(-2) == where.id.slice(-2))
  {
    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]);
      var y = where.id.slice(1, -2);

      for (let i = 0; i < length; i++)
      {

        var toMark = document.getElementById(aBorderChar[x + i] + (y) + sideNum.toString());

        if (toMark && toMark.classList.contains("block"))
        {
          toMark.classList.remove("marked_" + ship.id);
        }
      }
    }
    else
    {
      var length = parseInt(ship.style.width) / 40;
      var x = aBorderChar.indexOf(where.id[0]);
      var y = where.id.slice(1, -2);
      for (let i = 0; i < length; i++)
      {
        var toMark = document.getElementById(aBorderChar[x] + (parseInt(y) + i) + sideNum.toString());

        if (toMark && toMark.classList.contains("block"))
        {
          toMark.classList.remove("marked_" + ship.id);
        }
      }
    }
  }
}

// Dient zur Markierung von der Position vom Schiff
function placeShip(ship, where)
{
  if (checkValid(ship, where))
  {
    if (ship.id.slice(-2) == where.id.slice(-2))
    {
      if (ship.getAttribute("rotation") == "vertical")
      {
        var length = parseInt(ship.style.height) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);

        for (let i = 0; i < length; i++)
        {
          const shipPlacement = document.getElementById(aBorderChar[x + i] + y + sideNum.toString());

          // console.log(toMark);
          if (shipPlacement && shipPlacement.classList.contains("block"))
          {
            // console.log(toMark);
            shipPlacement.classList.add("shipPlaced_" + ship.id);
            // console.log();
          }
        }
      }
      else
      {
        var length = parseInt(ship.style.width) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);
        for (let i = 0; i < length; i++)
        {
          var shipPlacement = document.getElementById(aBorderChar[x] + (parseInt(y) + i) + sideNum.toString());

          if (shipPlacement && shipPlacement.classList.contains("block"))
          {
            shipPlacement.classList.add("shipPlaced_" + ship.id);
          }
        }
      }
    }
  }
}

//Entfernt die Markierung wieder
function removePlaceShip(ship, where)
{
  if (checkValid(ship, where))
  {
    if (ship.id.slice(-2) == where.id.slice(-2))
    {
      if (ship.getAttribute("rotation") == "vertical")
      {
        var length = parseInt(ship.style.height) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);

        for (let i = 0; i < length; i++)
        {
          const shipPlacement = document.getElementById(aBorderChar[x + i] + y + sideNum.toString());

          // console.log(toMark);
          if (shipPlacement && shipPlacement.classList.contains("block"))
          {
            // console.log(toMark);
            shipPlacement.classList.remove("shipPlaced_" + ship.id);
            // console.log();
          }
        }
      }
      else
      {
        var length = parseInt(ship.style.width) / 40;
        var x = aBorderChar.indexOf(where.id[0]);
        var y = where.id.slice(1, -2);
        for (let i = 0; i < length; i++)
        {
          var shipPlacement = document.getElementById(aBorderChar[x] + (parseInt(y) + i) + sideNum.toString());

          if (shipPlacement && shipPlacement.classList.contains("block"))
          {
            shipPlacement.classList.remove("shipPlaced_" + ship.id);
          }
        }
      }
    }
  }
}


// Speichert das Spielfeld als Array ab und gibt es aus
function boardAsArray(side)
{

  var aBoard = [];
  var block;
  for (let i = 0; i < 10; i++)
  {
    for (let j = 1; j <= 10; j++)
    {
      side == "left" ? block = document.querySelector("#" + aBorderChar[1 + i] + j + "_0") : side == "right" ? block = document.querySelector("#" + aBorderChar[1 + i] + j + "_1") : block = null;

      // block.classList.value.includes("occupied") ? console.log(block) : {};


      // block.classList.value.includes("occupied") ? (
      //   block.children[0] ? console.log(block.children[0].id) : {}
      // ) : {};

      // console.log(block.children[0]);
      block ? block.classList.value.includes("occupied") ? aBoard.push(block.children[0] ? block.id + "|" + block.children[0].id + "|" + block.children[0].getAttribute("rotation") : block.id) : aBoard.push(block.id) : {};
    }
  }
  return aBoard;
}


// Lässt eine Spur hinter der Maus
function mouseTrace(target)
{
  if (target.classList.contains("block") && !(target.classList.contains("borderBlock")))
  {
    target.classList.add("mouseOver");
    setTimeout(function ()
    {
      target.classList.remove("mouseOver");
    }, 100);
  }
}


// Versteckt die Schiffe und ermöglicht das Bomben legen
function hideShipsAndBomb() 
{
  var ships = document.querySelectorAll(".ship");
  ships.forEach(ship =>
  {
    ship.classList.add("hideAndNotClickable");
  });

  var shipPics = document.querySelectorAll(".shipPic");
  shipPics.forEach(shipPic =>
  {
    shipPic.classList.add("hideAndNotClickable");
  });

  onclickAllowed = true;
  bombing = true;
}

// Zeigt die Schiffe wieder an
function showShipsEndBomb() 
{

  var ships = document.querySelectorAll(".ship");
  ships.forEach(ship =>
  {
    ship.classList.remove("hideAndNotClickable");
  });

  var shipPics = document.querySelectorAll(".shipPic");
  shipPics.forEach(shipPic =>
  {
    shipPic.classList.remove("hideAndNotClickable");
  });

  onclickAllowed = false;
  bombing = false;

}

// Erstellt die Buttons zwischen den zwei Spielfeldern
function createMenuButtons()
{
  var eHere = document.querySelector("#forMenu");

  const eDiv1 = document.createElement("div");
  eDiv1.setAttribute("id", "buttonsMenu");
  eDiv1.classList.add("buttonsMenu");

  const aButtons = ["start", "save", "reset"];

  aButtons.forEach(button =>
  {
    const eDiv2 = document.createElement("div");
    eDiv2.classList.add("button");

    const eDiv3 = document.createElement("div");
    eDiv3.textContent = button;

    switch (button)
    {
      case "start":
        eDiv2.setAttribute("onclick", "runOnStart()");
        break;

      case "save":
        eDiv2.setAttribute("onclick", "runOnSave()");
        break;

      case "reset":
        eDiv2.setAttribute("onclick", "runOnReset()");
        break;

      default:
        return;
    }

    eDiv2.appendChild(eDiv3);
    eDiv1.appendChild(eDiv2);

  });

  eHere.appendChild(eDiv1);

}


//Checkt ob alle Schiffe auf den Feld Platziert sind
function checkShipsPlaced()
{
  var shipParkingfields = document.querySelectorAll(".shipParking");
  var field1 = false;
  var field2 = false;

  shipParkingfields.forEach(field =>
  {
    if (field.children.length == 0)
    {
      if (field.id.slice(-2) == "_0")
      {
        field1 = true;
      } else if (field.id.slice(-2) == "_1")
      {
        field2 = true;
      }
    }

  });

  return (field1 && field2);
}



// Beginnt das Spiel
function runOnStart()
{
  if (checkShipsPlaced())
  {
    hideShipsAndBomb();
  }
  else
  {
    alert("You have not placed all Ships yet");
  }
}




// Speichert das Spiel
function runOnSave()
{
  console.log(boardAsArray("left"));
  console.log(boardAsArray("right"));
}
// Setzt das Spiel zurück
function runOnReset()
{
  console.log("reset");
}








function sendToPHP(message, message2)
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { sent: JSON.stringify(message), sent2: JSON.stringify(message2) },
    success: function (e)
    {
      console.log(e);
    }
  });
}