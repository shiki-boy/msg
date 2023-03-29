<script setup>
import { ref } from "vue";
import TextInput from "../Forms/TextInput.vue";
import AppButton from "../AppButton.vue";
import httpClient from "../../httpClient";
import { useChatStore } from "../../stores/chat";
import { useModalStore } from "../../stores/modal";

const { addChannels } = useChatStore();
const { closeModal } = useModalStore();

const email = ref("");

const handleSubmit = async () => {
  await httpClient.post("/api/auth/friends/add", {
    email: email.value,
  });
  addChannels();
  closeModal();
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      <h1>
        <!-- just add a friend form here -->
        Add Friend
      </h1>
      <TextInput
        label="Friend's email"
        type="email"
        name="email"
        v-model="email"
      />

      <div class="buttons">
        <AppButton label="Add" type="submit" />
        <AppButton label="Cancel" type="button" @click="closeModal()" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
}
.buttons {
  display: flex;
  gap: 20px;
}
</style>
