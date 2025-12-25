import axios from "axios";
import { API_URL } from "../../config/api";

export const creatType = (token, form) => {
    return axios.post(`${API_URL}/api/create-type`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listType = (pageNumber) => {
    return axios.get(`${API_URL}/api/list-type/page?page=${pageNumber}&per_page=10`)
}

export const listTypeSelect = () => {
    return axios.get(`${API_URL}/api/list-type-select`)
}

export const readType = (token, id) => {
    return axios.get(`${API_URL}/api/read-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateType = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-type/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeType = (token, id) => {
    return axios.delete(`${API_URL}/api/delete-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}