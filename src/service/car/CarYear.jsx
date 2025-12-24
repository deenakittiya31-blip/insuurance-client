import axios from 'axios'
import { API_URL } from '../../config/api'

export const createYear = async (token, year) => {
    return axios.post(`${API_URL}/api/create-year`, { year }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listYear = async (pageNumber) => {
    return axios.get(`${API_URL}/api/list-year/page?page=${pageNumber}&per_page=5`)
}

export const updateYear = async (token, id, year) => {
    return axios.put(`${API_URL}/api/update-year/${id}`, { year }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeYear = async (token, id) => {
    return axios.delete(`${API_URL}/api/delete-year/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}