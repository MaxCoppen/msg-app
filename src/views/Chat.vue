<template>
  <div class="chat" v-if="peer">

    <div class="header bg-gray-750">
      <div class="user">
        <div class="avatar bg-gray-600"></div>
        <div class="username text-gray-300">{{peer.username}}</div>
      </div>
      
      <div class="actions text-gray-200">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </div>
    </div>

    <div class="body">
      <ChatFeed />
    </div>

    <div class="chat-footer bg-gray-700">
      <div class="input bg-gray-650 text-gray-400">

        <div class="upload border-r border-gray-600 hover:border-gray-500 hover:bg-gray-600 hover:text-gray-150">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
        </div>
        
        <input type="text" class="text-gray-50" v-model="msg">

        <div class="send border-l border-gray-600 hover:border-gray-500 hover:bg-gray-600 hover:text-gray-150" @click="SendMsg()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatFeed from '@/components/chat/Feed.vue';
import { ipcRenderer } from 'electron';

export default defineComponent({
  name: 'Chat',

  components: { ChatFeed },

  data() {
    return {
      peer: (global as any).peer,
      msg: ''
    }
  },

  mounted() {
    ipcRenderer.on('connected', (_, peer) => {
      this.peer = peer;
    });
  },

  methods: {
    SendMsg() {
      // Send the data to the peer.
      (global as any).user.sender.sendData(this.msg);
      // Pretend we also got the message.
      ipcRenderer.send('recieved', this.msg, (global as any).user.username);
      this.msg = '';
    }
  }
})
</script>


<style lang="scss" scoped>

.chat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    .user {
      width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;

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
    }
    
    .actions {
      width: fit-content;
      height: 100%;
      display: flex;
      float: right;
      align-items: center;
      padding-right: 1.5px;

      svg {
        margin-left: 22px;
      }
    }
  }

  .body {
    flex-grow: 1;
  }

  .chat-footer {
    height: 60px;
    padding: 10px;

    .input {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;

      border-radius: 6px;

      .upload {
        width: 40px;
        height: 40px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
          margin: 10px;
        }
      }

      input {
        flex-grow: 1;

        outline: none !important;
        background: transparent !important;
        padding: 10px;
      }

      .send {
        width: 40px;
        height: 40px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
          margin: 10px;
        }
      }
    }
  }
}

</style>