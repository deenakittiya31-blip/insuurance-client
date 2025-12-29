import axios from "axios"
import { API_URL } from "../config/api"
import api from "../config/axios"

export const uploadImages = async (token, form) => {

    return api.post('/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeImage = async (token, logo_public_id) => {
    return api.post('/api/removeImages', { logo_public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}