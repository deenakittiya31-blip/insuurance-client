import axios from 'axios'
import { API_URL } from '../../config/api'

export const createCarType = async (token, type) => {
    return axios.post(`${API_URL}/api/create-cartype`, { type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarType = async (pageNumber) => {
    return axios.get(`${API_URL}/api/list-cartype/page?page=${pageNumber}&per_page=10`)
}

export const listCarTypeSelect = () => {
    return axios.get(`${API_URL}/api/list-cartype-select`)
}

export const updateCarType = async (token, id, type) => {
    return axios.put(`${API_URL}/api/update-cartype/${id}`, { type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarType = async (token, id) => {
    return axios.delete(`${API_URL}/api/delete-cartype/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}