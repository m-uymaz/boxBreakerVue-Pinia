<template>
    <!--:tabindex="0" @keydown="keyHandler"-->
    <main id="main">
        <GameOverBanner :isGameOver="gameOverState" />
        <ComboBanner />

        <LeftNav :scoreString="getScore" />

        <div id="playground">
            <GridBox v-for="boxN in GRID_BOXES_SIZE" :key="boxN" :boxN="boxN"
                :rgb="gridArray[rowIndex(boxN)][colIndex(boxN)]"
                :isOnArrowIndex="colIndex(boxN) === arrowIndex ? 'box-selected' : 'box'"
                :isArrow="colIndex(boxN) === (arrowIndex) && boxN > LAST_ROW_N_START ? 'arrow' : ''"
                :caughtBoxColor="caughtBox || null" :isBlinking="blinkingBoxesN.includes(boxN) ? true : false"
                :isExploding="explodingBoxesN.includes(boxN) ? true : false" />
        </div>

        <RightNav />
    </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GRID_BOXES_SIZE, LAST_ROW_N_START, KeyboardInputs } from './constants/constants.js'
import { useAppStateStore } from './stores/appStateStore.js'
// Modules
import { colIndex, rowIndex } from './modules/findRowColIndex.js'
import { floodFill } from './modules/floodFillFuncs.js'
import { fillEmptyGridSpacesDelay, explodeDelay, clearPrevTimeouts } from './modules/timeouts.js'
// Components
import GridBox from './components/GridBox.vue'
import LeftNav from './components/LeftNav.vue'
import RightNav from './components/RightNav.vue'
import GameOverBanner from './components/GameOverBanner.vue'
import ComboBanner from './components/ComboBanner.vue'
import { storeToRefs } from 'pinia'

onMounted(() => {
    window.addEventListener('keydown', keyHandler)
})

const store = useAppStateStore()

const {
    gridArray,
    getScore,
    fall,
    caughtBox,
    gameOverState,
    arrowIndex,
    thrownBox,
    explodedBoxes,
    explodingBoxesN,
    blinkingBoxesN,
    checkBoxPositions,
} = storeToRefs(store)

const keyHandler = (e: KeyboardEvent) => {
    if (gameOverState.value) return
    switch (e.code) {
        case KeyboardInputs.ArrowLeft:
            store.playerMovements(KeyboardInputs.ArrowLeft)
            break
        case KeyboardInputs.ArrowRight:
            store.playerMovements(KeyboardInputs.ArrowRight)
            break
        case KeyboardInputs.Space:
            if (caughtBox.value) {
                store.throwBox()

                floodFillChain(thrownBox.value!)
            } else {
                store.catchBox()
            }
            break
        default:
            if (fall.value) return

            store.moveDown()
            break
    }
}

async function floodFillChain(position: { y: number, x: number }): Promise<void> {
    // Flood Fill changes the state instantaneously
    floodFill(store, position)

    clearPrevTimeouts(store)

    if (!explodedBoxes.value.length) return

    await explodeDelay(store, 500)
    await fillEmptyGridSpacesDelay(store, 300)

    checkBoxPositions.value.forEach((newPosition) => {
        floodFillChain(newPosition)
    })
}
</script>

<style scoped>
#main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

#playground {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    position: relative;

    max-width: 520px;
    max-height: 1040px;
    border: 1px solid black;
    background-color: aliceblue;
}

@media (max-height: 900px) {
    #playground {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(20, 1fr);

      background-color: black;
    }
}
</style>
