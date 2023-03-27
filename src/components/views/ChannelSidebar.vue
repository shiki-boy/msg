<script setup>
import { onMounted } from "vue";
import httpClient from "../../httpClient";
import { useAuthStore } from "../../stores/auth";
import { useChatStore } from "../../stores/chat";

const chatStore = useChatStore();
const authStore = useAuthStore();

onMounted(async () => {
  const { data } = await httpClient.get("/api/auth/channels");

  chatStore.addChannels(data.channels);
});

const formatChannelTitle = (title) => {
  return title
    .split("_")
    .filter((name) => name !== authStore.user.fullName)[0]
    .split(" ")
    .map((name) => name[0])
    .join(" ");
};
</script>

<template>
  <aside class="sidebar">
    <nav>
      <div
        v-for="channel in chatStore.channels"
        :key="channel._id"
        class="channel"
        @click="chatStore.selectChannel(channel)"
      >
        {{ formatChannelTitle(channel.title) }}
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 50px;
  background-color: #2e283f;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.channel {
  background-color: crimson;
  color: whitesmoke;
  font-size: 14px;
  border-radius: 50%;
  font-weight: bold;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  text-transform: uppercase;
}

.channel:hover {
  scale: 1.03;
  box-shadow: 1px 1px 8px rgba(172, 255, 47, 0.5);
}
</style>
