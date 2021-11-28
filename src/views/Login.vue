<template>
  <div class="body">
    <div class="flex justify-center align-middle min-h-screen">
      <div
        class="
          container
          my-auto
          max-w-md
          p-3
          rounded-2xl
          bg-gray-750
        "
      >
        <!-- header -->
        <div class="text-center my-6">
          <h1 class="text-3xl font-semibold text-gray-100">
            Welcome to the Network
          </h1>
          <p class="text-gray-300">Log in to start chatting</p>
        </div>
        <!-- sign-in -->
        <div class="m-6">
          <form class="mb-4">
            <div class="mb-6">
              <label
                for="username"
                class="block mb-2 text-sm text-gray-200"
                >Username</label
              >
              <input
                type="username"
                name="username"
                v-model="username"
                placeholder="Your username"
                class="
                  w-full
                  px-3
                  py-2
                  bg-gray-700
                  text-gray-100
                  placeholder-gray-300
                  border border-gray-600
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-900
                  focus:border-indigo-600
                "
              />
            </div>
            
            <div class="mb-8">
              <label
                for="ipport"
                class="block mb-2 text-sm text-gray-200"
                >Address Port</label
              >
              <input
                type="ipport"
                name="ipport"
                v-model="ipport"
                placeholder="25256"
                class="
                  w-full
                  px-3
                  py-2
                  bg-gray-700
                  text-gray-100
                  placeholder-gray-300
                  border border-gray-600
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-900
                  focus:border-indigo-600
                "
              />
            </div>

            <div class="mb-6">
              <button type="button" :filled="isFilled" class="login-button w-full px-1 py-2 focus:outline-none" @click="Login()">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import User from "@/core/user";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",

  data() {
    return {
      username: '',
      ipport: '25256'
    }
  },

  computed: {
    isFilled(): boolean {
      const port = Number.parseInt(this.ipport);
      if (isNaN(port) || this.username.length <= 0) return false;
      if (Number.parseInt(this.ipport) < 1 || Number.parseInt(this.ipport) > 65535) return false;
      return true;
    }
  },

  methods: {
    Login() {
      const user = new User(this.username, Number.parseInt(this.ipport));
      (global as any).user = user;
      console.log('Logged in as : ', (global as any).user);
      this.$router.push("/home");
    }
  }
});
</script>

<style lang="scss" scoped>
.body {
  flex-grow: 1;
  z-index: 1;

  .login-button {
    color: #555555;
    background-color: #303030;
    cursor: default;
    border-radius: 6px;

    &[filled=true] {
      color: white;
      cursor: pointer;
      background-color: rgba(99, 102, 241, 1);
      opacity: .75;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
