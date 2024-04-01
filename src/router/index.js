import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js';
import Cookies from 'js-cookie'
import routes from './routes'
import NProgress from 'nprogress'


const TOKEN_KEY = 'web_token'
const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (to.meta.title) document.title = to.meta.title;
  const token = Cookies.get(TOKEN_KEY);
  const isLogin = !!token

  if (to.meta.requireAuth && !isLogin) {
    const authStore = useAuthStore();
    authStore.toggleLoginForm(true);
    next(false); // 取消当前的导航
  } else {
    next();
  }


});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done()
})

export default appRouter
