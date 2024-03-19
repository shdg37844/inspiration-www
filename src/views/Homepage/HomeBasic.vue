<script setup>
import { RouterView } from 'vue-router'
import BasicLayoutSider from '@/components/Layout/BasicLayoutSider.vue'
</script>

<template>
    <div class="body-wrapper">
        <div class="body-sider">
            <BasicLayoutSider class="body-sider" />
        </div>
        <div class="body-content-box">
            <router-view></router-view>
        </div>
    </div>

</template>

<style type="text/css" lang="less" scoped>
.body-wrapper {
    display: flex;
}
</style>
    
    
    
    
    
    
    
    
    
    