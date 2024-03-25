<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import inspirationService from '@/services/inspiration'
import "@/assets/css/FavDetail.css"

const route = useRoute()
const favImg = ref([])

async function fetchFevImg() {
    const id = route.params.id

    try {
        const response = await inspirationService.getFavImages(id)
        const favImgs = response.data.img_urls
        favImg.value = favImgs
    } catch (e) {
        console.error(e);
    }
}
fetchFevImg()

</script>

<template>
    <div class="detail-wrap">
        <div class="detail-header">
            <div class="header-left">
                <svg class="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12H3M3 12L9 6M3 12L9 18" stroke="#333333" stroke-width="2" />
                </svg>
                <span class="title">餐厅</span>
            </div>
            <div class="header-right"></div>
        </div>
        <div class="images-list"></div>
    </div>

</template>