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

    async addChannels(channels = []) {
      const { data } = await httpClient.get("/api/auth/channels");

      this.channels = [...this.channels, ...data?.channels ?? [],  ...channels];

      return this.channels
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
