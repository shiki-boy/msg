<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const foo = () => router.push('/login') 
</script>


<template>
    <div class="card" @click="foo">
        <h1>Signup</h1>
    </div>
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
