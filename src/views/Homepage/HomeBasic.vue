<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js';
import inspirationService from '@/services/inspiration'
import "@/assets/css/HomeBasic.css"

const authStore = useAuthStore();
const styleClassify = ref([]);
const spaceClassify = ref([]);
const pics = ref([]);
const favorites = ref([]);
const showCollectForm = ref(false);
const currentImgId = ref(null);
const selectedNavId = ref(null);


async function fetchClassify() {
    try {
        const response = await inspirationService.getClassify();
        const spaceRes = response.data.spaceClassify
        const styleRes = response.data.styleClassify

        const spaceClassifies = spaceRes.map(item => ({
            id: item.id,
            name: item.name
        }))

        const styleClassifies = styleRes.map(item => ({
            id: item.id,
            name: item.name
        }))

        spaceClassify.value = spaceClassifies;
        styleClassify.value = styleClassifies;

    } catch (e) {
        console.error(e);
    }
}
fetchClassify();

async function fetchPics() {
    try {
        const response = await inspirationService.getPics();
        const dataRes = response.data.images
        const bindsResponse = await inspirationService.getFavIns();
        const bindsRes = bindsResponse.data.FavInsBind
        const binds = bindsRes.map(item => item.ins_id)

        const PicData = dataRes.map(item => ({
            id: item.id,
            img_url: item.img_url,
            category_id: item.category_id,
            isCollected: binds.includes(item.id)
        }))

        const SelectedImg = PicData.filter(p => p.category_id === selectedNavId.value)
        pics.value = selectedNavId.value === null ? PicData : SelectedImg;

    } catch (e) {
        console.error(e);
    }
}
fetchPics();

async function fetchFav() {
    try {
        const allresponse = await inspirationService.getFav();
        const AllData = allresponse.data.favorite

        const favoritesData = AllData.map(item => ({
            id: item.id,
            name: item.name
        }))

        favorites.value = favoritesData
    } catch (e) {
        console.error(e);
    }
}
fetchFav()

async function handleCollectImg(fav_id) {
    const ins_id = currentImgId.value
    try {
        const response = await inspirationService.addBind(fav_id, ins_id);

        if (response.error_code === 0) {
            alert("图片收藏成功！");
            const index = pics.value.findIndex(pic => pic.id === ins_id)
            pics.value[index].isCollected = true
            showCollectForm.value = false
        } else if (response.error_code === 2) {
            alert("收藏夹中已存在该图片！");
        } else {
            console.error("发生错误：", response.message);
        }


    } catch (e) {
        console.error(e);
    }
}

function getImgId(id) {
    currentImgId.value = id;
}

function handleGetClassifyImgs(id) {
    selectedNavId.value = selectedNavId.value === id ? null : id
    fetchPics();
}

</script>

