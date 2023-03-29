<script setup>
import { storeToRefs } from "pinia";
import { useModalStore } from "../stores/modal";

const modalStore = useModalStore();
const { isOpen, modalView } = storeToRefs(modalStore);
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-if="isOpen">
      <div class="modal-content">
        <div class="close-btn" @click="modalStore.closeModal()">close</div>

        <component :is="modalView"></component>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  display: block;
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 12;
  background-color: rgba(33, 36, 37, 0.7) !important;
  backdrop-filter: blur(5px);
}

/* Modal Content */
.modal-content {
  box-shadow: 0px 0px 20px rgba(5, 32, 73, 0.15);
  background-color: #2e283f;
  color: whitesmoke;
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  position: absolute;
  max-height: 90vh;
  overflow-y: auto;
}
.close-btn {
  cursor: pointer;
  float: right;
  z-index: 14;
}

.modal-buttons {
  display: flex;
  gap: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  transform: translateY(0px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
