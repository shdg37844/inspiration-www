<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { PoweroffOutlined, DownOutlined } from '@ant-design/icons-vue'
//import Cookies from 'js-cookie';
import loginService from '@/services/login'
import "@/assets/css/BasicLayoutHeader.css"

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const input = ref('')
const smsDisabled = ref(false)
const smsText = ref('发送验证码')

const selectedKeys = computed(() => {
  switch (route.path) {
    case '/':
      return ['1'];
    case '/fav':
      return ['2'];
    default:
      return [];
  }
});

//const TOKEN_KEY = 'web_token';
//const token = localStorage.getItem(TOKEN_KEY);

onMounted(() => {
  // 检查登录状态，如果未登录，则显示登录表单
  const token = localStorage.getItem('web_token');
  if (!token) {
    authStore.toggleLoginForm(true);
  }
});


const smsRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '目前只支持中国大陆的手机号码',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
const formData = ref({
  phone: null,
  code: null
})

async function handleSmsCode() {
  if (smsDisabled.value) return

  const send_phone = formData.value.phone;
  const phonePattern = /^1[3456789]\d{9}$/;
  if (!phonePattern.test(send_phone)) {
    alert('请输入中国大陆的手机号码！');
    return
  } else if (!send_phone) {
    alert('手机号码不能为空！');
    return
  }

  try {
    await loginService.sendSms(send_phone);
    startCountdown();
  } catch (e) {
    console.error('发送验证码错误:', e);
  }
}

//验证码倒计时
function startCountdown() {
  let seconds = 60;
  smsDisabled.value = true;

  const interval = setInterval(() => {
    seconds--;
    smsText.value = `${seconds}秒后重新获取`

    if (seconds <= 0) {
      clearInterval(interval);
      smsText.value = '发送验证码';
      smsDisabled.value = false;
    }
  }, 1000)
}

async function handleSubmit() {
  const code = formData.value.code;
  const phone = formData.value.phone;

  try {
    const response = await loginService.login(phone, code);
    if (response.code === 1) {
      alert('登录成功');
      let token = response.data.token;
      authStore.login(token);
      //Cookies.set(TOKEN_KEY, token, { expires: 1 });  // 将token保存到cookies中，有效期为1天
      //localStorage.setItem(TOKEN_KEY, token); // 保存Token到localStorage，页面刷新后也能从本地存储中恢复Token和权限信息，保持用户的登录状态和访问权限。
      authStore.toggleLoginForm(false);

    } else {
      alert(response.message || '登录失败');
    }
  } catch (error) {
    console.error('请求失败:', error);
    alert('请求失败: ' + error.message);
  }
}

const logout = () => {
  authStore.logout();
  //localStorage.removeItem(TOKEN_KEY)
  //Cookies.remove(TOKEN_KEY)
}

</script>

