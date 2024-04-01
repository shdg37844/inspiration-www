import { defineStore } from 'pinia'
const TOKEN_KEY = 'web_token';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('main', {
    state: () => ({
        showLoginForm: false,
        token: Cookies.get(TOKEN_KEY) || '',
    }),
    actions: {
        toggleLoginForm(show) {
            this.showLoginForm = show
        },
        login(token) {
            this.token = token;
            localStorage.setItem(TOKEN_KEY, token);
            Cookies.set(TOKEN_KEY, token, { expires: 1 });
        },
        logout() {
            this.token = '';
            localStorage.removeItem(TOKEN_KEY);
            Cookies.remove(TOKEN_KEY);
        }, 
        isLoggedIn() {
            return !!this.token;
        },
    }
})

export default useAuthStore