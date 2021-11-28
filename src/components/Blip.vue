<template>
  <div class="blip border-gray-750" :style="{'--picture': `url('https://picsum.photos/seed/${Math.random()}/35/35')`}" :ping="ping" :user="user">
    <div class="status" v-if="ping"></div>
    <div class="status-inner" v-if="ping"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Blip",

  props: {
    ping: { type: Boolean, default: false },
    user: { type: Boolean, default: false },
  },
});
</script>

<style lang="scss" scoped>
.blip {
  margin: 8px 4px 8px 4px;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    background: var(--picture);
    background-size: cover;
  }

  &[ping=true] {
    &::before {
      content: "";
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 8px;
      background: var(--picture);
      background-size: cover;
      mask-image: radial-gradient(
        circle 8px at calc(100% - 3px) calc(0% + 3px),
        transparent 8px,
        #000 0
      );
    }
  }

  &[user=true] {
    border-radius: 40%;
    &::before {
      border-radius: 40%;
    }
  }

  .status {
    position: absolute;
    top: 3px;
    right: 3px;
    transform: translate(50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f17c7c;
  }

  .status-inner {
    position: absolute;
    top: 3px;
    right: 3px;
    transform: translate(50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #222222;
  }
}
</style>
