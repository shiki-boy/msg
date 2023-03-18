<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <div>
        <aside class="sidebar">
            <nav></nav>
        </aside>

        <main>
            <RouterView />
        </main>
    </div>
</template>
