import request from "@/utils/request.js";
import API from "@/consts/api.js";

const loginService = {
    sendSms(send_phone) {
        return request.post(API.sms, { send_phone });
    },
    login(phone, code) {
        return request.post(API.login, { phone: phone, code: code });
    }
}

export default loginService;