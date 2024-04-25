<template>
    <div id="right-nav">
        <div id="fall-option">
            <div>
                <label id="interval-label" for="interval">Fall Down</label>
            </div>
            <fieldset>
                <label @click="fallOn(store)" for="fall-on">
                    On
                    <input type="radio" value="true" name="fallOption" id="fall-on">
                </label>
                <label @click="fallOff(store)" for="fall-off">
                    Off
                    <input type="radio" value="false" name="fallOption" id="fall-off" checked>
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AppStateInterface } from '../types/types'
import { useAppStateStore } from '../stores/appStateStore'
import moveDown from '../modules/moveDown'

const store = useAppStateStore()

const fallOn = (store: AppStateInterface) => {
    if (store.fall) return;
    store.fall = true;
    store.interval = setInterval(() => {
        if (
            !store.fall
            ||
            store.timeouts.explodeTimeout
            ||
            store.timeouts.fillEmptyGridSpacesTimeout
        ) return;

        if (store.gameOverState && store.interval) {
            clearInterval(store.interval);
            store.interval = null;
        }

        if (store.countMilliseconds === 2500) {
            moveDown(store);
            store.countMilliseconds = 0;
        }

        store.countMilliseconds += 100;
    }, 100);
}

const fallOff = (store: AppStateInterface) => {
    if (!store.fall) return;
    store.fall = false;
    if (store.interval) {
        clearInterval(store.interval);
        store.interval = null;
        store.countMilliseconds = 0;
    }
}
</script>

<style scoped>
#right-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    font-size: 1.5em;
    color: white;
}

#fall-option {
    text-align: center;
}
</style>