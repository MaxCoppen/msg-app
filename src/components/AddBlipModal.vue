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
            Start a chat
          </h1>
          <p class="text-gray-300">Expand your network by adding friends</p>
        </div>
        <!-- sign-in -->
        <div class="m-6">
          <form class="mb-4">
            <div class="mb-6">
              <label
                for="code"
                class="block mb-2 text-sm text-gray-200"
                >Friend Code</label
              >
              <input
                type="code"
                name="code"
                v-model="code"
                placeholder="The invite code of your friend"
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
              <button type="button" :filled="isFilled" class="add-button w-full px-1 py-2 focus:outline-none" @click="AddFriend()">Start a chat</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddBlipModal',

  data() {
    return {
      code: '',
    }
  },

  computed: {
    isFilled(): boolean {
      return this.code.length >= 8;
    }
  },

  methods: {
    AddFriend() {
      (global as any).user.initConnection(this.code);
      this.$router.push("/chat");
    }
  }
});
</script>

<style lang="scss" scoped>

.body {
  position: fixed;
  top: -50px;
  left: 0;
  width: 100%;
  height: 100%;

  .add-button {
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
