import axios from 'axios'

export const createCarModel = async (token, form) => {
    return axios.post('http://localhost:5000/api/create-carmodel', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarModel = async (pageNumber) => {
    return axios.get(`http://localhost:5000/api/list-carmodel/page?page=${pageNumber}&per_page=10`)
}

export const updateCarModel = async (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-carmodel/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarModel = async (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-carmodel/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}