const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/web`;

export default {
    userInfo: `${WEB_PREFIX}/users/user-info`,
    ossToken: `${PREFIX}/api/file/alioss-token`,
    ossStore: `${PREFIX}/api/file/alioss-store`,
    classify: `${WEB_PREFIX}/classify`,
    images: `${WEB_PREFIX}/inspiration/images`  
}