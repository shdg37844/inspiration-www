const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/web`;

export default {
    userInfo: `${WEB_PREFIX}/users/user-info`,
    ossToken: `${PREFIX}/api/file/alioss-token`,
    ossStore: `${PREFIX}/api/file/alioss-store`,
    classify: `${WEB_PREFIX}/classify`,
    images: `${WEB_PREFIX}/inspiration/images`,
    FavImages: `${WEB_PREFIX}/inspiration/:id/images`,
    favorite: `${WEB_PREFIX}/favorite`,
    FavIns: `${WEB_PREFIX}/InsFav`,

    sms: `${WEB_PREFIX}/aliyun-sms`,  //发送验证短信
    login: `${WEB_PREFIX}/login`,  //登录
} 