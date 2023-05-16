<template>
  <div
    v-show="$store.state.toggleSearchShow"
    class="h-fit py-6 flex justify-center"
  >
    <ul class="w-10/12">
      <span
        :class="
          authUser.dark_mode == 1
            ? 'text-gray-100'
            : 'text-gray-500 font-semibold tracking-wider uppercase text-xs'
        "
        >Searched</span
      >
      <hr class="border-gray-200" />
      <br />
      <li
        v-for="user in searchedUser"
        :key="user.id"
        class="cursor-pointer"
        :class="
          authUser.dark_mode == 1
            ? ' hover:py-1 hover:px-4 '
            : 'hover:bg-gray-100 hover:rounded-full hover:py-1 hover:px-4 '
        "
        @click="userChat(user.id), ($store.state.toggleSearchShow = false)"
      >
        <div>
          <span
            class="cursor-pointer bg-red-500 text-white dot text-cente my-2"
            v-if="authUser.email != user.email"
          >
            {{ user.name.charAt(0) }}
          </span>
          <span
            v-show="authUser.email != user.email"
            class="ml-2"
            :class="authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-500'"
          >
            {{ user.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["authUser", "searchedShow", "searchedUser"]),
  },
  methods: {
    userChat(id) {
      axios
        .post(`http://chat-app-api.test/api/chat`, {
          chat_id: id,
        })
        .then((response) => {
          this.$store.dispatch("fetchChatUser", id);
          this.$store.state.toggleDeleteModal = false;
        })
        .catch((error) => {
          if (error.response.status == 409) {
            this.$store.dispatch("fetchChatUser", id);
            this.$store.state.toggleDeleteModal = false;
          } else if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
  },
};
</script>

<style scoped>
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
}
</style>
