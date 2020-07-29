<template>
  <div>
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="back" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <div class="page-scroll">
      <van-cell-group>
        <van-cell v-for="(item,key) in list" :key="key" @click="getIndex(item)">
          <template #title>
            <div class="fixed">
              <img v-if="item.image" class="img-icon" v-bind:src="item.image" />
              <span>{{item.text}}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "search",
    },
    list: {
      type: Array,
      default: [],
    },
  },
  mounted() {},
  methods: {
    back() {
      this.$emit("close");
    },
    getIndex(val) {
      this.$emit("choose", val);
    },
  },
};
</script>

<style scoped>
</style>