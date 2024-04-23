export type AppStateInterface = {
  	gridArray: GridArray;
  	timeouts: {
    	explodeTimeout: number | null;
    	rerenderTimeout: number | null;
  	}
  	checkBoxPositions: ExplodedBoxes;
  	explodedBoxes: ExplodedBoxes;
  	blinkingBoxesN: number[];
  	explodingBoxesN: number[];
  	highestPositionY: number;
  	arrowIndex: number;
  	coughtBox: string | null;
  	coughtBoxFrom: { y: number, x: number } | null;
  	thrownBox: { x: number, y: number } | null;
  	gameOverState: boolean;
  	fall: boolean;
  	interval: number | null;
  	countMilliseconds: number;
  	score: number;
}

export type ExplodedBoxes = { y: number, x: number }[];
export type GridArray = (string | null)[][];

export type newLineArray = string[];
export type CurrentColor = string | null;
export type RandomColor = {
    color: string;
    rgb: string;
  	index: number;
}