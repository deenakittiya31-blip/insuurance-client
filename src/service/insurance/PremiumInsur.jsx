import axios from "axios";
import { API_URL } from "../../config/api";

export const createPremium = (token, form) => {
    return axios.post(`${API_URL}/api/create-premium`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPremium = () => {
    return axios.get(`${API_URL}/api/list-premium`)
}

export const readPremium = (token, id) => {
    return axios.get(`${API_URL}/api/read-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePremium = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-premium/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePremium = (token, id) => {
    return axios.delete(`${API_URL}/api/delete-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}