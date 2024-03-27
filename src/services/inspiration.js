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
        return request.get(API.favorite)
    },
    createFav(name, description) {
        return request.post(API.favorite, { name: name, description: description })
    },
    getFavImages(id) {
        const url = API.FavImages.replace(':id', id)
        return request.get(url)
    },
    getFavIns() {
        return request.get(API.FavIns)
    },
    addBind(fav_id, ins_id) {
        return request.post(API.FavIns, { fav_id, ins_id })
    },
    getQiniuToken() {
        return request.get(API.qiniuUpload)
    },
}


export default inspirationService