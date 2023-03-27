<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

import TextInput from '@/components/Forms/TextInput.vue';
import AppButton from '@/components/AppButton.vue';
import httpClient from '../httpClient';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()

const router = useRouter()

const form = reactive({
    email: "u2@example.com",
    password: "Test"
})

const foo = () => router.push('/signup')

const handleSubmit = async () => {
    const { data } = await httpClient.post('/api/auth/login', form)

    const accessTokenExpires = new Date(
        jwtDecode(data.accessToken).exp * 1000,
    )
    const refreshTokenExpires = new Date(
        jwtDecode(data.refreshToken).exp * 1000,
    )

    Cookies.set('Authorization', `Bearer ${data.accessToken}`, {
        expires: accessTokenExpires,
    })

    Cookies.set('refreshToken', data.refreshToken, {
        expires: refreshTokenExpires,
    })

    httpClient.defaults.headers[
        'Authorization'
    ] = `Bearer ${data.accessToken}`

    authStore.setUser(data.user)

    router.push('/')
}
</script>

<template>
    <div class="card">
        <h1 @click="foo">Login</h1>

        <form @submit.prevent="handleSubmit">
            <TextInput name="email" v-model="form.email" label="Email" type="email" />

            <TextInput name="password" label="Password" v-model="form.password" type="password" />

            <AppButton label="Log in" type="submit" />
        </form>
    </div>
</template>

<style scoped></style>
