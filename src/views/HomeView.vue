<script setup>
import { inject } from 'vue';
import ChatBubble from '../components/views/ChatBubble.vue';
import { useChatStore } from '../stores/chat';

const chatStore = useChatStore()

const socket = inject('socket')

socket.on('new-message', (data) => {
  chatStore.addNewMessage(data)
})

</script>

<template>
  <div class="chat">
    <header>
      <h4>John Doe</h4>
    </header>

    <div class="chat-messages">
      <template v-for="(message, index) in chatStore.messages" :key="index">
        <ChatBubble :text="message.text" :is-mine="!!message.isMine"  />
      </template>
    </div>
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
}
</style>