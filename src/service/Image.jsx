import axios from "axios"
import { API_URL } from "../config/api"

export const uploadImages = async (token, form) => {

    return axios.post(`${API_URL}/api/images`, {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeImage = async (token, logo_public_id) => {
    return axios.post(`${API_URL}/api/removeImages`, { logo_public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}