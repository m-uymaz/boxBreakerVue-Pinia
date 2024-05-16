<template>
    <div id="right-nav">
        <div id="fall-option">
            <div>
                <label id="interval-label" for="interval">Fall Down</label>
            </div>
            <fieldset>
                <label @click="fallClickHandler" for="fall-on">
                    On
                    <input type="radio" name="fallOn" id="fall-on" :value="true" v-model="falling">
                </label>
                <label @click="fallClickHandler" for="fall-off">
                    Off
                    <input type="radio" name="fallOff" id="fall-off" :value="false" v-model="falling">
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStateStore } from '../stores/appStateStore'

const falling = ref(false)
const store = useAppStateStore()

const fallOn = () => {
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
            return;
        }

        if (store.countMilliseconds === 2500) {
            store.moveDown();
            store.countMilliseconds = 0;
        }

        store.countMilliseconds += 100;
    }, 100);
}

const fallOff = () => {
    if (!store.fall) return;
    store.fall = false;
    if (store.interval) {
        clearInterval(store.interval);
        store.interval = null;
        store.countMilliseconds = 0;
    }
}

const fallClickHandler = (event: Event) => {
    const target = event.target as HTMLLabelElement
    if (target.id! === 'fall-on') {
        fallOn()
    } else if (target.id! === 'fall-off') fallOff()
    target.blur()
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