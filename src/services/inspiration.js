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
    getFavImages() {
        const url = API.FavImages.replace(':id', )
        return request.get(url,)
    }
}


export default inspirationService