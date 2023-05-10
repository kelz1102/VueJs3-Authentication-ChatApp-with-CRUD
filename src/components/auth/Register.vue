<template>
  <div
    class="flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100 h-122 lg:my-32 lg:pt-6"
  >
    <div
      class="w-full sm:max-w-md px-6 py-4 my-2 bg-white shadow-md overflow-hidden sm:rounded-lg lg:mt-6"
    >
      <div class="mb-4" v-show="alreadyTaken">
        <div class="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>

        <ul class="mt-3 list-inside text-sm text-red-600">
          <li class="ml-1.5">The email has already been taken</li>
        </ul>
      </div>
      <div class="mb-4" v-show="emptyField">
        <div class="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>
        <ul class="mt-3 list-inside text-sm text-red-600">
          <li class="ml-1.5">Please fill out empty fields.</li>
        </ul>
      </div>
      <div class="mb-4" v-show="minPass">
        <div class="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>
        <ul class="mt-3 list-inside text-sm text-red-600">
          <li class="ml-1.5">Password must be atleast 6 characters.</li>
        </ul>
      </div>
      <form @submit.prevent="submitForm">
        <div class="py-5">
          <h1
            class="text-xl uppercase font-bold text-center tracking-widest text-gray-500"
          >
            Register
          </h1>
        </div>
        <div class="mt-4">
          <label
            class="block font-medium text-sm text-gray-700 tracking-wide"
            for="name"
          >
            Name
          </label>
          <input
            class="border-gray-400 border-2 p-2 focus:outline-blue-500 rounded-md block w-full"
            id="name"
            type="name"
            name="name"
            required="required"
            autofocus="autofocus"
            autocomplete="username"
            v-model="formValues.name"
          />
        </div>

        <div class="mt-4">
          <label
            class="block font-medium text-sm text-gray-700 tracking-wide"
            for="email"
          >
            Email
          </label>
          <input
            class="border-gray-400 border-2 p-2 focus:outline-blue-500 rounded-md block w-full"
            id="email"
            type="email"
            name="email"
            required="required"
            autofocus="autofocus"
            autocomplete="username"
            v-model="formValues.email"
          />
        </div>

        <div class="mt-4">
          <label
            class="block font-medium text-sm text-gray-700 tracking-wide"
            for="password"
          >
            Password
          </label>
          <input
            class="border-gray-400 border-2 p-2 focus:outline-blue-500 rounded-md block w-full"
            id="password"
            type="password"
            name="password"
            required="required"
            minlength="6"
            autocomplete="current-password"
            v-model="formValues.password"
          />
        </div>

        <div class="flex items-center justify-end mt-4">
          <router-link
            to="/login"
            class="underline text-sm mr-2 text-gray-600 hover:text-gray-900 rounded-md"
          >
            Already registered?
          </router-link>

          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formValues: {
        name: "",
        email: "",
        password: "",
      },
      alreadyTaken: false,
      emptyField: false,
      minPass: false,
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://chat-app-api.test/api/register", this.formValues)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((err) => {
          if (
            this.formValues.name == "" ||
            this.formValues.email == "" ||
            this.formValues.password == ""
          ) {
            this.emptyField = true;
            setTimeout(() => {
              this.emptyField = false;
            }, 3000);
          } else if (this.formValues.password.length < 6) {
            this.minPass = true;
            setTimeout(() => {
              this.minPass = false;
            }, 3000);
          } else if (err.response.status == 422) {
            this.alreadyTaken = true;
            setTimeout(() => {
              this.alreadyTaken = false;
            }, 3000);
          }
        });
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .h-122 {
    height: 31.5rem;
  }
}
</style>
