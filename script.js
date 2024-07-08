$(document).ready(function ()
{
  createGrid("leftside");
  createGrid("rightside");
  createShips("leftside");
  createShips("rightside");

  if (state === 0)
  { // Use === for strict equality comparison
    showShipsEndBomb();
  }

  createMenuButtons();
  EventL();
  // runOnNewGame();
  runOnLoad(1);
  // saveName();
  // runOnSave();
  createLogBoard();
  refreshList();
  // getAllTableData();
  setTimeout(
    setInterval(function ()
    {
      getAllTableData();
      if (document.querySelector("#loglist"))
      {
        refreshList();
      }
    }, 1000)
    , 1);


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
const boardLeftEmpty =
  JSON.stringify(["A1_0", "A2_0", "A3_0", "A4_0", "A5_0", "A6_0", "A7_0", "A8_0", "A9_0", "A10_0",
    "B1_0", "B2_0", "B3_0", "B4_0", "B5_0", "B6_0", "B7_0", "B8_0", "B9_0", "B10_0",
    "C1_0", "C2_0", "C3_0", "C4_0", "C5_0", "C6_0", "C7_0", "C8_0", "C9_0", "C10_0",
    "D1_0", "D2_0", "D3_0", "D4_0", "D5_0", "D6_0", "D7_0", "D8_0", "D9_0", "D10_0",
    "E1_0", "E2_0", "E3_0", "E4_0", "E5_0", "E6_0", "E7_0", "E8_0", "E9_0", "E10_0",
    "F1_0", "F2_0", "F3_0", "F4_0", "F5_0", "F6_0", "F7_0", "F8_0", "F9_0", "F10_0",
    "G1_0", "G2_0", "G3_0", "G4_0", "G5_0", "G6_0", "G7_0", "G8_0", "G9_0", "G10_0",
    "H1_0", "H2_0", "H3_0", "H4_0", "H5_0", "H6_0", "H7_0", "H8_0", "H9_0", "H10_0",
    "I1_0", "I2_0", "I3_0", "I4_0", "I5_0", "I6_0", "I7_0", "I8_0", "I9_0", "I10_0",
    "J1_0", "J2_0", "J3_0", "J4_0", "J5_0", "J6_0", "J7_0", "J8_0", "J9_0", "J10_0"]);
const boardRightEmpty =
  JSON.stringify(["A1_1", "A2_1", "A3_1", "A4_1", "A5_1", "A6_1", "A7_1", "A8_1", "A9_1", "A10_1",
    "B1_1", "B2_1", "B3_1", "B4_1", "B5_1", "B6_1", "B7_1", "B8_1", "B9_1", "B10_1",
    "C1_1", "C2_1", "C3_1", "C4_1", "C5_1", "C6_1", "C7_1", "C8_1", "C9_1", "C10_1",
    "D1_1", "D2_1", "D3_1", "D4_1", "D5_1", "D6_1", "D7_1", "D8_1", "D9_1", "D10_1",
    "E1_1", "E2_1", "E3_1", "E4_1", "E5_1", "E6_1", "E7_1", "E8_1", "E9_1", "E10_1",
    "F1_1", "F2_1", "F3_1", "F4_1", "F5_1", "F6_1", "F7_1", "F8_1", "F9_1", "F10_1",
    "G1_1", "G2_1", "G3_1", "G4_1", "G5_1", "G6_1", "G7_1", "G8_1", "G9_1", "G10_1",
    "H1_1", "H2_1", "H3_1", "H4_1", "H5_1", "H6_1", "H7_1", "H8_1", "H9_1", "H10_1",
    "I1_1", "I2_1", "I3_1", "I4_1", "I5_1", "I6_1", "I7_1", "I8_1", "I9_1", "I10_1",
    "J1_1", "J2_1", "J3_1", "J4_1", "J5_1", "J6_1", "J7_1", "J8_1", "J9_1", "J10_1"]);
var state = 0;
var sideNum;
var bombing = false;
var onclickAllowed = false;
var draggingAllowed = true;
var playerATM = 0; // 0 = Player Left, 
var playerlives0 = 17;
var playerlives1 = 17;
var gameID = 1;
var log = [];
var playername0 = "null";
var playername1 = "null";

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

    shipPic.setAttribute("id", "picture_" + value.name + sideNum.toString());
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
  document.addEventListener("dragstart", function (e)
  {
    if (draggingAllowed)
    {
      sourceElement = e;
      ship = sourceElement.target;

      ship.id.slice(-2) == "_0" && e.target.id.slice(-2) == "_0" ? sideNum = "_0" : sideNum = "_1";

      sourceElement.target.classList.add("hide");

      removeOccupied(ship, e.target.parentNode);
      removeMarked(ship, e.target.parentNode);
      removePlaceShip(ship, e.target.parentNode);
    }

  });

  document.addEventListener("dragover", function (e)
  {
    if (draggingAllowed)
    {
      e.preventDefault();
      e.target.classList.contains("block") && !(e.target.classList.contains("borderBlock")) ? mark(ship, e.target) : {};
    }
  });

  document.addEventListener("dragend", function (e)
  {
    if (draggingAllowed)
    {
      sourceElement.target.classList.remove("hide");
    }
  });

  // document.addEventListener("dragenter", function (e)
  // {
  //   // e.target.classList.contains("block") && !(e.target.classList.contains("borderBlock")) ? mark(ship, e.target) : {};
  // });

  document.addEventListener("dragleave", function (e)
  {
    if (draggingAllowed)
    {
      e.target.classList.contains("block") && !e.target.classList.contains("borderBlock") ? removeMarked(ship, e.target) : {};
    }
  });


  document.addEventListener("drop", function (e)
  {
    if (draggingAllowed)
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

      runOnSave();
      removeMarked(ship, e.target);
    }
  });

  const grids = document.querySelectorAll(".grid");

  grids.forEach(grid =>
  {

    grid.addEventListener("click", function (e)
    {
      if (onclickAllowed)
      {
        bombingClick(e.target);
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
          mouseTrace(e.target);
        }
      }

    });

    // grid.addEventListener("mousemove", function (e)
    // {
    //   if (e.target.classList.contains("borderBlock"))
    //   { }
    //   else if (e.target.classList.contains("block"))
    //   {
    //     click = e.target;
    //   }
    // });



  });









}




