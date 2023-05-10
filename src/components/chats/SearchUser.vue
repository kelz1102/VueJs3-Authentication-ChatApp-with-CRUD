<template>
  <div class="flex items-center p-4">
    <i class="fa-solid fa-message text-blue-500 text-2xl"></i>
    <span
      class="mx-3 uppercase font-semibold"
      :class="
        authUser.dark_mode == 1
          ? 'text-gray-100'
          : 'text-gray-500 tracking-wider text-xs'
      "
    >
      Chats Messenger
    </span>
  </div>
  <div class="dark:bg-gray-800 w-11/12 mx-auto">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        class="block bg-b w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        :class="authUser == 1 ? 'bg-gray-100' : 'bg-gray-50'"
        placeholder="Search User"
        required
        v-model="query"
        @keyup.enter="search"
        @focus="toggleSearch"
      />
      <button
        @click="search"
        type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      query: "",
      fetchAllChats: [],
    };
  },
  computed: {
    ...mapState(["authUser"]),
  },
  watch: {
    query(newQuery, oldQuery) {
      if (newQuery.length >= 1) {
        this.$store.state.toggleSearchShow = true;
      } else if (newQuery == "") {
        this.$store.state.toggleSearchShow = false;
        this.$store.state.searchedUser = [];
      }
    },
  },
  methods: {
    search() {
      this.$store.dispatch("searchUser", this.query);
    },
    toggleSearch() {
      this.$store.state.toggleSearchShow = true;
      setTimeout(() => {
        this.$store.state.toggleSearchShow = false;
      }, 10000);
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .basis-custom {
    width: 580px;
  }
}
@media (max-width: 500px) {
  .basis-custom-mobile {
    width: 384px;
  }
}
</style>
