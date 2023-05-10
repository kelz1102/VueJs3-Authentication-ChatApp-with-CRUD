<template>
  <div v-if="isPageLoading" class="fixed inset-0 z-50 bg-white">
    <div class="loading-spinner w-32 h-32 mx-auto my-96"></div>
  </div>
  <div
    v-else
    v-show="$store.state.toggleRightNav"
    class="messenger-infoView app-scroll bg-white w-96 userdetail-mobile"
    :class="
      authUser.dark_mode == 1
        ? 'dark-mode border-none text-gray-100'
        : 'border-l-2 border-gray-200'
    "
  >
    <UserDeletionModal />
    <UserDetail />
    <UserDetailResult />
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue";
import UserDeletionModal from "./UserDeletionModal.vue";
import UserDetailResult from "./UserDetailResult.vue";
import { mapState } from "vuex";

export default {
  components: {
    UserDetail,
    UserDeletionModal,
    UserDetailResult,
  },
  computed: {
    ...mapState(["authUser", "isPageLoading"]),
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
@media (max-width: 500px) {
  .userdetail-mobile {
    height: 443px;
  }
}
</style>
