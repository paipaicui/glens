<template>
  <div>
    <van-nav-bar :title="title" left-arrow>
      <template #left>
        <span @click="back" class="icon back"></span>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-cell v-for="(item,key) in list" :key="key" @click="getIndex(item)">
        <template #title>
          <div class="fixed">
            <img class="img-icon" v-bind:src="item.image" />
            <span>{{item.text}}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  props: {
    title: {
      type: String,
      default: "search"
    },
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$emit("close");
    },
    getIndex(val){
        this.$emit("choose",val);
    },
  }
};
</script>

<style scoped>
</style>