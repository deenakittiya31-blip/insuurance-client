import axios from 'axios'
import { API_URL } from '../../config/api'

export const createPackage = (token, form) => {
    return axios.post(`${API_URL}/api/create-package`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPackage = (pageNumber) => {
    return axios.get(`${API_URL}/api/list-package/page?page=${pageNumber}&per_page=10`)
}

export const listPackageSelect = () => {
    return axios.get(`${API_URL}/api/list-package-select`)
}

export const readPackage = (token, id) => {
    return axios.get(`${API_URL}/api/read-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePackage = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-package/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePackage = (token, id) => {
    return axios.delete(`${API_URL}/api/delete-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}