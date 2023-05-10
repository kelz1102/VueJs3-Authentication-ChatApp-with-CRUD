<template>
  <nav
    class="h-full w-96 overflow-auto"
    :class="
      authUser.dark_mode == 1
        ? 'dark-mode text-white'
        : 'bg-white border-r-2 border-gray-200'
    "
  >
    <SearchUser />
    <SearchUserMessages />
    <SearchUserResult />
  </nav>
</template>

<script>
import { mapState } from "vuex";
import SearchUser from "./SearchUser.vue";
import SearchUserMessages from "./SearchUserMessages.vue";
import SearchUserResult from "./SearchUserResult.vue";

export default {
  components: {
    SearchUser,
    SearchUserMessages,
    SearchUserResult,
  },
  computed: {
    ...mapState(["authUser"]),
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #121212;
}
</style>
