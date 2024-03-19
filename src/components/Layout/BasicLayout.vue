<script setup>
import { RouterView } from 'vue-router'
import BasicLayoutHeader from './BasicLayoutHeader.vue'


</script>

<template>
  <div class="page-wrapper">
    <div class="page-mainer">
      <BasicLayoutHeader class="page-header" />
      <div class="page-body">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-wrapper {
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  .page-body {
    display: flex;
    flex: 1;
    height: 1px;
    background-color: #fff;
  }
  .page-header {
    flex: none;
  }
}
</style>
