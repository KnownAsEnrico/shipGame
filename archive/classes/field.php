<?php


class playingfield
{

    /** Hoehe der Spielflaeche
     * Summary of iHeight
     * @var SplFixedArray
     */
    protected SplFixedArray $iHeight;


    /** Breite der Spielflaeche
     * Summary of iWidth
     * @var SplFixedArray
     */
    protected SplFixedArray $iWidth;


    /** Konstruktor mit Standardgroesse 
     * Summary of __construct
     */
    public function __construct()
    {
        $this->iHeight = new SplFixedArray(10);
        $this->iWidth = new SplFixedArray(10);
    }

    
	/** Gibt das Array der X-Koordinaten
	 * @return array
	 */
	public function getIWidth(): SplFixedArray {
		return $this->iWidth;
	}


	/** Gibt das Array der Y-Koordinaten
	 * @return array
	 */
	public function getIHeight(): SplFixedArray {
		return $this->iHeight;
	}

	/**
	 * Hoehe der Spielflaeche
	 * Summary of iHeight
	 * @param SplFixedArray $iHeight Hoehe der Spielflaeche
	 */
	public function setIHeight(SplFixedArray $iHeight) 
    {
		$this->iHeight = $iHeight;
	}

	/**
     * Breite der Spielflaeche
	 * @param SplFixedArray $iWidth Breite der Spielflaeche
	 */
	public function setIWidth(SplFixedArray $iWidth)
    {
		$this->iWidth = $iWidth;
	}
}