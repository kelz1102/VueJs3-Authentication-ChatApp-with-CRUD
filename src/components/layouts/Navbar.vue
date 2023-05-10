<template>
  <nav
    class="flex justify-between items-center h-16 shadow-sm text-gray-500 relative"
    :class="
      authUser.dark_mode == 1
        ? 'dark-mode text-gray-100 border-b-4 border-black'
        : 'bg-white border-b-2 border-gray-100'
    "
  >
    <div class="ml-3 font-thin text-md">
      <div v-if="!authenticated">
        <router-link to="/">Michael Dave Sila</router-link>
      </div>
      <div v-else>
        <button
          @click="toggleDark"
          data-tooltip-target="navbar-cta-example-toggle-dark-mode-tooltip"
          type="button"
          data-toggle-dark="light"
          class="flex items-center p-1.5 mr-2 text-xs text-gray-700 bg-white border-2 border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            aria-hidden="true"
            data-toggle-icon="moon"
            class="w-4 h-4"
            :class="authUser.dark_mode == 1 ? 'hidden' : ''"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            data-toggle-icon="sun"
            class="w-4 h-4"
            :class="authUser.dark_mode == 1 ? '' : 'hidden'"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mr-4">
      <div v-if="!authenticated">
        <router-link
          class="mr-2 font-thin text-md hover:underline hover:underline-offset-4"
          to="/login"
          >Login</router-link
        >
        <router-link
          class="font-thin text-md hover:underline hover:underline-offset-4"
          to="/register"
          >Register</router-link
        >
      </div>
      <div v-else :class="authUser.dark_mode == 1 ? 'text-gray-100' : ''">
        <router-link to="/dashboard" class="mr-4">
          <span
            class="font-thin text-md hover:underline hover:underline-offset-4"
            >Dashboard</span
          >
        </router-link>
        <router-link to="/chats" class="mr-4">
          <span
            class="font-thin text-md hover:underline hover:underline-offset-4"
            >Chats</span
          >
        </router-link>
        <span
          class="cursor-pointer bg-red-500 text-white dot text-center hover:bg-red-400"
          @click="isShow = !isShow"
          v-if="authUser.name"
        >
          {{ authUser.name.charAt(0) }}
        </span>
      </div>
      <div
        v-show="isShow"
        class="absolute z-50 mt-2 w-44 rounded-md shadow-lg origin-top-right right-0"
      >
        <div class="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">
          <div class="block px-4 py-2 text-xs text-gray-400">
            Manage Account
          </div>

          <a
            class="block cursor-pointer w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >{{ authUser.name }}</a
          >
          <div class="border-t border-gray-200"></div>
          <button
            class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            @click="logOut"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState(["authenticated", "authUser"]),
  },
  methods: {
    logOut() {
      axios
        .post("http://chat-app-api.test/api/logout")
        .then((response) => {
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
    toggleDark() {
      if (this.authUser.dark_mode == 0) {
        axios
          .put(`http://chat-app-api.test/api/dark/${this.authUser.id}`, {
            dark_mode: 1,
          })
          .then((res) => {
            this.$store.commit("setUser", res.data.user);
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }
          });
      } else if (this.authUser.dark_mode == 1)
        axios
          .put(`http://chat-app-api.test/api/dark/${this.authUser.id}`, {
            dark_mode: 0,
          })
          .then((res) => {
            this.$store.commit("setUser", res.data.user);
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
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
}
.dark-mode {
  background-color: #121212;
}
</style>
