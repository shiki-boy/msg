<script setup>
import { inject, ref } from "vue";

import { useAuthStore } from "../../stores/auth";
import { useChatStore } from "../../stores/chat";

const socket = inject("socket");

const chatStore = useChatStore();

const { user } = useAuthStore();
const authorId = user._id;

const message = ref("");

const sendMessage = () => {
  if (!message.value || !chatStore.selectedChannel) return;

  socket.emit("send-message", {
    message: message.value,
    channelId: chatStore.selectedChannel._id,
    authorId,
  });

  chatStore.addNewMessage({
    text: message.value,
    author: user,
    createdAt: new Date().toISOString(),
  });

  message.value = "";
};
</script>

<template>
  <div class="send-message">
    <input
      type="text"
      v-model="message"
      class="input"
      placeholder="Start typing..."
      autocomplete="off"
      @keyup.enter="sendMessage"
    />
    <input class="send-btn" value="Send" type="submit" @click="sendMessage" />
  </div>
</template>

<style scoped>
.send-message {
  position: sticky;
  bottom: 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  z-index: 10;
}

.input {
  flex: 1;
  min-height: 50px;
  padding: 0 1rem;
  color: #fff;
  font-size: 15px;
  border: 1px solid #5e4dcd;
  border-radius: 6px 0 0 6px;
  background-color: var(--color-background);
}

.send-btn {
  min-height: 50px;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: #5e4dcd;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.send-btn:hover {
  background-color: #5e5dcd;
}

.input:focus,
.input:focus-visible {
  border-color: #3898ec;
  outline: none;
}
</style>
