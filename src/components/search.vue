<template>
  <div>
    <van-nav-bar :title="title" left-arrow>
      <template #left>
        <span @click="back()" class="icon back"></span>
      </template>
    </van-nav-bar>
    <div class="search-box">
      <span class="searchBig"></span>
      <p class="font9">{{searchTips}}</p>
      <van-search v-model="search" @input="searchKeyWords" placeholder="请输入搜索关键词" />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    };
  },
  props: {
    title: {
      type: String,
      default: 'search'
    },
    searchTips: {
      type: String,
      default: 'searchTips'
    }
  },
  mounted() {
    // if (this.value) {
    //   this.search = this.value;
    // }
  },
  methods: {
    back() {
      this.$emit('close');
    },
    searchKeyWords() {
      this.$emit('input', this.search);
    }
  }
};
</script>

<style>
</style>