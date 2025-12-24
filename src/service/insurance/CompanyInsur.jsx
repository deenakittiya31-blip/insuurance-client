import axios from "axios";

export const createCompany = (token, form) => {
    return axios.post('http://localhost:5000/api/create-company', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCompany = () => {
    return axios.get('http://localhost:5000/api/list-company')
}

export const listCompanySelect = () => {
    return axios.get('http://localhost:5000/api/list-company-select')
}

export const readCompany = (token, id) => {
    return axios.get(`http://localhost:5000/api/read-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompany = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-company/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompany = (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}