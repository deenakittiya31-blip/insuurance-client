import axios from 'axios'
import { API_URL } from '../../config/api'

export const createCompulsory = async (token, form) => {
    return axios.post(`${API_URL}/api/create-compulsory`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const ListCompulsory = async () => {
    return axios.get(`${API_URL}/api/list-compulsory`)
}

export const readCompulsory = async (token, id) => {
    return axios.get(`${API_URL}/api/read-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompulsory = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-compulsory/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompulsory = async (token, id) => {
    return axios.delete(`${API_URL}/api/delete-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}