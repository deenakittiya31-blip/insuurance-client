import axios from 'axios'

export const createCompulsory = async (token, form) => {
    return axios.post('http://localhost:5000/api/create-compulsory', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const ListCompulsory = async () => {
    return axios.get('http://localhost:5000/api/list-compulsory')
}

export const readCompulsory = async (token, id) => {
    return axios.get(`http://localhost:5000/api/read-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompulsory = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-compulsory/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompulsory = async (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}