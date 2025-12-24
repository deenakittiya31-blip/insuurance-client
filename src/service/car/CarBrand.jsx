import axios from 'axios'

export const createCarBrand = (token, form) => {
    return axios.post('http://localhost:5000/api/create-carbrand', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarBrand = () => {
    return axios.get('http://localhost:5000/api/list-carbrand')
}

export const listCarBrandSelect = () => {
    return axios.get('http://localhost:5000/api/list-carbrand-select')
}

export const readCarBrand = (token, id) => {
    return axios.get(`http://localhost:5000/api/read-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCarBrand = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-carbrand/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarBrand = (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}