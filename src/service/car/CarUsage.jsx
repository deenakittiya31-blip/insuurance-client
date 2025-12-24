import axios from 'axios'
import { API_URL } from '../../config/api'

export const createCarUsage = async (token, usage) => {
    return axios.post(`${API_URL}/api/create-carusage`, { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarUsage = async (pageNumber) => {
    return axios.get(`${API_URL}/api/list-carusage/page?page=${pageNumber}&per_page=5`)
}

export const listCarUsageSelect = () => {
    return axios.get('${API_URL}/api/list-carusage-select')
}

export const updateCarUsage = async (token, id, usage) => {
    return axios.put(`${API_URL}/api/update-carusage/${id}`, { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarUsage = async (token, id) => {
    return axios.delete(`${API_URL}/api/delete-carusage/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}