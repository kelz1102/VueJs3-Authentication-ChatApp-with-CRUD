<template>
  <footer
    class="fixed w-screen bottom-0 md:h-16 md:flex md:justify-evenly shadow-lg"
    :class="
      $store.state.authUser.dark_mode == 1
        ? 'dark-mode text-gray-100 border-t-4 border-black'
        : 'bg-white text-gray-500 border-t-2 border-gray-100'
    "
  >
    <div class="md:mb-2 flex items-center md:my-2 md:mt-5">
      <div class="md:my-2 flex items-center">
        <i class="fa-brands fa-facebook text-2xl"></i>
      </div>
      <div class="ml-2">
        -
        <span> facebook.com/michaeldave22 </span>
      </div>
    </div>
    <div class="md:my-2 flex items-center">
      <div>
        <i class="fa-brands fa-github text-2xl"></i>
      </div>
      <div class="ml-2">
        -
        <span> github.com/kelz1102 </span>
      </div>
    </div>

    <div class="md:my-2 flex items-center">
      <div>
        <i class="fa-brands fa-instagram text-2xl"></i>
      </div>
      <div class="ml-2">
        -
        <span> instagram.com/chael1102/ </span>
      </div>
    </div>
    <div class="md:my-2 flex items-center">
      <div>
        <i class="fa-brands fa-skype text-2xl"></i>
      </div>
      <div class="ml-2">
        -
        <span> live:.cid.9af9f6e0f549bf17 </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.dark-mode {
  background-color: #121212;
}
</style>
