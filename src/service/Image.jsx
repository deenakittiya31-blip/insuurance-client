import axios from "axios"

export const uploadImages = async (token, form) => {
    // console.log('form api fron', form)
    return axios.post('http://localhost:5000/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeImage = async (token, logo_public_id) => {
    return axios.post('http://localhost:5000/api/removeImages', { logo_public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}