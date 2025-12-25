import axios from 'axios'
import { API_URL } from '../../config/api'

export const createCarBrand = (token, form) => {
    return axios.post(`${API_URL}/api/create-carbrand`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarBrand = (pageNumber) => {
    return axios.get(`${API_URL}/api/list-carbrand/page?page=${pageNumber}&per_page=10`)
}

export const listCarBrandSelect = () => {
    return axios.get(`${API_URL}/api/list-carbrand-select`)
}

export const readCarBrand = (token, id) => {
    return axios.get(`${API_URL}/api/read-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCarBrand = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-carbrand/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarBrand = (token, id) => {
    return axios.delete(`${API_URL}/api/delete-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}