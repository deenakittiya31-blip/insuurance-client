import axios from 'axios'

export const createCarType = async (token, type) => {
    return axios.post('http://localhost:5000/api/create-cartype', { type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarType = async () => {
    return axios.get('http://localhost:5000/api/list-cartype')
}

export const updateCarType = async (token, id, type) => {
    return axios.put(`http://localhost:5000/api/update-cartype/${id}`, { type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarType = async (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-cartype/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}