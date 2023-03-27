<script setup>
import TextInput from '@/components/Forms/TextInput.vue';
import AppButton from '@/components/AppButton.vue';

import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import httpClient from '../httpClient';

const router = useRouter()

const form = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
})

const foo = () => router.push('/login')

const handleSubmit = async () => {
    await httpClient.post('/api/auth/register', form)

    router.push('/login')
}
</script>


<template>
    <div class="card">
        <h1 @click="foo">Signup</h1>

        <form @submit.prevent="handleSubmit">
            <TextInput name="email" label="Email" type="email" v-model="form.email" />

            <TextInput name="firstName" label="First Name" type="text" v-model="form.firstName" />

            <TextInput name="lastName" label="Last Name" type="text" v-model="form.lastName" />

            <TextInput name="password" label="Password" type="password" v-model="form.password" />

            <AppButton label="sign up" />
        </form>
    </div>
</template>

<style scoped></style>
