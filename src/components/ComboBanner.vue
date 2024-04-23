<template>
    <h2 id="combo" :style="{ display: 'none' }">Combo <span id="combo-n"></span>!</h2>
</template>

<script setup lang="ts"></script>

<style>
#combo {
    display: none;
    color: white;
    font-family: cursive;
    font-style: italic;
    font-size: 2em;

    text-align: center;

    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
}
</style>
