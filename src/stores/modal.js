import { defineStore } from "pinia";

const initState = {
  isOpen: false,
  buttons: [{ label: "", callback: () => {} }],
  modalView: null,
};

export const useModalStore = defineStore("modal", {
  state: () => initState,

  actions: {
    openModal({ modalView, buttons }) {
      this.isOpen = true;
      this.modalView = modalView;
      this.buttons = buttons;
    },

    closeModal() {
      this.isOpen = false;
      this.modalView = null
      this.buttons = []
    },
  },
});
