<script setup>
import { inject, markRaw, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useChatStore } from "../../stores/chat";
import { useModalStore } from "../../stores/modal";
import AddChannelModal from "./AddChannelModal.vue";

const chatStore = useChatStore();
const authStore = useAuthStore();
const { openModal } = useModalStore();
const router = useRouter();

const socket = inject("socket");
const showUserMenu = ref(false);

onMounted(async () => {
  const channels = await chatStore.addChannels();

  socket.emit(
    "join",
    channels.map((ch) => ch._id)
  );
});

const formatChannelTitle = (title) => {
  return title
    .split("_")
    .filter((name) => name !== authStore.user.fullName)[0]
    .split(" ")
    .map((name) => name[0])
    .join(" ");
};

const handleShowUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const logout = async () => {
  await authStore.logout();

  chatStore.$reset();

  router.push("/login");
};

const handleAdd = () => {
  openModal({
    modalView: markRaw(AddChannelModal),
  });
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

      <div class="add-channel" @click="handleAdd">+</div>
    </nav>

    <div class="user" @click="handleShowUserMenu">
      {{ `${authStore.user.firstName[0]} ${authStore.user.lastName[0]}` }}

      <ul class="user-menu" v-show="showUserMenu">
        <li @click.stop="logout">Logout</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 50px;
  background-color: #2e283f;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.channel,
.user,
.add-channel {
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

.channel:hover,
.user:hover,
.add-channel:hover {
  scale: 1.03;
  box-shadow: 1px 1px 8px rgba(172, 255, 47, 0.5);
}

.user {
  background-color: blueviolet;
  margin: 30px auto;
  position: relative;
}

.user-menu {
  position: absolute;
  background-color: beige;
  color: black;
  left: 0px;
  bottom: 50px;
  z-index: 11;
  list-style-type: none;
  padding: 10px;
  border-radius: 8px;
  text-transform: capitalize;
}

.user-menu:hover {
  background-color: beige;
}

.add-channel {
  background-color: coral;
  font-size: 20px;
  /* color: black; */
  font-weight: 500;
}
</style>
