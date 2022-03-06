<template>
  <div class="container-panel">
    <div class="container-panel-main">名称: {{ info.nodeName }}</div>
    <div>列号: {{ info.row }}, 层号:{{ info.tier }}, 贝:{{ info.bayNo }}</div>
    <div v-if="info.message">信息: {{ info.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.container-panel {
  border: 1px solid #14171c;
  background: linear-gradient(0deg, #1e202a 0%, #0d1013 100%);
  box-shadow: 0px 2px 21px 0px rgb(33 34 39 / 55%);
  border-radius: 4px;
  color: #fff;
}
.container-panel div {
  line-height: 35px;
  padding: 0 12px;
}
.container-panel-main {
  padding: 0 12px;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #505050;
  border-radius: 4px;
  opacity: 0.96;
}
</style>