<template>
    <div class="body-wrapper">
        <div class="body-sider">
            <div class="nav-box">
                <div class="nav-content-title">风格</div>
                <div class="nav-items">
                    <div class="nav-item" v-for="style in styleClassify" :key="style.id"
                        @click="handleGetClassifyImgs(style.id)" :class="{ 'selected': selectedNavId === style.id }">
                        {{ style.name }}</div>
                </div>
            </div>
            <div class="nav-box">
                <div class="nav-content-title">空间</div>
                <div class="nav-items">
                    <div class="nav-item" v-for="space in spaceClassify" :key="space.id"
                        @click="handleGetClassifyImgs(space.id)" :class="{ 'selected': selectedNavId === space.id }">{{
                        space.name }}</div>
                </div>
            </div>
        </div>

        <div class="body-content-box" v-if="pics.length > 0">
            <div class="pic-box" v-for="image in pics" :key="image.id">
                <div class="pic-container">
                    <div class="overlay"></div>
                    <img :src="image.img_url" alt="Inspiration image">
                    <svg v-if="authStore.isLoggedIn()" class="collect-btn"
                        @click="getImgId(image.id); showCollectForm = true" width="72" height="40" viewBox="0 0 72 40"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H70C71.1046 0 72 0.895431 72 2V38C72 39.1046 71.1046 40 70 40H0V0Z" fill="#FF3939"
                            fill-opacity="0.8" />
                        <path
                            d="M23.19 23.754C24.226 23.488 25.234 23.18 26.186 22.844V26.344H27.488V25.28L28.188 26.414C29.588 25.658 30.736 24.734 31.646 23.642C32.486 24.692 33.48 25.658 34.628 26.526L35.538 25.448C34.362 24.58 33.326 23.6 32.458 22.508C33.41 20.912 33.956 19.022 34.068 16.838H35.174V15.536H30.75C30.89 14.962 31.03 14.346 31.142 13.702L29.812 13.478C29.42 15.942 28.664 17.902 27.558 19.358L28.37 20.366C28.622 20.058 28.874 19.736 29.112 19.372C29.574 20.492 30.148 21.556 30.834 22.55C29.994 23.614 28.874 24.496 27.488 25.168V13.59H26.186V21.57C25.612 21.794 25.038 21.99 24.45 22.172V14.752H23.148V22.228C23.148 22.41 23.022 22.55 22.798 22.634L23.19 23.754ZM30.344 16.838H32.808C32.71 18.56 32.318 20.072 31.618 21.36C30.918 20.324 30.33 19.19 29.882 17.958C30.05 17.594 30.204 17.23 30.344 16.838ZM36.868 14.304V15.466H40.018V16.292H41.362V15.466H44.652V16.306H45.548V16.768H39.22V18.616H38.24V16.432H37.106V19.722H39.22V20.912H36.602V22.018H37.344C37.274 23.53 36.98 24.566 36.476 25.14L37.372 25.854C37.96 25.126 38.282 23.838 38.366 22.018H39.22C39.192 23.544 38.968 24.734 38.52 25.588L39.472 26.456C40.06 25.322 40.382 23.824 40.41 21.962V17.874H45.576C45.632 19.666 45.772 21.108 45.996 22.228C46.08 22.662 46.178 23.068 46.29 23.432C45.954 24.006 45.548 24.496 45.072 24.902V24.426H44.022V23.362H45.1V20.52H44.022V19.554H45.072V18.518H41.012V25.476H44.442L45.002 26.386C45.674 25.994 46.276 25.476 46.78 24.804C46.864 25.014 46.976 25.21 47.088 25.378C47.522 26.05 47.928 26.4 48.32 26.4C48.824 26.4 49.216 25.518 49.468 23.754L48.516 23.222C48.376 24.342 48.25 24.916 48.124 24.916C48.012 24.916 47.858 24.664 47.634 24.174C47.578 24.048 47.522 23.894 47.466 23.712C48.11 22.452 48.544 20.842 48.768 18.882L47.662 18.644C47.536 19.806 47.326 20.842 47.018 21.752V21.724C46.864 20.856 46.766 19.582 46.738 17.874H49.244V16.768H48.628C48.488 16.376 48.362 16.012 48.25 15.69L47.144 15.858C47.284 16.138 47.424 16.432 47.55 16.768H46.71C46.696 16.558 46.696 16.334 46.696 16.11H45.996V15.466H49.146V14.304H45.996V13.534H44.652V14.304H41.362V13.52H40.018V14.304H36.868ZM43 19.554V20.52H42.062V19.554H43ZM42.062 21.472H44.092V22.396H42.062V21.472ZM42.062 23.362H43V24.426H42.062V23.362Z"
                            fill="white" />
                    </svg>
                    <div class="favorite-sign-box" v-if="image.isCollected === true && authStore.isLoggedIn()">
                        <svg class="favorite-icon" width="30" height="30" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="white" />
                            <path d="M9.6665 14.7781L13.3766 18.3337L20.3332 11.667" stroke="#333333"
                                stroke-width="2" />
                        </svg>
                        <span class="favorite-text">已收藏</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="nopic-box">
            <div class="nopic-icon">
                <img src="./../../assets/images/blank.png" alt="No Pics">
            </div>
        </div>

        <div class="collect-mask" v-if="showCollectForm">
            <div class="collect-content">
                <div class="title">添加至收藏夹</div>
                <div class="fav-list">
                    <div class="fav-item" v-for="fav in favorites" :key="fav.id">
                        <span class="fav-name">{{ fav.name }}</span>
                        <svg class="collect-icon" @click="handleCollectImg(fav.id);" width="72" height="40"
                            viewBox="0 0 72 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H70C71.1046 0 72 0.895431 72 2V38C72 39.1046 71.1046 40 70 40H0V0Z"
                                fill="#FF3939" fill-opacity="0.8" />
                            <path
                                d="M23.19 23.754C24.226 23.488 25.234 23.18 26.186 22.844V26.344H27.488V25.28L28.188 26.414C29.588 25.658 30.736 24.734 31.646 23.642C32.486 24.692 33.48 25.658 34.628 26.526L35.538 25.448C34.362 24.58 33.326 23.6 32.458 22.508C33.41 20.912 33.956 19.022 34.068 16.838H35.174V15.536H30.75C30.89 14.962 31.03 14.346 31.142 13.702L29.812 13.478C29.42 15.942 28.664 17.902 27.558 19.358L28.37 20.366C28.622 20.058 28.874 19.736 29.112 19.372C29.574 20.492 30.148 21.556 30.834 22.55C29.994 23.614 28.874 24.496 27.488 25.168V13.59H26.186V21.57C25.612 21.794 25.038 21.99 24.45 22.172V14.752H23.148V22.228C23.148 22.41 23.022 22.55 22.798 22.634L23.19 23.754ZM30.344 16.838H32.808C32.71 18.56 32.318 20.072 31.618 21.36C30.918 20.324 30.33 19.19 29.882 17.958C30.05 17.594 30.204 17.23 30.344 16.838ZM36.868 14.304V15.466H40.018V16.292H41.362V15.466H44.652V16.306H45.548V16.768H39.22V18.616H38.24V16.432H37.106V19.722H39.22V20.912H36.602V22.018H37.344C37.274 23.53 36.98 24.566 36.476 25.14L37.372 25.854C37.96 25.126 38.282 23.838 38.366 22.018H39.22C39.192 23.544 38.968 24.734 38.52 25.588L39.472 26.456C40.06 25.322 40.382 23.824 40.41 21.962V17.874H45.576C45.632 19.666 45.772 21.108 45.996 22.228C46.08 22.662 46.178 23.068 46.29 23.432C45.954 24.006 45.548 24.496 45.072 24.902V24.426H44.022V23.362H45.1V20.52H44.022V19.554H45.072V18.518H41.012V25.476H44.442L45.002 26.386C45.674 25.994 46.276 25.476 46.78 24.804C46.864 25.014 46.976 25.21 47.088 25.378C47.522 26.05 47.928 26.4 48.32 26.4C48.824 26.4 49.216 25.518 49.468 23.754L48.516 23.222C48.376 24.342 48.25 24.916 48.124 24.916C48.012 24.916 47.858 24.664 47.634 24.174C47.578 24.048 47.522 23.894 47.466 23.712C48.11 22.452 48.544 20.842 48.768 18.882L47.662 18.644C47.536 19.806 47.326 20.842 47.018 21.752V21.724C46.864 20.856 46.766 19.582 46.738 17.874H49.244V16.768H48.628C48.488 16.376 48.362 16.012 48.25 15.69L47.144 15.858C47.284 16.138 47.424 16.432 47.55 16.768H46.71C46.696 16.558 46.696 16.334 46.696 16.11H45.996V15.466H49.146V14.304H45.996V13.534H44.652V14.304H41.362V13.52H40.018V14.304H36.868ZM43 19.554V20.52H42.062V19.554H43ZM42.062 21.472H44.092V22.396H42.062V21.472ZM42.062 23.362H43V24.426H42.062V23.362Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
                <svg class="cancle-btn" @click="showCollectForm = false" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" fill="#EEEEEE" />
                    <path d="M15 9L9 15M9 9L15 15" stroke="#333333" />
                </svg>

            </div>
        </div>

    </div>

</template>
