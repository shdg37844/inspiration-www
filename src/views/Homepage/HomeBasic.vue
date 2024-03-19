<script setup>
import { ref } from 'vue'

async function fetchClassify() {

}
fetchClassify();

</script>

<template>
    <div class="body-wrapper">
        <div class="body-sider">
            <div class="nav-box">
                <div class="nav-content-title">风格</div>
                <div class="nav-items" v-for="">
                    <div class="nav-item" shadow="hover">{{  }}</div>
                </div>
            </div>
            <div class="nav-box">
                <div class="nav-content-title">空间</div>
                <div class="nav-items"></div>
            </div>
        </div>

        <div class="body-content-box">
            
        </div>
    </div>

</template>

<style type="text/css" lang="less" scoped>
.body-wrapper {
    display: flex;

    .body-sider {
        display: flex;
        flex-direction: column;
        gap:40px;
        padding:20px;
        border-right:1px solid #efefef;

        .nav-box {
            .nav-content-title {
                margin-bottom: 20px;
                font-weight: 600;
                font-size: 24px;
            }
            .nav-item {
                display: flex;
                align-items: center;
                padding:8px 15px;
                height:36px;
                border:1px solid #efefef;
            }
        }
    }
}
</style>
    
    
    
    
    
    
    
    
    
    