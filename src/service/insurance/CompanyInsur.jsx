import axios from "axios";
import { API_URL } from "../../config/api";

export const createCompany = (token, form) => {
    return axios.post(`${API_URL}/api/create-company`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCompany = () => {
    return axios.get(`${API_URL}/api/list-company`)
}

export const listCompanySelect = () => {
    return axios.get(`${API_URL}/api/list-company-select`)
}

export const readCompany = (token, id) => {
    return axios.get(`${API_URL}/api/read-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompany = (token, id, form) => {
    return axios.put(`${API_URL}/api/update-company/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompany = (token, id) => {
    return axios.delete(`${API_URL}/api/delete-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}