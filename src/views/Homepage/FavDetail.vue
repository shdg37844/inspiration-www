<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import inspirationService from '@/services/inspiration'
import "@/assets/css/FavDetail.css"

const route = useRoute()
const favImg = ref([])
const FavTitle = ref('')
const showUploadForm = ref(false)

async function fetchFevImg() {
    const id = route.params.id

    try {
        const response = await inspirationService.getFavImages(id)
        const favImgs = response.data.img_urls
        const selectedFavName = response.data.selectedFavName
        favImg.value = favImgs
        FavTitle.value = selectedFavName

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
                <svg class="back-icon" @click="$router.push('/fav')" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12H3M3 12L9 6M3 12L9 18" stroke="#333333" stroke-width="2" />
                </svg>
                <span class="title">{{ FavTitle }}</span>
            </div>
            <div class="header-right" @click="showUploadForm = true">
                <svg class="createIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none">
                    <path d="M1 12H23M11.9998 1V23" stroke="#333333" stroke-width="4" />
                </svg>
                <svg class="createIcon-hover" width="40" height="40" viewBox="0 0 40 40" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#EEEEEE" />
                    <path d="M9 20H31M19.9998 9V31" stroke="#333333" stroke-width="4" />
                </svg>
                <svg class="prompt-text" width="72" height="33" viewBox="0 0 72 33" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_168_1968)">
                        <rect width="64" height="25" transform="translate(4 2)" fill="black" fill-opacity="0.8" />
                        <path
                            d="M16.992 9.196V18.88H12.672V19.72H23.352V18.88H17.88V13.744H22.332V12.904H17.88V9.196H16.992ZM26.004 13.504V20.224H26.868V12.196C27.348 11.368 27.732 10.492 28.044 9.568L27.228 9.184C26.64 11.032 25.704 12.676 24.432 14.104L24.708 15.028C25.176 14.548 25.608 14.032 26.004 13.504ZM28.2 10.732V11.572H30.336C30.216 12.028 30.084 12.496 29.94 12.964H27.672V13.792H29.676C29.4 14.596 29.1 15.376 28.788 16.12H33.924C33.372 16.84 32.628 17.524 31.68 18.184C30.984 17.848 30.264 17.536 29.52 17.248L29.064 17.92C30.6 18.496 32.112 19.288 33.576 20.296L34.068 19.552C33.54 19.204 33 18.88 32.436 18.58C33.54 17.74 34.344 16.9 34.848 16.06V15.316H29.916C30.108 14.848 30.312 14.344 30.504 13.792H35.52V12.964H30.78C30.924 12.52 31.056 12.052 31.188 11.572H35.028V10.732H31.404C31.512 10.264 31.62 9.772 31.74 9.268L30.9 9.184L30.54 10.732H28.2ZM40.848 10.756C40.464 11.668 39.72 12.448 38.628 13.096L39.108 13.72C39.564 13.432 39.972 13.12 40.332 12.784C40.668 13.144 41.076 13.48 41.544 13.792C40.704 14.188 39.66 14.5 38.424 14.716L38.808 15.412C40.176 15.112 41.316 14.716 42.24 14.224C43.08 14.692 44.076 15.076 45.24 15.388L45.696 14.74C44.664 14.5 43.752 14.176 42.948 13.792C43.632 13.312 44.136 12.748 44.472 12.112V11.512H41.304C41.424 11.296 41.52 11.08 41.616 10.852L40.848 10.756ZM42.24 13.42C41.688 13.084 41.196 12.712 40.776 12.304C40.8 12.256 40.836 12.208 40.884 12.16H43.608C43.284 12.64 42.828 13.06 42.24 13.42ZM39.864 16.648L39.528 17.296C41.136 17.608 42.684 18.052 44.172 18.628L44.46 17.932C42.996 17.38 41.46 16.948 39.864 16.648ZM41.112 14.968L40.716 15.544C41.604 15.832 42.456 16.216 43.284 16.72L43.692 16.096C42.912 15.664 42.048 15.28 41.112 14.968ZM46.896 9.724H37.104V20.2H37.944V19.708H46.056V20.2H46.896V9.724ZM37.944 18.94V10.492H46.056V18.94H37.944ZM51.72 13.216H58.788V12.388H56.088V9.196H55.236V12.388H51.72V9.532H50.844V13.936C50.82 16.528 50.184 18.424 48.924 19.612L49.584 20.188C50.604 19.228 51.264 17.836 51.552 16.036H56.376V20.224H57.24V15.196H51.66C51.684 14.8 51.708 14.38 51.72 13.936V13.216Z"
                            fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_168_1968" x="0" y="0" width="72" height="33" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_168_1968" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_168_1968"
                                result="shape" />
                        </filter>
                    </defs>
                </svg>

            </div>
        </div>
        <div class="images-list">
            <div class="pic-container" v-for="(image, index) in favImg" :key="index">
                <img :src="image.img_url" alt="Inspiration image">
            </div>
        </div>
    </div>

    <div class="upload-mask" v-if="showUploadForm">
        <div class="upload-content">
            <div class="title-section">
                <span>上传图片至</span>
            </div>
            <div class="upload-opration">
                <div class="opration-box"></div>
                <div class="add-content-box"></div>
            </div>
        </div>
    </div>

</template>