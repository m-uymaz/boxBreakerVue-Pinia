import { ARROW, KeyboardInputs, GridRowIndeces, GridColumsIndeces } from '../constants/constants.js';
import { AppStateInterface } from '../types/types.js';

const moveArrow = (store: AppStateInterface, direction: string): void => {
        if (
        direction === KeyboardInputs.ArrowLeft && store.arrowIndex === GridColumsIndeces.First
        ||
        direction === KeyboardInputs.ArrowRight && store.arrowIndex === GridColumsIndeces.Last
    ) return;

    store.gridArray[GridRowIndeces.Last][store.arrowIndex] = null;

    direction === KeyboardInputs.ArrowRight ? store.arrowIndex++ : store.arrowIndex--;
    store.gridArray[GridRowIndeces.Last][store.arrowIndex] = ARROW;
    
    // console.clear()
    // console.table(AppState.gridArray);
}

export default moveArrow;