<template>
  <!--:tabindex="0" @keydown="keyHandler"-->
  <main id="main">
    <GameOverBanner :isGameOver="gameOverState" />
    <ComboBanner />

    <LeftNav :scoreString="getScore" />

    <Playground />

    <RightNav />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { KeyboardInputs } from './constants/constants'
import { useAppStateStore } from './stores/appStateStore'
// Modules
import {
  floodFill,
  explodeDelay,
  clearPrevTimeouts,
  fillEmptyGridSpacesDelay
} from './modules/gameLogic'
// Components
import Playground from './components/Playground.vue'
import LeftNav from './components/LeftNav.vue'
import RightNav from './components/RightNav.vue'
import GameOverBanner from './components/GameOverBanner.vue'
import ComboBanner from './components/ComboBanner.vue'

onMounted(() => {
  window.addEventListener('keydown', keyHandler)
})

const store = useAppStateStore()

const { getScore, fall, caughtBox, gameOverState, thrownBox, explodedBoxes, checkBoxPositions } =
  storeToRefs(store)

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

async function floodFillChain(position: { y: number; x: number }): Promise<void> {
  // Flood Fill changes the state instantaneously
  floodFill(store, position)

  clearPrevTimeouts(store)

  if (!explodedBoxes.value.length) return

  await explodeDelay(store, 500)
  await fillEmptyGridSpacesDelay(store, 500)

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
</style>