// Wird beim bomben ausgeführt, um zu checken ob man trifft
function bombingClick(click)
{
  if (click.classList.contains("borderBlock"))
  {

  } else

    if (click.classList.contains("block"))
    {
      if (click.classList.value.includes("red") || click.classList.value.includes("blue"))
      {

      }
      else
        if (playerATM == 0 && click.id.slice(-2) == "_1")
        {
          if (click && click.classList.value.includes("shipPlaced_"))
          {
            click.classList.add("red");
            playerlives1--;
          }
          else
          {
            click.classList.add("blue");
            playerATM = 1;
          }

        }
        else
          if (playerATM == 1 && click.id.slice(-2) == "_0")
          {
            if (click && click.classList.value.includes("shipPlaced_"))
            {
              click.classList.add("red");

              playerlives0--;
            }
            else
            {
              click.classList.add("blue");
              playerATM = 0;
            }

          }

      saveGame();
      // console.log("test");
    }
  colorPlayingField();

  checkWin();
}





// Beginnt das Spiel
function runOnStart()
{

  if (checkShipsPlaced())
  {
    endEventL();
    colorPlayingField();
    hideShipsAndBomb();
    state = 1;
    runOnSave();
  }
  else
  {
    alert("You have not placed all Ships yet");
  }
}


// Speichert das Spiel
function runOnSave()
{
  sendArrayToPHPandDB(boardAsArray("left"), boardAsArray("right"), gameID);
}

// LAdet das Spiel
function runOnLoad(id)
{
  getArrayFromDB(id);
}

// Setzt das Spiel zurück
function runOnReset()
{
  const sides = ["leftside", "rightside"];
  sides.forEach(side =>
  {
    const eDiv = document.querySelector("." + side);
    var board;
    var shipContainer;

    switch (side)
    {
      case "leftside":
        board = document.querySelector("#boardPlayer0");
        shipContainer = document.querySelector("#shipParking_0");
        break;

      case "rightside":
        board = document.querySelector("#boardPlayer1");
        shipContainer = document.querySelector("#shipParking_1");
        break;

    }

    eDiv.removeChild(board);
    eDiv.removeChild(shipContainer);
  });
  endBomb();
  createGrid("leftside");
  createGrid("rightside");
  createShips("leftside");
  createShips("rightside");
  EventL();

  draggingAllowed = true;
  state = 0;
  playerATM = 0;
  playerlives0 = 17;
  playerlives1 = 17;
}

