import { defineStore } from "pinia";

import httpClient from "../httpClient";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [],
    channels: [],
    selectedChannel: null,
  }),

  actions: {
    addNewMessage(msg) {
      this.messages = [msg, ...this.messages];
    },

    addChannels(channels = []) {
      this.channels = [...this.channels, ...channels];
    },

    selectChannel(channel) {
      this.selectedChannel = channel;

      this.getMessages(channel._id);
    },

    async getMessages(channelId) {
      const { data } = await httpClient.get(
        `/api/chat/channel/${channelId}/messages`
      );

      this.messages = data;
    },
  },
});
