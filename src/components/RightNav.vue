<template>
    <div id="right-nav">
        <div id="fall-option">
            <div>
                <label id="interval-label" for="interval">Fall Down</label>
            </div>
            <fieldset>
                <label @click="fallClickHandler" for="fall-on">
                    On
                    <input type="radio" value="true" name="fallOption" id="fall-on">
                </label>
                <label @click="fallClickHandler" for="fall-off">
                    Off
                    <input type="radio" value="false" name="fallOption" id="fall-off" checked>
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['fall-on', 'fall-off'])

// LOL
const fallClickHandler = (event: Event) => {
    const target = event.target as HTMLLabelElement

    if (target.id! === 'fall-on') {
        emit('fall-on')
    } else if (target.id! === 'fall-off') emit('fall-off')

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