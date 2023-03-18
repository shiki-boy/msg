<script setup>
import ChatBubble from '../components/views/ChatBubble.vue';

</script>

<template>
  <div class="chat">
    <header>
      <h4>John Doe</h4>
    </header>

    <div class="chat-messages">
      <ChatBubble text="Hello world" />
      <ChatBubble text="Yo" :is-mine="true" />
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