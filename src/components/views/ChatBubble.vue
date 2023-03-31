<script setup>
import { format } from "date-fns";

defineProps({
  isMine: Boolean,
  text: String,
  createdAt: String,
});

const formatDateTime = (dateString) => {
  return format(new Date(dateString), "h:mm a");
};
</script>

<template>
  <div
    :class="{ bubble: true, mine: isMine }"
    :data-timestamp="formatDateTime(createdAt)"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.bubble {
  width: max-content;
  background-color: #364151;
  padding: 8px 15px;
  margin: 20px 0;
  border-radius: 15px 15px 15px 0px;
}

.bubble::before {
  content: attr(data-timestamp);
  position: absolute;
  top: -24px;
  width: max-content;
  font-size: 11px;
  left: 5px;
}

.bubble.mine::before {
  left: -8px;
}

.bubble.mine {
  align-self: flex-end;
  border-radius: 15px 15px 0 15px;
  background-color: #5e4dcd;
  color: white;
}
</style>