// Lädt die Schiffe aufs Feld
function processData(e)
{
  if (JSON.parse(e)["playerfield0"] == boardLeftEmpty && JSON.parse(e)["playerfield1"] == boardRightEmpty)
  { }
  else
  {
    playername0 = JSON.parse(e)["player0"];
    playername1 = JSON.parse(e)["player1"];
    const parts0 = JSON.parse(e)["playerfield0"].replace("[", "").replace("]", "").split(",");
    // console.log(JSON.parse(e)["playerfield0"].replace("[", "").replace("]", ""));
    // console.log(parts0);

    parts0.forEach(ship0 =>
    {
      if (ship0.includes("vertical") || ship0.includes("horizontal"))
      {
        sideNum = "_0";
        const use0 = ship0.replace("|", ",").replace("|", ",");
        const takeApart0 = use0.replace('"', "").replace('"', "").split(",");
        // console.log(takeApart0);
        // console.log(takeApart0[0].replace('"', "").replace("[", ""));
        // return;

        const field_0_0 = document.querySelector("#" + takeApart0[0]);
        const ship_0_0 = document.querySelector("#" + takeApart0[1]);


        // console.log(takeApart0);

        if (takeApart0[2].includes("horizontal"))
        {
          rotateShip(ship_0_0);
        }

        placeShip(ship_0_0, field_0_0);
        dropAndPlace(ship_0_0, field_0_0);

        // console.log(takeApart0);
      }

    });

    // setTimeout(function ()
    // {

    // });
    // return;
    const parts1 = JSON.parse(e)["playerfield1"].split(",");

    parts1.forEach(ship1 =>
    {

      if (ship1.includes("vertical") || ship1.includes("horizontal"))
      {
        sideNum = "_1";
        const use1 = ship1.replace("|", ",").replace("|", ",");
        const takeApart1 = use1.replace('"', "").replace('"', "").replace('[', "").split(",");
        // return;
        const field_1_1 = document.querySelector("#" + takeApart1[0]);
        const ship_1_1 = document.querySelector("#" + takeApart1[1]);




        if (takeApart1[2].includes("horizontal"))
        {
          rotateShip(ship_1_1);
        }

        // console.log(takeApart1);
        // console.log(ship_1_1);
        // console.log(field_1_1);
        // return;
        placeShip(ship_1_1, field_1_1);
        dropAndPlace(ship_1_1, field_1_1);

      }

    });


    if (JSON.parse(e)["state"] == 1)
    {
      state = 1;
      playerATM = JSON.parse(e)["current"];
      runOnStart();
      var bomb1 = JSON.parse(e)["bombingfield0"].split(",");
      bomb1.forEach(bomb1_1 =>
      {
        // console.log(bomb1_1.replace("|", ",").replace('[', "").replace('"', "").split(",")[0]);
        const id = bomb1_1.replace('[', "").replace(']', "").replace("|", ",").replace('"', "").split(",")[0];
        // console.log(id);
        var eDiv;
        if (id)
        {
          eDiv = document.querySelector("#" + id);
        }

        // console.log(bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1]);
        if (bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1] == "blue")
        {
          eDiv.classList.add("blue");
        }
        else if (bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1] == "red")
        {
          eDiv.classList.add("red");
        }
      });
      // console.log(JSON.parse(e)["bombingfield1"]);
      var bomb2 = JSON.parse(e)["bombingfield1"].split(",");
      bomb2.forEach(bomb1_1 =>
      {
        // console.log(bomb1_1.replace("|", ",").replace('[', "").replace('"', "").split(",")[0]);
        const id = bomb1_1.replace('[', "").replace(']', "").replace("|", ",").replace('"', "").split(",")[0];
        // console.log(id);
        var eDiv;
        if (id)
        {
          eDiv = document.querySelector("#" + id);
        }
        // console.log(bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1]);
        if (bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1] == "blue")
        {
          eDiv.classList.add("blue");
        }
        else if (bomb1_1.replace("|", ",").replace(']', "").replace('[', "").replace('"', "").replace('"', "").split(",")[1] == "red")
        {
          eDiv.classList.add("red");
        }
      });
      gameID = JSON.parse(e)["game_id"];
      playerlives0 = JSON.parse(e)["playerlives0"];
      playerlives1 = JSON.parse(e)["playerlives1"];

      checkWin();

    }

  }



}

