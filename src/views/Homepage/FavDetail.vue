<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { ElUpload, ElMessage } from 'element-plus';
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

//七牛云上传图片
// 定义响应式数据
const serverUrl = ref('https://upload.qiniup.com'); // 服务器地址
const header = ref({}); // 请求头
const token = ref('');
const uploadedImageUrl = ref('');
const isImageUploaded = ref(false)

// 获取七牛云上传Token
async function getQiniuToken() {
    try {
        const response = await inspirationService.getQiniuToken();
        if (response && response.token) {
            token.value = response.token;
        } else {
            console.error('获取失败', response);
        }
    } catch (error) {
        console.error('Error getting the upload token:', error);
        ElMessage.error('无法获取上传Token');
    }
};
onMounted(() => {
    getQiniuToken();  // 在组件挂载后获取token
});

function beforeUpload(file) {
    const isImage = file.type.includes('image/');
    if (!isImage) {
        this.$message.error('只能上传图片文件！');
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB！');
        return false;
    }
    return true;
}
function uploadSuccess(response) {
    uploadedImageUrl.value = `http://sb0hlf23s.hd-bkt.clouddn.com/${response.key}`;
    isImageUploaded.value = true;
    ElMessage.success('上传成功');
}
function uploadError(err) {
    console.error('Upload error:', err);
    ElMessage.error('上传失败');
}



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
                <el-form-item class="opration-box">
                    <!-- 图片上传组件 -->
                    <el-upload class="avatar-uploader" :action="serverUrl" :data="{ 'token': token }" name="file"
                        :headers="header" :show-file-list="false" :before-upload="beforeUpload"
                        :on-success="uploadSuccess" :on-error="uploadError">
                        <div class="components" v-if="!isImageUploaded">
                            <div class="upload-box">
                                <img src="@/assets/images/upload.png" alt="upload-img">
                            </div>
                            <div class="el-upload_tip">请上传清晰高质量的 jpg 格式图片图片大小不超过 10MB</div>
                        </div>
                    </el-upload>
                    <div class="image-box" v-if="isImageUploaded">
                        <img :src="uploadedImageUrl" class="uploaded-image" />
                    </div>
                </el-form-item>
                <div class="add-content-box">
                    <div class="content-box-top">
                        <div class="content-title">添加说明（选填）</div>
                        <el-input v-model="favTextarea" class="content-textarea" maxlength="80" style="width: 519px;"
                            placeholder="请输入内容" show-word-limit type="textarea" />
                    </div>
                    <div class="content-box-bottom">
                        <svg class="cancle-btn" @click="showUploadForm = false; isImageUploaded = false;" width="72"
                            height="40" viewBox="0 0 72 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="71" height="39" rx="1.5" fill="white" />
                            <rect x="0.5" y="0.5" width="71" height="39" rx="1.5" stroke="#EFEFEF" />
                            <path
                                d="M29.714 22.382C29.336 22.48 28.944 22.578 28.538 22.676V15.228H29.392V16.026H29.952C30.134 18.294 30.722 20.394 31.702 22.326C30.988 23.502 30.092 24.524 29 25.378L29.91 26.414C30.89 25.644 31.73 24.72 32.458 23.642C33.06 24.594 33.788 25.518 34.656 26.414L35.552 25.392C34.614 24.496 33.816 23.502 33.172 22.41C34.082 20.618 34.684 18.476 34.992 15.97V14.752H29.504V13.982H22.756V15.228H23.764V23.572L22.588 23.712L22.91 25.014C24.408 24.79 25.85 24.538 27.25 24.258V26.414H28.538V23.992L29.714 23.712V22.382ZM31.17 16.026H33.746C33.508 17.874 33.06 19.526 32.416 20.982C31.744 19.484 31.338 17.832 31.17 16.026ZM27.25 22.97C26.536 23.11 25.808 23.25 25.066 23.376V21.318H27.25V22.97ZM25.066 20.128V18.28H27.25V20.128H25.066ZM25.066 17.076V15.228H27.25V17.076H25.066ZM44.19 13.562V17.3H41.25V26.358H42.594V23.418H47.172V24.454C47.172 24.874 46.962 25.084 46.556 25.084L45.086 25.042L45.436 26.33H46.99C47.998 26.33 48.502 25.798 48.502 24.748V17.3H45.534V13.562H44.19ZM42.594 21.01H47.172V22.284H42.594V21.01ZM47.172 19.876H42.594V18.588H47.172V19.876ZM41.684 13.884L40.578 14.416C41.124 15.116 41.628 15.886 42.104 16.754L43.154 16.236C42.678 15.382 42.188 14.598 41.684 13.884ZM47.984 13.87C47.62 14.696 47.116 15.522 46.472 16.362L47.494 16.908C48.138 16.096 48.67 15.256 49.062 14.388L47.984 13.87ZM39.094 20.772C38.436 22.466 37.666 24.118 36.798 25.742L38.03 26.288C38.842 24.706 39.598 23.012 40.27 21.22L39.094 20.772ZM38.002 13.66L37.05 14.584C38.1 15.34 38.912 16.04 39.5 16.698L40.452 15.746C39.78 15.046 38.968 14.36 38.002 13.66ZM37.61 16.936L36.658 17.86C37.638 18.63 38.408 19.344 38.968 19.988L39.906 19.036C39.29 18.336 38.52 17.636 37.61 16.936Z"
                                fill="#999999" />
                        </svg>
                        <svg class="create-btn" width="100" height="40" viewBox="0 0 100 40" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="40" rx="2" fill="#333333" />
                            <path
                                d="M27.656 13.52V24.65H22.742V25.938H35.286V24.65H29.028V19.022H34.208V17.734H29.028V13.52H27.656ZM38.184 19.022V26.47H39.5V17.118C40.06 16.152 40.522 15.144 40.872 14.094L39.612 13.506C38.926 15.634 37.862 17.482 36.434 19.078L36.868 20.492C37.344 20.016 37.778 19.526 38.184 19.022ZM40.858 15.2V16.488H43.224C43.112 16.936 42.986 17.37 42.86 17.804H40.242V19.078H42.454C42.132 20.016 41.796 20.926 41.432 21.794H47.312C46.738 22.48 45.954 23.152 44.974 23.824C44.19 23.46 43.378 23.11 42.538 22.802L41.824 23.852C43.616 24.51 45.38 25.406 47.088 26.554L47.844 25.406C47.298 25.056 46.724 24.72 46.136 24.412C47.312 23.502 48.166 22.606 48.726 21.71V20.562H43.154C43.35 20.1 43.532 19.61 43.728 19.078H49.482V17.804H44.148C44.274 17.384 44.4 16.95 44.54 16.488H48.908V15.2H44.876C44.988 14.696 45.114 14.178 45.226 13.632L43.924 13.506L43.546 15.2H40.858ZM55.502 15.396C55.068 16.39 54.242 17.244 53.01 17.944L53.738 18.91C54.214 18.602 54.648 18.28 55.026 17.944C55.362 18.28 55.754 18.602 56.202 18.91C55.278 19.302 54.13 19.596 52.786 19.82L53.36 20.884C54.9 20.534 56.202 20.1 57.266 19.568C58.218 20.072 59.338 20.492 60.64 20.842L61.326 19.848C60.22 19.596 59.24 19.288 58.372 18.896C59.1 18.364 59.646 17.762 59.996 17.076V16.18H56.398C56.496 15.984 56.594 15.774 56.678 15.55L55.502 15.396ZM57.294 18.364C56.692 18.028 56.16 17.636 55.712 17.216C55.712 17.188 55.74 17.174 55.768 17.146H58.666C58.33 17.594 57.868 18 57.294 18.364ZM54.578 22.13L54.074 23.124C55.936 23.488 57.728 23.978 59.464 24.608L59.898 23.544C58.19 22.928 56.426 22.466 54.578 22.13ZM56.006 20.24L55.404 21.108C56.454 21.416 57.476 21.836 58.47 22.382L59.086 21.43C58.162 20.968 57.126 20.576 56.006 20.24ZM62.852 14.038H51.148V26.442H52.45V25.952H61.55V26.442H62.852V14.038ZM52.45 24.776V15.214H61.55V24.776H52.45ZM68.494 18.35H76.544V17.076H73.59V13.52H72.288V17.076H68.494V13.926H67.164V19.092C67.136 22.046 66.422 24.202 65.022 25.546L66.044 26.442C67.192 25.322 67.934 23.74 68.284 21.696H73.562V26.47H74.892V20.422H68.438C68.466 20.002 68.494 19.568 68.494 19.092V18.35Z"
                                fill="white" />
                        </svg>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>