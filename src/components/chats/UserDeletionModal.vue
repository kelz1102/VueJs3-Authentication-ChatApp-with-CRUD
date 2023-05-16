<template>
  <div
    v-show="$store.state.toggleDeleteModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-80"
  >
    <div
      class="absolute inset-0 w-80 md:w-96 h-60 mx-auto top-72 rounded-2xl md:mt-20 flex flex-col items-center justify-center pop"
      :class="authUser.dark_mode == 1 ? 'dark-mode' : 'bg-white '"
    >
      <h1
        class="mt-5 md:tracking-wider text-lg font-bold"
        :class="
          authUser.dark_mode == 1 ? 'text-gray-100' : 'bg-white text-gray-600'
        "
      >
        Are you sure you want to delete this ?
      </h1>
      <p
        class="text-center text-xs tracking-wider mt-1"
        :class="authUser.dark_mode == 1 ? 'text-gray-100' : 'bg-white '"
      >
        All messages will not be recover once you delete it.
      </p>
      <div class="mt-5">
        <button
          class="bg-blue-600 h-12 w-20 rounded-md py-2 px-4 text-white mr-4 hover:bg-blue-500 font-semibold tracking-widest"
          @click="deleteChat(chatUser.id)"
        >
          Yes
        </button>
        <button
          class="bg-red-600 h-12 w-20 rounded-md py-2 px-4 text-white ml-4 hover:bg-red-500 font-semibold tracking-widest"
          @click="$store.state.toggleDeleteModal = false"
        >
          No
        </button>
      </div>
    </div>
  </div>
  <div
    v-show="successDel"
    class="absolute bottom-0 right-4 w-80 md:w-80 h-20 z-50 rounded-md md:mt-20 flex flex-col items-center justify-center pop-del uppercase"
    :class="authUser.dark_mode == 1 ? 'dark-mode' : 'bg-black bg-opacity-60 '"
  >
    <h1
      class="mt-5 md:tracking-wider text-xs font-bold"
      :class="authUser.dark_mode == 1 ? 'text-green-400' : ' text-green-400'"
    >
      Successful Delete
    </h1>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      successDel: false,
    };
  },
  computed: {
    ...mapState(["authUser", "chatUser"]),
  },
  methods: {
    deleteChat(id) {
      axios
        .delete(`http://chat-app-api.test/api/chat/${id}`)
        .then((response) => {
          this.deleteMessage();
        });
    },
    deleteMessage() {
      axios
        .delete(`http://chat-app-api.test/api/delete/${this.chatUser.id}`)
        .then((response) => {
          this.$store.state.toggleDeleteModal = false;
          this.$store.dispatch("fetchUsersMessages", this.chatUser.id);
          this.$store.dispatch("fetcHasMessages");
          this.successDel = true;
          setTimeout(() => {
            this.successDel = false;
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(0.5, 0.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes pop-del {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.pop {
  animation: pop 0.2s ease-in-out forwards;
}
.pop-del {
  transform-origin: bottom;
  animation: pop-del 0.5s ease-in-out forwards;
}
</style>
