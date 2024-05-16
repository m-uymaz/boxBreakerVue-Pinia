<template>
    <div :class="classObject" :style="{ backgroundColor: rgb}">
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStateStore } from '../stores/appStateStore';
import { colIndex, rowIndex } from '../modules/gameLogic';
import { ALICEBLUE, ARROW, LAST_ROW_N_START } from '../constants/constants';
const props = defineProps<{
    boxN: number
}>()

const store = useAppStateStore()

const {
    explodingBoxesN,
    blinkingBoxesN,
    arrowIndex,
    gridArray,
    caughtBox
} = storeToRefs(store)

const isBoxArrow = computed(() => {
    return (colIndex(props.boxN) === arrowIndex.value) && (props.boxN > LAST_ROW_N_START)
})

const rgb = computed(() => {
    if(isBoxArrow.value && caughtBox.value) return caughtBox.value
    const gridBoxValue = gridArray.value[rowIndex(props.boxN)][colIndex(props.boxN)]
    if (
        gridBoxValue === null
        ||
        gridBoxValue === ARROW
    ) {
        return ALICEBLUE
    } else {
        return gridArray.value[rowIndex(props.boxN)][colIndex(props.boxN)] || ''
    }
})

const isBoxOnArrowShadow = computed(() => {
    return (colIndex(props.boxN) === arrowIndex.value)
})

const isBoxExploding = computed(() => {
    return explodingBoxesN.value.includes(props.boxN)
})

const isBoxBlinking = computed(() => {
    return blinkingBoxesN.value.includes(props.boxN)
})

const classObject = computed(() => ({
    'soon-to-explode': isBoxBlinking.value,
    'box-explosion': isBoxExploding.value,
    'arrow': isBoxArrow.value,
    'box': !isBoxOnArrowShadow.value,
    'box-selected': isBoxOnArrowShadow.value
    }))
</script>

<style scoped>
.box {
    border: 1px solid black;
    width: 50px;
    height: 50px;
}

.box-selected {
    border: 3px solid black;
    width: 46px;
    height: 46px;
}

@media (max-height: 900px) {
    .box {
        width: 35px;
        height: 35px;
    }

    .box-selected {
        width: 32px;
        height: 32px;
    }
}

.arrow {
    background-size: 90%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('arrow_up.png');

    animation: arrowAnimation 0.6s infinite;
}

@keyframes arrowAnimation {
    50% {
        background-position-y: 1%;
    }
}

.box-explosion {
    animation: explosion 0.2s linear;
}

@keyframes explosion {
    0% {
        background-image: url('/explotion.webp');
        background-size: contain;
    }

    75% {
        background-color: aliceblue;
    }

    100% {
        background-color: aliceblue;
        background-image: none;
    }
}

.soon-to-explode {
    animation: blinking-box 0.2s infinite;
}

@keyframes blinking-box {
    0% {
        opacity: 0.5;
    }

    33% {
        opacity: 1;
    }

    66% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>