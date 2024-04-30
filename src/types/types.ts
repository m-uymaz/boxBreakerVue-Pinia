import { useAppStateStore } from "../stores/appStateStore";
export type AppStateInterface = {
  	gridArray: GridArray;
  	timeouts: {
    	explodeTimeout: NodeJS.Timeout | null;
    	fillEmptyGridSpacesTimeout: NodeJS.Timeout | null;
  	}
  	checkBoxPositions: ExplodedBoxes;
  	explodedBoxes: ExplodedBoxes;
  	blinkingBoxesN: number[];
  	explodingBoxesN: number[];
  	highestPositionY: number;
  	arrowIndex: number;
  	caughtBox: string | null;
  	caughtBoxFrom: { y: number, x: number } | null;
  	thrownBox: { x: number, y: number } | null;
  	gameOverState: boolean;
  	fall: boolean;
  	interval: NodeJS.Timeout | null;
  	countMilliseconds: number;
    score: number;
}

export type AppStore = ReturnType<typeof useAppStateStore>

export type ExplodedBoxes = { y: number, x: number }[];
export type GridArray = (string | null)[][];

export type newLineArray = string[];
export type CurrentColor = string | null;
export type RandomColor = {
    rgb: string;
  	index: number;
}