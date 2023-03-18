<script setup>
defineProps({
    isMine: Boolean,
    text: String
})
</script>

<template>
    <div :class="{bubble: true, mine: isMine}">
        {{ text }}
    </div>
</template>

<style scoped>
.bubble {
    width: max-content;
    background-color: #364151;
    padding: 8px 15px;
    margin: 10px 0;
    border-radius: 15px 15px 0 15px;
}

.bubble.mine {
    align-self: flex-end;
    background-color: #125e59;
}
</style>