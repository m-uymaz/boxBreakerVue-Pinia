import { AppStateInterface } from "../types/types";

const gameOver = (store: AppStateInterface): void => {
    store.gameOverState = true;
}

export default gameOver;