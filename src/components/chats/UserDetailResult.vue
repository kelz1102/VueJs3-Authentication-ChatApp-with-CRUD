<template>
  <div v-if="chatUser.name == null">
    <div
      class="avatar av-l chatify-d-flex mx-auto mt-7"
      :class="
        authUser.dark_mode == 1 ? 'dark-mode-main border-none' : 'bg-gray-200'
      "
    ></div>
    <p
      class="info-name mt-4 text-center text-md uppercase font-bold tracking-wider"
      :class="authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-500 '"
    >
      Chats Messenger
    </p>
  </div>
  <div v-else>
    <div
      class="avatar av-l chatify-d-flex mx-auto mt-7 flex items-center justify-center text-4xl bg-red-500 text-gray-100 uppercase"
      :class="authUser.dark_mode == 1 ? ' border-none ' : ''"
    >
      {{ chatUser.name.charAt(0) }}
    </div>
    <p
      class="info-name mt-4 text-center text-xl uppercase font-bold tracking-wide"
      :class="authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-500'"
    >
      {{ chatUser.name }}
    </p>
    <div v-show="chatUser.name" class="text-center mt-3">
      <button
        @click="$store.state.toggleDeleteModal = true"
        class="text-red-500"
      >
        Delete Conversation
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["authUser", "chatUser"]),
  },
};
</script>
<style scoped>
.av-l {
  width: 100px;
  height: 100px;
}
.avatar {
  text-align: center;
  border-radius: 100%;
  overflow: hidden;
}
.chatify-d-flex {
  display: flex !important;
}
.w-custom {
  width: 450px;
}
.dark-mode-main {
  background-color: #202020;
}
</style>
