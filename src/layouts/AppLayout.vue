<script setup>
import { RouterView } from 'vue-router';
import SendMessage from '@/components/views/SendMessage.vue';
</script>

<template>
    <div class="app-layout-container">
        <aside class="sidebar">
            <nav></nav>
        </aside>

        <main>
            <RouterView />

            <SendMessage />
        </main>
    </div>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    padding: 20px 10px;
}

</style>