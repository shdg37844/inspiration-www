import request from '@/utils/request.js'
import API from '@/consts/api.js'

const inspirationService = {
    getClassify() {
        return request.get(API.classify)
    },
    getPics() {
        return request.get(API.images)
    },
    getFav() {
        return request.get(API.images)
    },
}


export default inspirationService