<script setup>
import { RouterView } from 'vue-router';
import SendMessage from '@/components/views/SendMessage.vue';
import ChannelSidebar from '../components/views/ChannelSidebar.vue';
</script>

<template>
    <div class="app-layout-container">
        <ChannelSidebar />

        <main>
            <RouterView />

            <SendMessage />
        </main>
    </div>
</template>

<style scoped>
.app-layout-container {
    display: flex;
}


main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    padding: 20px 10px;
}
</style>