//Saves the bombing sessions
function saveGame()
{
  sendBFToPHP(bombfieldAsArray("left"), bombfieldAsArray("right"), gameID);
}


// Sendet das Spiefeld als Array mit Hilfe von Ajax zur Db
function sendArrayToPHPandDB(message, message2, gameID)
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "save", array1: JSON.stringify(message), array2: JSON.stringify(message2), gamestate: state, gameID: gameID },
    success: function (e)
    {
      // console.log(e);
    }
  });
}

// Sendet das Spiefeld als Array mit Hilfe von Ajax zur Db
function sendBFToPHP(message, message2, gameID)
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "saveGame", array1: JSON.stringify(message), array2: JSON.stringify(message2), current: JSON.stringify(playerATM), gameID: gameID, lives0: parseInt(playerlives0), lives1: parseInt(playerlives1) },
    success: function (e)
    {
      console.log(e);
    }
  });
}

function saveName()
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "saveName", name0: playername0, name1: playername1, gameID: gameID },
    success: function (e)
    {
      // console.log(e);
    }
  });
}

// Erstellt ein neues Spiel in der DB
function newGameDB()
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "newGame", player0: playername0, player1: playername1 },
    success: function (e)
    {
      // console.log(e);
      setLatestID(e);
    }
  });
}

// gibt die aktuellste ID
function getLatestID()
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "getAll" },
    success: function (e)
    {
      const latestID = getCurrentLatest(e);
      // console.log(latestID);
    }
  });
}

// bearbeitet die obere Ajax abfrage um eine Antwort zu produzieren
function getCurrentLatest(e)
{
  // console.log(JSON.parse(e).length);
  const arrayLength = JSON.parse(e).length;
  var currentBiggest = 1;
  JSON.parse(e).forEach(element =>
  {

    for (let i = 0; i < arrayLength; i++)
    {
      if (element[0] > currentBiggest)
      {
        currentBiggest = element[0];
      }
    }

  });
  return currentBiggest;
}

// Setzt die GameID durch das aktuellste
function setLatestID(e)
{
  // var id = "" + e;
  // console.log(parseInt(e));
  gameID = parseInt(e);
}


// Kriegt als Rückgabe den alten Spielstand
function getArrayFromDB(id)
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "load", id: id },
    success: function (e)
    {
      processData(e);
    }
  });
}




// beendet die möglichkeit Schiffe zu verschieben
function endEventL()
{
  draggingAllowed = false;

  var ships = document.querySelectorAll(".ship");

  ships.forEach(element =>
  {
    element.style.userSelect = "none";
  });
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

  const eDivs = document.querySelectorAll("block");

  eDivs.forEach(element =>
  {
    element.classList.add("position");
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


  const eDivs = document.querySelectorAll("block");

  eDivs.forEach(element =>
  {
    element.classList.remove("position");
  });

}

// beendet das Bomben
function endBomb()
{

  onclickAllowed = false;
  bombing = false;

}

// Färbt das gebombte Feld
function colorPlayingField()
{
  const thisField0 = document.getElementById("boardPlayer0");
  const thisField1 = document.getElementById("boardPlayer1");

  if (playerATM == 0)
  {
    thisField0.classList.remove("redField");
    thisField1.classList.add("redField");
  }
  else
    if (playerATM == 1)
    {
      thisField1.classList.remove("redField");
      thisField0.classList.add("redField");
    }


}

//kickt ein wenn ein Spieler keine Leben mehr hat LEBEN = SCHIFFE
function checkWin()
{
  if (playerlives0 == 0 || playerlives1 == 0)
  {
    if (playerlives0 == 0)
    {
      alert("USER 1 won!");

    }
    else if (playerlives1 == 0)
    {
      alert("USER 0 won!");

    }
    disablePlayingfields();
    colorGold();
  }
}

// Legt ein goldenes Layout drüber
function colorGold()
{
  const fields = document.querySelectorAll(".grid");

  fields.forEach(element =>
  {
    if (element.classList.contains("redField"))
    {
      element.classList.remove("redField");
    }
    element.classList.add("oldButGold");
  });
}

// Entfernt die option, dass man Felder anklicken kann und eine Funktion dabei kickt
function disablePlayingfields()
{
  onclickAllowed = false;
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
      block ? block.classList.value.includes("occupied") ? aBoard.push(block.children[0] ? block.id + "|" + block.children[0].id + "|" + block.children[0].getAttribute("rotation") : {}) : {} : {};
    }
  }
  return aBoard;
}

