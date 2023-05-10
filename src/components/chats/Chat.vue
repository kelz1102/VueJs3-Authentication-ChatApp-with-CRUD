<template>
  <main
    class="grow lg:block relative main-mobile-h"
    :class="authUser.dark_mode == 1 ? 'dark-mode-main text-white' : ''"
  >
    <header
      class="flex justify-between py-4 px-2 bg-white rounded-md drop-shadow-sm"
      :class="
        authUser.dark_mode == 1
          ? 'dark-mode text-gray-100 border-none'
          : 'text-gray-700'
      "
    >
      <div>
        <div class="flex items-center">
          <div v-if="chatUser.name != null">
            <span
              class="ml-2 text-lg tracking-wides font-bold"
              :class="
                authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-500'
              "
              >{{ chatUser.name }}</span
            >
            <span
              v-show="chatUser.active_status == 1"
              class="text-xs ml-2 tracking-wider text-green-600"
              >Online</span
            >
            <span
              v-show="chatUser.active_status == 0"
              class="text-xs ml-1.5 tracking-wider text-gray-600"
              >Offline</span
            >
          </div>
          <div v-else>
            <span
              class="ml-1 text-sm tracking-widest font-bold uppercase"
              :class="
                authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-500'
              "
              >Chats Messenger</span
            >
          </div>
        </div>
      </div>
      <div class="text-xl text-blue-500 cursor-pointer hover:text-blue-400">
        <i
          class="fa-solid fa-circle-info"
          @click="$store.state.toggleRightNav = !$store.state.toggleRightNav"
        ></i>
      </div>
    </header>
    <div
      class="overflow-y-auto chat-container-mobile chat-container scrollbar-hide flex flex-col-reverse"
    >
      <MessageContainer />
    </div>
    <div
      v-show="chatUser != false"
      class="h-12 w-full absolute bottom-0 flex items-center rounded-lg shadow-mg"
      :class="authUser.dark_mode == 1 ? 'dark-mode' : 'bg-white'"
    >
      <div class="file-input">
        <input type="file" id="file-input" name="file-input" />
        <label for="file-input">
          <i
            class="fa-solid fa-circle-plus text-xl mt-1 ml-3 cursor-pointer"
            :class="authUser.dark_mode == 1 ? 'text-gray-400' : ''"
          ></i>
        </label>
      </div>
      <input
        type="text"
        class="w-full p-1 focus:outline-none mx-2"
        v-model="message"
        @keyup.enter="sendMessage"
        :class="authUser.dark_mode == 1 ? 'dark-mode' : 'bg-white'"
        placeholder="Type message.."
      />
      <i
        class="fa-solid fa-paper-plane text-xl text-blue-500 mr-4 cursor-pointer"
        @click="sendMessage"
      ></i>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import MessageContainer from "./MessageContainer.vue";
import { mapState } from "vuex";

export default {
  components: {
    MessageContainer,
  },
  data() {
    return {
      message: "",
      scrollBarShow: true,
    };
  },
  computed: {
    ...mapState(["chatUser", "authUser"]),
  },
  methods: {
    sendMessage() {
      axios
        .post(`http://chat-app-api.test/api/message/${this.chatUser.id}`, {
          message: this.message,
        })
        .then((response) => {
          this.$store.dispatch("fetcHasMessages");
          this.$store.dispatch("fetchUsersMessages", this.chatUser.id);
          this.message = "";
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #121212;
}
.dark-mode-main {
  background-color: #202020;
}
.file-input {
  position: relative;
}

.file-input input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.chat-container {
  height: 45.5rem;
}
@media (max-width: 500px) {
  .chat-container-mobile {
    height: 335px;
  }
}
@media (max-width: 500px) {
  .main-mobile-h {
    height: 443px;
  }
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
