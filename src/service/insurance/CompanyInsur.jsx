import axios from "axios";
import api from "../../config/axios";
import { API_URL } from "../../config/api";

export const createCompany = (token, form) => {
    return api.post('/api/create-company', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCompany = (pageNumber) => {
    return api.get(`/api/list-company/page?page=${pageNumber}&per_page=10`)
}

export const listCompanySelect = () => {
    return api.get('/api/list-company-select')
}

export const readCompany = (token, id) => {
    return api.get(`/api/read-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompany = (token, id, form) => {
    return api.put(`/api/update-company/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompany = (token, id) => {
    return api.delete(`/api/delete-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}