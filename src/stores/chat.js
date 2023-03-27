import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({ messages: [{ text: "Hello", isMine: true }], channels: [] }),

  actions: {
    addNewMessage(msg) {
      this.messages = [msg, ...this.messages];
    },

    addChannels(channels = []) {
      this.channels = [...this.channels, ...channels];
    },
  },
});
