<script setup>
import { inject } from "vue";
import ChatBubble from "../components/views/ChatBubble.vue";
import { useAuthStore } from "../stores/auth";
import { useChatStore } from "../stores/chat";

const chatStore = useChatStore();
const authStore = useAuthStore();
const socket = inject("socket");

socket.on("new-message", (data) => {
  chatStore.addNewMessage(data);
});

const formatChannelTitle = (title) => {
  return title.split("_").filter((name) => name !== authStore.user.fullName)[0];
};

const isMine = (message) => {
  return authStore.user._id === message.author._id;
};
</script>

<template>
  <div class="chat" v-if="!!chatStore.selectedChannel">
    <header>
      <h4>{{ formatChannelTitle(chatStore.selectedChannel.title) }}</h4>
    </header>

    <div class="chat-messages">
      <template v-for="(message, index) in chatStore.messages" :key="index">
        <ChatBubble
          :text="message.text"
          :is-mine="isMine(message)"
          :createdAt="message.createdAt"
        />
      </template>
    </div>
  </div>
  <div class="empty" v-else>
    <h3>Select a channel</h3>
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
}

.chat-messages {
  display: flex;
  flex-direction: column-reverse;
  height: calc(100vh - 145px);
  overflow-y: auto;
  padding-right: 10px;
}

.empty {
  text-align: center;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
