<template>
  <div class="bay-info">
    <div class="bay-info-main">
      <div>{{ bayNo }}贝</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    bayNo: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style lang="scss" scoped>
.bay-info {
  position: relative;
  width: 100px;
  border: 1px solid #14171c;
  background: linear-gradient(0deg, #1e202a 0%, #0d1013 100%);
  box-shadow: 0px 2px 21px 0px rgb(33 34 39 / 55%);
  border-radius: 4px;
}
.bay-info-main {
  padding: 0 12px;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #505050;
  border-radius: 4px;
  opacity: 0.96;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
