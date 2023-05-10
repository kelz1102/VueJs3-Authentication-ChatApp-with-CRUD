<template>
  <nav class="p-4 flex justify-between items-center">
    <p :class="authUser.dark_mode == 1 ? 'text-gray-100' : 'text-gray-700'">
      User Details
    </p>
    <i
      class="fa-solid fa-x text-blue-500 cursor-pointer"
      @click="$store.state.toggleRightNav = !$store.state.toggleRightNav"
    ></i>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["authUser"]),
  },
};
</script>
