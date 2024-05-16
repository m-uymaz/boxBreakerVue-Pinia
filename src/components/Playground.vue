<template>
  <div id="playground">
    <GridBox v-for="boxN in GRID_BOXES_SIZE" :key="boxN" :boxN="boxN" />
  </div>
</template>

<script setup lang="ts">
import { GRID_BOXES_SIZE } from '../constants/constants'
import GridBox from './GridBox.vue'
</script>

<style>
#playground {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);

  background-color: black;
  border: 1px solid black;
}
</style>
