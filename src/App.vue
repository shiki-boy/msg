<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </RouterView>
</template>

<style scoped></style>
