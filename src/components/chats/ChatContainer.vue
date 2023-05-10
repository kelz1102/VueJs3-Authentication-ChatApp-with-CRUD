<template>
  <div class="h-96 lg:flex h-122">
    <SearchUserContainer />
    <Chat />
    <UserDetailContainer />
  </div>
</template>

<script>
import SearchUserContainer from "./SearchUserContainer.vue";
import Chat from "./Chat.vue";
import UserDetailContainer from "./UserDetailContainer.vue";

export default {
  components: {
    SearchUserContainer,
    Chat,
    UserDetailContainer,
  },
  created() {
    this.$store.dispatch("fetcHasMessages");
    this.$store.dispatch("fetchUser");
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .h-122 {
    height: 52.6rem;
  }
}
</style>
