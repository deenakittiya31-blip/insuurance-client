import axios from 'axios'
import { API_URL } from '../../config/api'

export const createYear = async (token, form) => {
    return axios.post(`${API_URL}/api/create-year`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listYear = async (pageNumber) => {
    return axios.get(`${API_URL}/api/list-year/page?page=${pageNumber}&per_page=10`)
}

export const readYear = async (token, id) => {
    return axios.get(`${API_URL}/api/read-year/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateYear = async (token, id, form) => {
    return axios.put(`${API_URL}/api/update-year/${id}`, form, {
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