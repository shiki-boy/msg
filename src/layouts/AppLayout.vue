<script setup>
import { onBeforeMount, provide } from "vue";
import { RouterView, useRouter } from "vue-router";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

import SendMessage from "@/components/views/SendMessage.vue";
import ChannelSidebar from "../components/views/ChannelSidebar.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const socket = io("ws://localhost:8000", {
  auth: {
    token: Cookies.get("refreshToken"),
  },
});

// connection error
socket.on("connect_error", (err) => {
  console.log(err);
  alert("Invalid token to chat");
});

provide("socket", socket);

const router = useRouter();

onBeforeMount(() => {
  authStore.getUserInfo().then((isSuccess) => {
    if (!isSuccess) {
      router.push("/login");
    }
  });
});
</script>

<template>
  <div
    class="app-layout-container"
    v-if="!authStore.isLoading && authStore.isAuthenticated"
  >
    <ChannelSidebar />

    <main>
      <RouterView />

      <SendMessage />
    </main>
  </div>
  <div v-else>Loading...</div>
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
