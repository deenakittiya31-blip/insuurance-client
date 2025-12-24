import axios from "axios";

export const creatType = (token, form) => {
    return axios.post('http://localhost:5000/api/create-type', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listType = () => {
    return axios.get('http://localhost:5000/api/list-type')
}

export const listTypeSelect = () => {
    return axios.get('http://localhost:5000/api/list-type-select')
}

export const readType = (token, id) => {
    return axios.get(`http://localhost:5000/api/read-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateType = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-type/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeType = (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}