<template>
    <div v-bind:class="`
        ${isArrow}
        ${isOnArrowIndex}
        ${isBlinking ? 'soon-to-explode' : ''}
        ${isExploding ? 'box-explosion' : ''}
        `" v-bind:style="{
            backgroundColor:
                isArrow ? caughtBoxColor || ALICEBLUE
                    :
                    rgb || ALICEBLUE
        }">
    </div>
</template>

<script setup lang="ts">
import { ALICEBLUE } from '../constants/constants';
defineProps<{
    rgb: string | null
    isOnArrowIndex: string
    isArrow: string
    caughtBoxColor: string | null
    boxN: number
    isBlinking: boolean
    isExploding: boolean
}>()
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
    animation: explosion 0.4s linear;
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