<template>
    <div id="left-nav">
        <fieldset>
            <h2>Score: <span id="score-span">{{ scoreString }}</span></h2>
        </fieldset>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import calculateScore from '../modules/calculateScore';
const props = defineProps<{ score: number }>()

const scoreString: Ref<string> = ref('000000');

watch(() => props.score, () => {
    if (props.score > 0) {
        scoreString.value = calculateScore(props.score)
    }
})
</script>

<style scoped>
#left-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    height: max-content;
    font-size: 1.5em;
    color: white;
}

@media (min-width: 576px) and (max-width: 991px) {
    #left-nav {
        font-size: 1em;
    }
}
</style>