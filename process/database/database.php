<?php

class database
{
    protected object $mysqliCon;

    /** Konstruktor der Klasse Database
     * Summary of __construct
     */
    public function __construct()
    {
        $this->mysqliCon = new mysqli("192.168.50.199", "ext-com", "Ext-Com089", "lehrling");
    }

    /** Gibt alle Daten in der Tabelle wieder
     * Summary of getAllTableData
     * @return mixed
     */
    public function getAllTableData()
    {
        $sqlCommand = "SELECT * FROM shipgame";
        return $this->mysqliCon->query($sqlCommand)->fetch_all();
    }

    /** Setzt ein Array in die DB
     * Summary of setInsert
     * @param array $aArray
     * @return mixed
     */
public function setInsert(String $aArray1, String $aArray2, Int $state, Int $id) {
    $aArray1 = $this->mysqliCon->real_escape_string($aArray1);
    $aArray2 = $this->mysqliCon->real_escape_string($aArray2);

    $sqlCommand = "UPDATE shipgame 
                    SET playerfield0 = '$aArray1', playerfield1 = '$aArray2', state = $state
                    WHERE game_id = $id";

    return $this->mysqliCon->query($sqlCommand);
}
    
        /** Setzt ein Eintrag in die DB
     * Summary of setName
     * @param array $aArray
     * @return mixed
     */
    public function setName(String $name0, String $name1, Int $id) 
    {
        $sqlCommand = "UPDATE shipgame 
                        SET player0 = '$name0', player1 = '$name1
                        WHERE game_id = $id";
        return $this->mysqliCon->query($sqlCommand);
    }
    

    /** Setzt ein Array in die DB
     * Summary of setInsert
     * @param array $aArray
     * @return mixed
     */
public function setInsertGame(String $aArray1, String $aArray2, Int $current, Int $id, Int $lives0, Int $lives1) 
{
    $sqlCommand = "UPDATE shipgame 
                    SET playerlives0 = $lives0, playerlives1 = $lives1, bombingfield0 = '$aArray1', bombingfield1 = '$aArray2', current = $current
                    WHERE game_id = $id";
    // var_dump($sqlCommand);
    return $this->mysqliCon->query($sqlCommand);
}

    /** Gibt eine Zeile der Tabelle wieder
     * Summary of getGameDataById
     * @param string $sId
     * @return mixed
     */
    public function getGameDataById(int $sId)
    {
        $sqlCommand = "SELECT * FROM shipgame
                       WHERE game_id LIKE $sId";
        return $this->mysqliCon->query($sqlCommand)->fetch_assoc();
    }

    /** Erstellt ein neues Spiel
     * Summary of createNewGame
     * @return void
     */
    public function createNewGame(String $player0, String $player1) {
        // Sanitize and escape user inputs
        $player0 = $this->mysqliCon->real_escape_string($player0);
        $player1 = $this->mysqliCon->real_escape_string($player1);

        // Construct the SQL query
        $sqlCommand = "INSERT INTO shipgame 
                    (player0, player1, playerfield0, playerfield1, bombingfield0, bombingfield1, current, state, playerlives0, playerlives1)
                    VALUES ('$player0', '$player1', '', '', '', '', 0, 0, 17, 17);
                    SELECT LAST_INSERT_ID() AS last_id;";

        //Führt eine oder mehrere Abfragen in einer Datenbank durch
        $result = $this->mysqliCon->multi_query($sqlCommand);

        if ($result) {
            // Bereitet das nächste Ergebnis von multi_query vor
            $this->mysqliCon->next_result();

            // Überträgt die Ergebnismenge der letzten Abfrage
            $result = $this->mysqliCon->store_result();
            $row = $result->fetch_assoc();
            $lastInsertID = $row['last_id'];

            echo($lastInsertID);
        } else {
            echo "Error: " . $this->mysqliCon->error;
        }
    }


    /** Gibt das MySQLI Objekt, zuer weiterverwendung
     * @return object
     */
    public function getMysqliCon(): object
    {
        return $this->mysqliCon;
    }
}


$base = new database();


if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    if($_POST["action"] && $_POST["action"] == "first")  {
        echo true;
    }

    if($_POST["action"] && $_POST["action"] == "save") 
    {
        $base->setInsert($_POST["array1"], $_POST["array2"], $_POST["gamestate"], $_POST["gameID"]);
    }

    if($_POST["action"] && $_POST["action"] == "saveGame") 
    {
        // var_dump($base->setInsertGame($_POST["array1"], $_POST["array2"], $_POST["current"], $_POST["gameID"], $_POST["lives0"], $_POST["lives1"]));
        $base->setInsertGame($_POST["array1"], $_POST["array2"], $_POST["current"], $_POST["gameID"], $_POST["lives0"], $_POST["lives1"]);
        // var_dump($base->setInsertGame($_POST["array1"], $_POST["array2"], $_POST["current"], $_POST["gameID"]));
    }

    if($_POST["action"] && $_POST["action"] == "newGame") 
    {
        $base->createNewGame($_POST["player0"], $_POST["player1"]);
        // var_dump($base->getMysqliCon()->query("SELECT LAST_INSERT_ID()"));
    }

        if($_POST["action"] && $_POST["action"] == "saveName") 
    {
        $base->setName($_POST["name0"], $_POST["name1"], $_POST["gameID"]);
        // var_dump($base->getMysqliCon()->query("SELECT LAST_INSERT_ID()"));
    }

        if($_POST["action"] && $_POST["action"] == "getAll") 
    {
        echo json_encode($base->getAllTableData());
    }

    if($_POST["action"] && $_POST["action"] == "load")
    {
        echo json_encode($base->getGameDataById($_POST["id"]));
    }

}

// if ($_SERVER["REQUEST_METHOD"] == "GET")  {
//     echo "true";
// }
// $base->createNewGame();