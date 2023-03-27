import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({messages: [{text: 'Hello', isMine: true}]}),

  actions: {
    addNewMessage( msg ) {
      this.messages = [msg, ...this.messages]
    }
  }
})