<script setup>
defineProps({
    isMine: Boolean,
    text: String
})
</script>

<template>
    <div :class="{bubble: true, mine: isMine}" data-timestamp="12:08 AM">
        {{ text }}
    </div>
</template>

<style scoped>
.bubble {
    width: max-content;
    background-color: #364151;
    padding: 8px 15px;
    margin: 20px 0;
    border-radius: 15px 15px 0 15px;
}

.bubble::before {
    content: attr(data-timestamp);
    position: absolute;
    top: -24px;
    width: max-content;
    font-size: 11px;
    left: 5px;
}

.bubble.mine::before {
    left: 0px;
}

.bubble.mine {
    align-self: flex-end;
    background-color: #5e4dcd;
    color: white;
}
</style>