<template>
  <div class="header-section">
    <div class="header-hd" @click="$router.push('/')">
      <img src="@/assets/images/icons/headerLogo.png">
    </div>

    <div class="header-bd">
      <div class="search-bar">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none">
          <path
            d="M14.8824 14.7992C15.9012 13.7594 16.5294 12.3354 16.5294 10.7647C16.5294 7.58095 13.9485 5 10.7647 5C7.58095 5 5 7.58095 5 10.7647C5 13.9485 7.58095 16.5294 10.7647 16.5294C12.3777 16.5294 13.836 15.8669 14.8824 14.7992ZM14.8824 14.7992L19 19"
            stroke="#777777" stroke-width="2" />
        </svg>
        <input class="search-input" type="text" placeholder="搜索高质量家居灵感图片" v-model="input">
        <svg class="scan-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none">
          <path d="M4 8V4H8M16 4H20V8M4 16V20H8M20 16V20H15" stroke="#777777" stroke-width="2" />
          <circle cx="12" cy="12" r="3" stroke="#777777" stroke-width="2" />
        </svg>
      </div>
    </div>

    <div class="header-ft">
      <div class="change-section">
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '80px' }">
          <a-menu-item key="1" @click="$router.push('/')">首页</a-menu-item>
          <a-menu-item key="2" @click="$router.push('/fav')">收藏夹</a-menu-item>
        </a-menu>
      </div>
      <el-dropdown style="height: 100%" v-if="authStore.isLoggedIn()">
        <div class="bar-info-container">
          <i class="userInfo-avatar"></i>
          <span class="userInfo-name">ws</span>
          <DownOutlined :style="{ fontSize: '10px', marginLeft: '4px' }" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout()">
              <PoweroffOutlined :style="{ marginRight: '4px' }" /> 退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <button class="login-btn" v-else @click="authStore.toggleLoginForm(true);">
        <span>登录/注册</span>
      </button>
    </div>
  </div>

  <div class="login-mask" v-if="authStore.showLoginForm">
    <div class="login-content">
      <div class="login-content-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="116" height="40" viewBox="0 0 116 40" fill="none">
          <g clip-path="url(#clip0_168_2038)">
            <path
              d="M5.64073 7.90732H27.9382V14.9584H33.5789V2.306H19.643V0.197266H14.0023V2.306H0V14.9584H5.64073V7.90732Z"
              fill="#333333" />
            <path
              d="M26.8765 12.191V9.35742H7.16714V14.9587H20.174C19.444 15.7495 18.3822 16.2108 17.1877 16.2108H10.817L9.95432 17.4629C8.42801 19.7693 5.83991 21.1531 3.05272 21.1531H0.199174V26.7545H3.05272C7.2335 26.7545 11.0825 24.9093 13.7369 21.8121H15.7278V22.4052C12.4097 26.425 7.43258 28.7314 2.19002 28.7973H0.132812L0.199174 34.3986H2.25638C7.10078 34.3327 11.7461 32.8171 15.6614 30.1152C15.1305 32.5535 12.9406 34.3986 10.2861 34.3986V39.9999C16.3914 39.9999 21.4349 35.0576 21.4349 28.9291V20.8895C24.6866 19.308 26.8765 16.0131 26.8765 12.191Z"
              fill="#333333" />
            <path
              d="M28.7345 27.1493V25.8972C31.6544 24.0521 33.5789 20.8231 33.5789 17.1328H27.9381C27.9381 19.7687 25.7482 21.9434 23.0938 21.9434V27.5447C23.2928 33.3437 28.1372 38.0224 34.0434 38.0224V32.4211C31.1235 32.4211 28.7345 30.0488 28.7345 27.1493Z"
              fill="#333333" />
            <path
              d="M66.3615 13.245C66.3615 14.3653 65.2997 15.2879 63.9725 15.2879V20.8892C68.4187 20.8892 72.0686 17.4625 72.0686 13.245V5.79858V3.03087V0.197266H43.4004V5.79858H66.3615V13.245Z"
              fill="#333333" />
            <path
              d="M59.5262 25.8318V18.583H53.8855V27.4792C53.8855 31.3013 50.7665 34.3985 46.9175 34.3985H43.334V39.9998H46.9175C51.0983 39.9998 54.8145 37.957 57.1372 34.7939C59.7253 37.957 63.707 39.9998 68.1532 39.9998H71.6704V34.3985H68.1532C63.3752 34.3985 59.5262 30.5764 59.5262 25.8318Z"
              fill="#333333" />
            <path d="M63.9723 7.90723H49.24V13.5085H63.9723V7.90723Z" fill="#333333" />
            <path
              d="M49.373 25.8318C49.373 23.7231 47.6476 22.0098 45.524 22.0098C43.4004 22.0098 41.675 23.7231 41.675 25.8318C41.675 27.9406 43.4004 29.6539 45.524 29.6539C47.6476 29.6539 49.373 27.9406 49.373 25.8318Z"
              fill="#333333" />
            <path
              d="M69.4806 22.0098C67.357 22.0098 65.6316 23.7231 65.6316 25.8318C65.6316 27.9406 67.357 29.6539 69.4806 29.6539C71.6041 29.6539 73.3295 27.9406 73.3295 25.8318C73.3295 23.7231 71.6041 22.0098 69.4806 22.0098Z"
              fill="#333333" />
            <path
              d="M90.119 18.3196V8.03954H103.723L105.249 16.6063C105.382 17.3311 105.581 17.9901 105.78 18.6491C105.117 18.7809 104.519 18.9127 103.789 18.9127H102.86V24.514H103.789C105.382 24.514 106.908 24.2504 108.302 23.7891C109.563 25.5025 111.156 27.0181 112.947 28.1384L116 23.3937C114.938 22.7348 113.943 21.8122 113.146 20.8896C113.943 20.1647 114.739 19.3081 115.336 18.3196L110.625 15.2224L109.364 8.03954H114.938V2.43822H108.368L107.97 0L102.396 0.988468L102.661 2.43822H84.4119V18.2537C84.4119 19.6376 83.2837 20.7578 81.8901 20.7578V26.3591C86.4691 26.425 90.119 22.8007 90.119 18.3196Z"
              fill="#333333" />
            <path
              d="M93.7688 27.2812L88.3936 28.9946C90.5171 35.5844 96.6887 39.9995 103.657 39.9995H106.112V34.3982H103.657C99.1441 34.3982 95.1624 31.5646 93.7688 27.2812Z"
              fill="#333333" />
            <path d="M92.3088 21.4828H101.135V14.3658L96.6887 11.5322L92.3088 14.3658V21.4828Z" fill="#333333" />
            <path
              d="M86.3533 39.9557C88.4516 39.6175 89.8766 37.6543 89.536 35.5706C89.1955 33.487 87.2184 32.072 85.1201 32.4102C83.0218 32.7483 81.5969 34.7116 81.9374 36.7952C82.2779 38.8789 84.255 40.2939 86.3533 39.9557Z"
              fill="#333333" />
            <path
              d="M111.753 32.4219C109.629 32.4219 107.904 34.1352 107.904 36.2439C107.904 38.3527 109.629 40.066 111.753 40.066C113.876 40.066 115.602 38.3527 115.602 36.2439C115.602 34.1352 113.876 32.4219 111.753 32.4219Z"
              fill="#333333" />
          </g>
          <defs>
            <clipPath id="clip0_168_2038">
              <rect width="116" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="form-container">
        <div class="login-form-phone">
          <el-form :model="formData" :rules="smsRules">
            <el-form-item prop="phone">
              <el-input type="number" placeholder="请输手机号" v-model="formData.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="14">
                <el-input type="text" placeholder="请输入验证码" v-model="formData.code" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="1"> </el-col>
              <el-col :span="5">
                <el-button :disabled="smsDisabled" @click="handleSmsCode">{{ smsText }}</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button class="login-icon" style="width: 100%" type="primary" @click="handleSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <svg class="close-icon" @click="authStore.toggleLoginForm(false)" t="1711962523722" viewBox="0 0 1024 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1736" width="32" height="32">
        <path
          d="M512 160a352 352 0 1 1 0 704 352 352 0 0 1 0-704z m0 64a288 288 0 1 0 0 576 288 288 0 0 0 0-576z m-45.248 197.504l45.184 45.312 45.312-45.312a32 32 0 1 1 45.248 45.248L557.184 512l45.312 45.184a32 32 0 1 1-45.248 45.248L512 557.312l-45.184 45.184a32 32 0 1 1-45.248-45.248l45.184-45.184-45.184-45.312a32 32 0 1 1 45.248-45.248z"
          fill="#8a8a8a" p-id="1737"></path>
      </svg>
    </div>
  </div>
</template>

<style lang="less" scoped></style>