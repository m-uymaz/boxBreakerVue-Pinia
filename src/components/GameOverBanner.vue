<template>
    <h1 :class="isGameOver ? 'h1-blinking' : 'h1-none'">GAME OVER</br>!!!</h1>
    <!-- <h1 :class="{'h1-blinking': isGameOver}">GAME OVER</br>!!!</h1>
    <h1 :class="classesComputed">GAME OVER</br>!!!</h1> -->
</template>

<script setup lang="ts">
defineProps<{ isGameOver: boolean }>()
</script>

<style scoped>
.h1-none {
    display: none;
}

.h1-blinking {
    background-color: none;
    display: block;
    animation: blink 1s linear infinite;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;

    font-size: 4em;
    text-align: center;
}

@media (max-height: 900px) {
    .h1-blinking {
        font-size: 3em;
    }
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
