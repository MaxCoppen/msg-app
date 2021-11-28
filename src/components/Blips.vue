<template>
  <div class="blips bg-gray-750">
    <!-- <Blip />
    <Blip :ping="true" />
    <Blip />
    <Blip /> -->
    <div class="add-blip" @click="addmodal = !addmodal">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 23.5 23.5" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </div>
    <!-- <div class="separator bg-gray-700"></div>
    <Blip :user="true" :ping="true" />
    <Blip :user="true" /> -->
    <AddBlipModal v-show="addmodal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Blip from "./Blip.vue";
import AddBlipModal from "./AddBlipModal.vue";

export default defineComponent({
  name: "Blips",

  components: { Blip, AddBlipModal },

  data() {
      return {
          addmodal: false
      }
  },
});
</script>

<style lang="scss" scoped>
.blips {
  flex-grow: 1;
  display: flex;
  padding-left: 4px;

  .separator {
    width: 1px;
    height: calc(100% - 16px);
    margin: 8px;
  }

  .add-blip {
    margin: 8px 4px 8px 4px;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(79, 226, 104, .4);

    &:hover {
        color: rgba(79, 226, 104, .8);

        &::before {
            border: rgba(79, 226, 104, .6) 2px solid;
        }
    }

    &::before {
      content: "";
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 8px;
      border: rgba(79, 226, 104, .2) 2px solid;
    }
  }
}
</style>