// Speichert das Bombenfeld als Array ab und gibt es aus
function bombfieldAsArray(side)
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

      // console.log(block);
      block ? block.classList.value.includes("blue") ? aBoard.push(block.id + "|" + "blue") : block.classList.value.includes("red") ? aBoard.push(block.id + "|" + "red") : {} : {};
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


// Erstellt die Buttons zwischen den zwei Spielfeldern
function createMenuButtons()
{
  var eHere = document.querySelector("#forMenu");

  const eDiv1 = document.createElement("div");
  eDiv1.setAttribute("id", "buttonsMenu");
  eDiv1.classList.add("buttonsMenu");

  // const aButtons = ["start", "save", "load", "reset"];
  // const aButtons = ["START", "SAVE", "RESET"];
  const aButtons = ["NEW", "START"];

  aButtons.forEach(button =>
  {
    const eDiv2 = document.createElement("div");
    eDiv2.classList.add("button");

    const eDiv3 = document.createElement("div");
    eDiv3.textContent = button;

    switch (button)
    {
      case "NEW":
        eDiv2.setAttribute("onclick", "runOnNewGame()");
        break;

      case "START":
        eDiv2.setAttribute("onclick", "runOnStart()");
        break;

      case "SAVE":
        eDiv2.setAttribute("onclick", "runOnSave()");
        break;

      case "RESET":
        eDiv2.setAttribute("onclick", "runOnReset()");
        break;

      case "load":
        eDiv2.setAttribute("onclick", "runOnLoad()");
        break;

      default:
        return;
    }

    eDiv2.appendChild(eDiv3);
    eDiv1.appendChild(eDiv2);

  });

  eHere.appendChild(eDiv1);

}

// Diese Funktion wird ausgeführt um ein neues Spiel zu starten
function runOnNewGame()
{


  runOnReset();
  let name0 = prompt("Username for player LEFT");
  let name1 = prompt("Username for player RIGHT");
  playername0 = name0;
  playername1 = name1;
  gameID = getLatestID();
  newGameDB();
  refreshList();
  // saveName();
  // runOnSave();


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

// Gibt alle Daten aus der Datenbank wieder
function getAllTableData()
{
  $.ajax({
    url: "process/database/database.php",
    type: "post",
    data: { action: "getAll" },
    success: function (e)
    {
      insertDataIntoBoard(e);
    }
  });
}
//Erssetzt das Array mit aktuellen daten
function insertDataIntoBoard(e)
{
  // console.log(JSON.parse(e));
  var array = [];

  JSON.parse(e).forEach(element =>
  {
    array.push(element[0] + "|" + element[1] + "|" + element[2]);
  });

  log = array;
}
//Spiel reinladen
function loadIn(id)
{
  gameID = id;
  runOnReset();
  runOnLoad(id);
}

function createLogBoard()
{
  const here = document.querySelector(".frontside");
  const board = document.createElement("div");
  board.classList.add("log");
  board.setAttribute("id", "logmenu");

  const blackbar = document.createElement("div");
  blackbar.classList.add("blackbar");
  blackbar.textContent = "LOG";
  const button = document.createElement("button");
  button.setAttribute("id", "logButton");
  button.setAttribute("onclick", "refreshList()");
  // blackbar.appendChild(button);
  board.appendChild(blackbar);
  const list = document.createElement("div");
  list.classList.add("list");
  list.setAttribute("id", "loglist");
  board.appendChild(list);

  here.appendChild(board);
}
//Entfernt das vorrige board
function removecurrentBoard()
{

  const thisBoard = document.querySelector("#loglist");
  const parent = document.querySelector("#logmenu");

  parent.removeChild(thisBoard);
}
// Aktualisiert die Liste
function refreshList()
{

  // getAllTableData();
  const here = document.querySelector("#logmenu");
  removecurrentBoard();
  const list = document.createElement("div");



  list.classList.add("list");
  list.setAttribute("id", "loglist");

  log.forEach(logLine =>
  {
    const newDiv = document.createElement("div");
    newDiv.textContent = logLine;
    const partial = logLine.split("|");
    if (partial[0] == gameID)
    {
      newDiv.classList.add("redMark");
    }
    else
    {
      newDiv.classList.remove("redMark");
    }
    newDiv.setAttribute("onclick", "loadIn(" + partial[0] + ")");
    list.appendChild(newDiv);
  });


  here.appendChild(list);


}



