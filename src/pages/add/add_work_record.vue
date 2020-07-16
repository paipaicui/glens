<template>
    <div>
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title:'新增销售任务-工作记录'
            }
        },
          methods: {

  }
    }
</script>

<style scoped>

</style>