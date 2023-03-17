<script setup>


</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </RouterView>
</template>

<style scoped>
.card {
    max-width: 50vw;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50% 0px;
    padding: 40px;
    border: 1px solid;
}
</style>