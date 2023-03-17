<script setup>
import TextInput from '@/components/Forms/TextInput.vue';
import AppButton from '@/components/AppButton.vue';

import { useRouter } from 'vue-router';

const router = useRouter()

const foo = () => router.push('/signup')
</script>

<template>
    <div class="card">
        <h1 @click="foo">Login</h1>

        <TextInput name="email" label="Email" />

        <AppButton label="Log in" />
    </div>
</template>

<style scoped></style>
