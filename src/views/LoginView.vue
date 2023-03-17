<script setup>
import { useRouter } from 'vue-router';
import TextInput from '@/components/Forms/TextInput.vue';
import AppButton from '../components/AppButton.vue';

const router = useRouter()

const foo = () =>  router.push('/signup') 
</script>

<template>
    <div class="card" @click="foo">
        <h1>Login</h1>

        <TextInput name="email" label="Email" />

        <AppButton label="Login" />
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
