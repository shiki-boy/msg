<script setup>
import ChatBubble from '../components/views/ChatBubble.vue';

</script>

<template>
  <div class="chat">
    <ChatBubble text="Hello world" />
    <ChatBubble text="Yo" :is-mine="true" />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  height: 100vh;
}
.bubble{
  width: max-content;
  background-color: #364151;
  padding: 8px 15px;
  margin: 10px 0;
  border-radius: 15px 15px 0 15px;
}

.bubble.mine {
  align-self: flex-end;
  background-color: #125e59;
}
</style>