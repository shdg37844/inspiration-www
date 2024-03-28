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
    uploadImg(uploadData) {
        const url = API.uploadImage.replace(':id', uploadData.fav_id)
        return request.post(url, { uploadData })
    },
    updateFav(id, name, description) {
        return request.put(API.favorite, { id, name, description })
    },
    deleteFav(id) {
        const url = API.selectedFav.replace(':id', id)
        return request.delete(url)
    }
}


export default inspirationService