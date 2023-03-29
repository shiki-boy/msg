<script setup>
import { RouterView } from "vue-router";

import AppModal from "./components/AppModal.vue";
</script>

<template>
  <AppModal />

  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </RouterView>
</template>

<style scoped></style>
