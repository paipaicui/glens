<template>
  <div id="app">
    <transition :name="transitionName">
      <div>
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>

    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ''
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to);
      if (to.meta.index == 0 || from.meta.index == 0) {
        this.transitionName = '';
      } else if (to.meta.index > from.meta.index) {
        //设置动画名称

        this.transitionName = 'slide-left';
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right';
      }
    }
  }
};
</script>
<style>
@import 'vant/lib/index.css';
@import './assets/style/base.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.1s ease-in;
  position: fixed;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
