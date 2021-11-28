<template>
  <div class="feed">
    <div
      class="item border-gray-650 text-gray-400"
      v-for="(item, index) in content"
      :key="index"
      :first="IsFirst(index)"
      :style="{'--content': `'${item.time}'`}"
    >
      <div class="user">
        <div class="avatar border border-gray-650 bg-gray-600"></div>
        <div class="username text-gray-150">
          {{ item.user }}
        </div>
      </div>

      <div class="content text-gray-50">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatFeed",

  data() {
    return {
      content: [
        { user: "User 1", time: "19:30", content: "Hello, how are you?" },
        { user: "User 2", time: "19:35", content: "I am great." },
        { user: "User 2", time: "19:36", content: "How about you?" },
        {
          user: "User 1",
          time: "19:40",
          content: "I am great to, thanks for asking.",
        },
      ],
    }
  },

  mounted() {
    this.content = [];

    ipcRenderer.on('recieved', (_, msg, sender) => {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      this.content.push({ user: sender, time, content: msg });
    });
  },

  methods: {
    /** Check if item is the first in its sequence. */
    IsFirst(index: number): boolean {
      return (
        index == 0 || this.content[index].user != this.content[index - 1].user
      );
    },
    /** Check if item is the last in its sequence. */
    IsLast(index: number): boolean {
      return (
        index != this.content.length - 1 &&
        this.content[index].user != this.content[index + 1].user
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.feed {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .item {
    width: 100%;
    height: 20px;
    margin-top: 4px;

    display: flex;
    flex-direction: row;
    align-items: center;

    .user {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: fit-content;
      height: 20px;

      .avatar {
        width: 20px;
        height: 20px;

        border-radius: 3px;
      }

      .username {
        width: fit-content;
        min-width: 60px;
        margin-left: 5px;
        height: 10px;
        display: flex;
        align-items: center;
      }

      opacity: 0;
    }

    &[first="true"] {
        margin-top: 20px;
      
      position: relative;

      .user {
          opacity: 1;
      }

      &::before {
        content: " ";
        position: absolute;
        top: -11px;
        right: 0;
        width: calc(100% - 30px);
        height: 1px;
        border-bottom: 1px solid;
        border-color: inherit;
      }

      &::after {
        content: var(--content);
        position: absolute;
        top: -11px;
        left: 0;
        width: 100%;
        height: 1px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 10px;
        color: inherit;
      }
    }

    .content {
      flex-grow: 1;
      height: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>