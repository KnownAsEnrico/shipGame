<?php

class ship 
{
    /** Name des Schiffs
     * Summary of iSize
     * @var string
     */
    protected string $sName;


    /** Goesse des Schiffs
     * Summary of iSize
     * @var int
     */
    protected int $iSize;


    /** Zustand vom Schiff: Stehend/Gesunken
     * Summary of bState
     * @var bool
     */
    protected bool $bState;
    
    /** aShips als Array gekuerzt
     * Summary of aShips
     * @var array
     */
    protected array $aShipsData = [ "battleship" => [ "amount" => 1, "size" => 5, "state" => true],
                                    "cruiser" => [  "amount" => 2, "size" => 4, "state" => true],
                                    "destroyer" => [  "amount" => 3, "size" => 3, "state" => true],
                                    "submarine" => [  "amount" => 4, "size" => 2, "state" => true]];

    /** Alle Schiffe werden hier als Objekt gespeichert
     * Summary of aShips
     * @var array
     */
    protected array $aShips = [];

    // Konstruktor
    public function __construct()
    {
    }


	/** Gibt die Groesse vom Schiff
	 * @return int
	 */
	public function getISize(): int 
    {
		return $this->iSize;
	}


	/** Setzt eine beliege Groesse vom Schiff
	 * @param int $iSize 
	 */
	public function setISize(int $iSize) 
    {
		$this->iSize = $iSize;
	}


	/** Gibt den Zustand von Schiff
	 * @return bool
	 */
	public function getBState(): bool 
    {
		return $this->bState;
	}


	/** Setzt einen beliegen Zustand vom Schiff
	 * @param bool $bState 
	 */
	public function setBState(bool $bState) 
    {
		$this->bState = $bState;
	}

    /** Gibt den Namen des Schiffs
	 * Name des Schiffs
	 * Summary of iSize
	 * @return string
	 */
	public function getSName(): string {
		return $this->sName;
	}
	
	/** Setzt den Namen des Schiffs
	 * Name des Schiffs
	 * Summary of iSize
	 * @param string $sName Name des Schiffs
	 */
	public function setSName(string $sName)
    {
		$this->sName = $sName;
	}

 /** Gibt alle Schiff Arten als Objekte in einem Array wieder
  * Summary of getAShips
  * @return array
  */
	public function getAShips()
    {

        foreach ($this->aShipsData as $key => $value) {
            switch ($key) {

                    case "battleship":
                            for ($i = 0; $i < $value["amount"]; $i++) {
                                $aNew = new ship();
                                $aNew->setSName($key);
                                $aNew->setISize($value["size"]);
                                $aNew->setBState($value["state"]);
                                array_push($this->aShips, $aNew);
                            }
                        break;

                    case "cruiser":
                            for ($i = 0; $i < $value["amount"]; $i++) {
                                $aNew = new ship();
                                $aNew->setSName($key);
                                $aNew->setISize($value["size"]);
                                $aNew->setBState($value["state"]);
                                array_push($this->aShips, $aNew);
                            }
                        break;

                    case "destroyer":
                            for ($i = 0; $i < $value["amount"]; $i++) {
                                $aNew = new ship();
                                $aNew->setSName($key);
                                $aNew->setISize($value["size"]);
                                $aNew->setBState($value["state"]);
                                array_push($this->aShips, $aNew);
                            }
                        break;

                    case "submarine":
                            for ($i = 0; $i < $value["amount"]; $i++) {
                                $aNew = new ship();
                                $aNew->setSName($key);
                                $aNew->setISize($value["size"]);
                                $aNew->setBState($value["state"]);
                                array_push($this->aShips, $aNew);
                            }
                        break;

                    }
        }
		return ($this->aShips);
	}
}

