<script setup>
import { ref } from 'vue'
import {  PoweroffOutlined, DownOutlined } from '@ant-design/icons-vue'

import { Search } from '@element-plus/icons-vue'
const input = ref('')

</script>

<template>
  <div class="header-section">
    <div class="header-hd">
        <img src="@/assets/images/icons/headerLogo.png"> 
    </div>

    <div class="header-bd">
        <div class="flex gap-4 mb-4">
            <el-input
              v-model="input"
              style="width: 240px"
              placeholder="搜索高质量家居灵感图片"
              :prefix-icon="Search"
            />
        </div>
    </div>

    <div class="header-ft">
        <div class="change-section">
            <div class="home-btn">首页</div>
            <div class="fav-btn">收藏夹</div>
        </div>
        <el-dropdown style="height: 100%">
            <div class="bar-info-container">
              <i class="userInfo-avatar"></i>
              <span class="userInfo-name">ws</span>
              <DownOutlined :style="{ fontSize: '10px', marginLeft: '4px' }" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><PoweroffOutlined :style="{ marginRight: '4px' }" /> 退出 </el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-section {
    position: relative;
    padding: 0 16px;
    height: 54px;
    display: flex;
    z-index: 10;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    
    .header-hd {
      margin-right: 150px;
    }
    .header-bd {
      flex: 1;
    }
}

.header-hd,
.header-bd,
.header-ft {
  display: flex;
  align-items: center;
}

.change-section {
    display: flex;
    gap:30px;
    margin-right: 25px;
}

.bar-info-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    outline: none;
    &:hover {
    background-color: #ecf5ff;
  }
  .userInfo-name {
    font-size: 14px;
    vertical-align: middle;
  }
  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 10px;
  }
}

</style>