<?php

require_once "field.php";
require_once "ship.php";

class player
{
    protected object $oPlayingfield;
    protected object $oBombingfield;
    protected SplFixedArray $aShips;
    protected object $oShip;

    public function __construct()
    {
        $this->oPlayingfield = new playingfield();
        $this->oBombingfield = new playingfield();
        $this->aShips = new SplFixedArray(10);
        $this->oShip = new ship();
        $this->shipCreationWhileLoading($this->aShips, $this->oShip->getAShips());
        unset($this->oShip);
    }


    /** Waehrend das Objekt erstellt wird, werden alle Schiffsobjekte in das 10er Array reingeladen
     * Summary of shipCreationWhileLoading
     * @param SplFixedArray $aShips
     * @param array $aShiptypes
     * @return void
     */
    private function shipCreationWhileLoading(SplFixedArray &$aShips, array $aShiptypes)
    {
        for ($i = 0; $i < $this->aShips->count(); $i++) {
            $this->aShips[$i] = $aShiptypes[$i];
        }
    }


	/** Gibt das Feld wieder, wo man bombadiert
	 * @return object
	 */
	public function getOBombingfield(): object {
		return $this->oBombingfield;
	}


	/** Gibt das Feld wieder, wo der Spieler seine Schiffe setzt
	 * @return object
	 */
	public function getOPlayingfield(): object {
		return $this->oPlayingfield;
	}


	/** Gibt ein Array wieder, wo alle Schiffe drin sind, mit deren Status
	 * @return SplFixedArray
	 */
	public function getAShips(): SplFixedArray {
		return $this->aShips;
	}
}

// $test = new player();
// print_r($test);