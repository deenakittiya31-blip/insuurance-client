import axios from 'axios'
import { API_URL } from '../../config/api'

export const createCarModel = async (token, form) => {
    return axios.post(`${API_URL}/api/create-carmodel`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarModel = async (pageNumber) => {
    return axios.get(`${API_URL}/api/list-carmodel/page?page=${pageNumber}&per_page=10`)
}

export const updateCarModel = async (token, id, form) => {
    return axios.put(`${API_URL}/api/update-carmodel/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarModel = async (token, id) => {
    return axios.delete(`${API_URL}/api/delete-carmodel/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}