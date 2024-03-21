<script setup>
import { ref } from 'vue'
import inspirationService from '@/services/inspiration'

const styleClassify = ref([]);
const spaceClassify = ref([]);
const pics = ref([]);

async function fetchClassify() {
    try {
        const response = await inspirationService.getClassify();
        spaceClassify.value = response.data.spaceClassify;
        styleClassify.value = response.data.styleClassify;

    } catch(e) {
        console.error(e);
    }
}
fetchClassify();

async function fetchPics() {
    try {
        const response = await inspirationService.getPics();
        pics.value = response.data.images;
        console.log('返回的图片',response.data.images)

    } catch(e) {
        console.error(e);
    }
}
fetchPics();


</script>

<template>
    <div class="body-wrapper">
        <div class="body-sider">
            <div class="nav-box">
                <div class="nav-content-title">风格</div>
                <div class="nav-items">
                    <div class="nav-item" v-for="(style, index) in styleClassify" :key="index">{{ style.name }}</div>
                </div>
            </div>
            <div class="nav-box">
                <div class="nav-content-title">空间</div>
                <div class="nav-items">
                    <div class="nav-item" v-for="(space, index) in spaceClassify" :key="index">{{ space.name }}</div>                
                </div>
            </div>
        </div>

        <div class="body-content-box">
            <div class="pic-box" v-for="(image, index) in pics" :key="index">
                <div class="pic-container">
                    <img :src="image.img_url" alt="Inspiration image">
                </div>
            </div>
        </div>
    </div>

</template>

<style type="text/css" lang="less" scoped>
.body-wrapper {
    display: flex;
    height: 100vh;

    .body-sider {
        display: flex;
        flex-direction: column;
        gap:40px;
        width:330px;
        padding:20px;
        height:100vh;
        border-right:1px solid #efefef;

        .nav-box {
            .nav-content-title {
                margin-bottom: 20px;
                font-weight: 600;
                font-size: 24px;
            }
            .nav-items {
                display: flex;
                flex-wrap: wrap;
                gap:10px;

                .nav-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding:8px 15px;
                  border:1px solid #efefef;
                }     
            }
            
        }
    }

    .body-content-box {
        display: flex;
        flex-wrap: wrap;
        flex:1;
        width:100%;
        height: 100vh;
        overflow: auto;

        .pic-box {
            display: flex;

            .pic-container {

                img {
                    width:290px;
                    height:404px;
                }
                
            }
        }
    }
}
</style>
    
    
    
    
    
    
    
    
    
    @/services/inspiration@/services/inspiration