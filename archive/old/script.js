$(document).ready(function ()
{
  createGrid("boardPlayer0");
  createShips();
  EventL();
});


// Eine Variable, welches alle Schiffe als Objekte abgespeichert hat
const ships = {
  battleship: mSO("battleship_1", 5, "blue"),
  cruiser1: mSO("cruiser_1", 4, "red"),
  cruiser2: mSO("cruiser_2", 4, "red"),
  destroyer1: mSO("destroyer_1", 3, "orange"),
  destroyer2: mSO("destroyer_2", 3, "orange"),
  submarine1: mSO("submarine_1", 2, "yellow")
};

// Mithilfe der Parameter wird ein Schiffsobjekt erstellt
function mSO(sName, iSize, sColor)
{
  return { name: sName, size: iSize, color: sColor };
}


const frontside = document.querySelector(".frontside");
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


// Erstellt ein Grid, wo man die Schiffe platzieren kann, mit "Randnummerierung"
function createGrid(where)
{

  var grid = document.createElement("div");
  var importHere = document.querySelector(where);
  grid.setAttribute("id", "grid");
  grid.classList.add("grid");
  importHere.appendChild(grid);

  aBorderChar.forEach(i =>
  {
    for (let j = 0; j < 11; j++)
    {

      var gridBlock = document.createElement("div");
      gridBlock.setAttribute("id", i + j);


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

      gridBlock.classList.add("block");
      grid.appendChild(gridBlock);
    }
  });

}


// Erstellt die Schiffe
function createShips()
{
  const containerForShips = document.createElement("div");
  containerForShips.setAttribute("id", "shipParking");
  containerForShips.classList.add("shipParking");

  Object.entries(ships).forEach(ship =>
  {
    const [key, value] = ship;
    var shipDiv = document.createElement("div");
    shipDiv.setAttribute("id", value.name);
    shipDiv.classList.add("ship");
    shipDiv.style.height = 40 * value.size;
    shipDiv.setAttribute("size", value.size);
    shipDiv.style.width = 40;
    shipDiv.setAttribute("rotation", "vertical");
    shipDiv.setAttribute("draggable", "true");
    shipDiv.setAttribute("onmouseup", "rotateShip(" + value.name + ")");
    shipDiv.style.backgroundColor = value.color;
    containerForShips.appendChild(shipDiv);
  });

  frontside.appendChild(containerForShips);

}

// Fuehrt die noetigen EventListener aus fuer das ziehen der Schiffe
function EventL()
{

  var sourceElement;
  document.addEventListener("dragstart", function (e)
  {
    sourceElement = e;
    removeOccupied(e.target, e.target.parentNode);
  });

  // document.addEventListener("drageend", function (e)
  // {

  // });

  document.addEventListener("dragover", function (e)
  {
    e.preventDefault();
  });

  document.addEventListener("dragenter", function (e)
  {
    if (e.target.classList.contains("block") && !(e.target.classList.contains("borderBlock")))
    {
      e.target.classList.add("followMouse");
    }
  });

  document.addEventListener("dragleave", function (e)
  {
    e.target.classList.remove("followMouse");
  });



  document.addEventListener("drop", function (e)
  {
    if ((e.target.classList.contains("block") || e.target.classList.contains("shipParking")) && !(e.target.classList.contains("borderBlock")))
    {
      dropAndPlace(sourceElement.target, e.target);
    }
    else if (e.target.classList.contains("ship"))
    {
      dropAndPlace(sourceElement.target, sourceElement.target.parentNode);
    }

  });
}

// Checkt ob es moeglich ist das Schiff zu platzieren
function checkValid(ship, where)
{
  var valid;

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
    var y = where.id.slice(1);

    for (let i = 0; i < length; i++)
    {
      var occupied = document.getElementById(x + (parseInt(y) + i));

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



// Die Zustaendige Funktion fuer das droppen und Flaechen besetzen
function dropAndPlace(ship, where)
{
  var dropPosition = document.getElementById(where.id);

  if (where.classList.contains("block"))
  {
    dropPosition.classList.remove("followMouse");
  }

  // Ist nur da um die Moeglichkeit zu geben, dass man das Schiff wieder zuruecklegen kann
  if (where.id == "shipParking")
  {
    dropPosition.appendChild(ship);
  }

  // Check ob das Feld belegt ist

  if (checkValid(ship, where))
  {
    var shipId = ship.id;

    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1) - 1;

      for (let i = 0; i < length + 2; i++)
      {
        var occupy = document.getElementById(aBorderChar[x + i] + y);
        for (let j = 0; j < 3; j++)
        {
          occupy = document.getElementById(aBorderChar[x + i] + (y + j));

          if (occupy === null || occupy.classList.contains("borderBlock"))
          { }
          else
            if (!occupy.classList.value.includes("occupied"))
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
      var y = where.id.slice(1) - 1;
      for (let i = 0; i < length + 2; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          var occupy = document.getElementById(aBorderChar[x + j] + (parseInt(y) + i));

          if (occupy === null || occupy.classList.contains("borderBlock"))
          { }
          else
            if (!occupy.classList.value.includes("occupied"))
            {
              occupy.classList.add("occupied_" + shipId);
            }

        }
      }

      dropPosition.appendChild(ship);
    }
  }
  else
  {
    dropAndPlace(ship, ship.parentNode);
  }

}



function removeOccupied(ship, where)
{
  if (where.classList.value.includes("occupied"))
  {
    var shipId = ship.id;

    if (ship.getAttribute("rotation") == "vertical")
    {
      var length = parseInt(ship.style.height) / 40;
      var x = aBorderChar.indexOf(where.id[0]) - 1;
      var y = where.id.slice(1) - 1;

      for (let i = 0; i < length + 2; i++)
      {
        var occupy = document.getElementById(aBorderChar[x + i] + y);
        for (let j = 0; j < 3; j++)
        {
          occupy = document.getElementById(aBorderChar[x + i] + (y + j));

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
      var y = where.id.slice(1) - 1;

      for (let i = 0; i < length + 2; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          var occupy = document.getElementById(aBorderChar[x + j] + (parseInt(y) + i));

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

// Diese Funktion dreht das Schiff;
function rotateShip(ship)
{
  if (ship.parentNode.id == "shipParking")
  {
    var temp;
    if (ship.getAttribute("rotation") == "vertical")
    {
      ship.setAttribute("rotation", "horizontal");
    }
    else
    {
      ship.setAttribute("rotation", "vertical");
    }
    temp = ship.style.height;
    ship.style.height = ship.style.width;
    ship.style.width = temp;
  }

}






