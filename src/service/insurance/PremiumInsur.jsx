import axios from "axios";

export const createPremium = (token, form) => {
    return axios.post('http://localhost:5000/api/create-premium', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPremium = () => {
    return axios.get('http://localhost:5000/api/list-premium')
}

export const readPremium = (token, id) => {
    return axios.get(`http://localhost:5000/api/read-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePremium = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-premium/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePremium = (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}