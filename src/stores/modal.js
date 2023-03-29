import { defineStore } from "pinia";

const initState = {
  isOpen: false,
  modalView: null,
};

export const useModalStore = defineStore("modal", {
  state: () => initState,

  actions: {
    openModal({ modalView }) {
      this.isOpen = true;
      this.modalView = modalView;
    },

    closeModal() {
      this.isOpen = false;
      this.modalView = null
    },
  },
});
