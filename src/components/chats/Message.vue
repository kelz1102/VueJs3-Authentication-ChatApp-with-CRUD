<template>
  <li
    v-for="userMessage in userMessages"
    :key="userMessage.id"
    class="list-none mb-2"
  >
    <div
      v-show="userMessage.from_id == authUser.id"
      class="flex justify-end mr-4"
    >
      <div
        class="bg-blue-500 rounded-3xl px-4 py-1 text-white break-words max-w-lg"
      >
        {{ userMessage.message }}
      </div>
      <div></div>
    </div>
    <div
      v-show="userMessage.from_id == chatUser.id"
      class="flex justify-start ml-4"
    >
      <div
        class="text-gray-500 bg-white rounded-3xl px-4 py-1 break-words max-w-lg"
      >
        {{ userMessage.message }}
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["chatUser", "userMessages", "authUser"]),
  },
};
</script>
