<script setup>

import "@/assets/css/MyFav.css"

async function fetchFav() {
    try {
        const response = await inspirationService.getPics();
        pics.value = response.data.images;

    } catch (e) {
        console.error(e);
    }
}
fetchFav()

</script>


<template>
    <div class="fav-wrap">
        <div class="fav-header">
            <div class="header-left">我的收藏</div>
            <header class="header-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12H23M11.9998 1V23" stroke="#333333" stroke-width="4" />
                </svg>
            </header>
        </div>
        <div class="blank-icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M84.9969 57.877L75.2618 47.944L58.9992 64.5356L42.7382 47.9424L33 57.8785L49.2626 74.4718L33.0016 91.0635L42.7366 100.996L58.9977 84.4048L75.2618 101L85 91.0651L68.7343 74.4686L84.9969 57.877Z"
                    fill="black" fill-opacity="0.1" />
                <path d="M57.8417 21.0055L46.1769 21.0039L46.1753 40.029L57.8417 40.029L57.8417 21.0055Z" fill="black"
                    fill-opacity="0.1" />
                <path d="M72.9989 40.0298L72.9973 21.0048L61.3325 21L61.3341 40.0282L72.9989 40.0298Z" fill="black"
                    fill-opacity="0.1" />
            </svg>
        </div>
    </div>
</template>
