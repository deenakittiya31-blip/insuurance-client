import axios from 'axios'

export const createCarUsage = async (token, usage) => {
    return axios.post('http://localhost:5000/api/create-carusage', { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarUsage = async (pageNumber) => {
    return axios.get(`http://localhost:5000/api/list-carusage/page?page=${pageNumber}&per_page=5`)
}

export const listCarUsageSelect = () => {
    return axios.get('http://localhost:5000/api/list-carusage-select')
}

export const updateCarUsage = async (token, id, usage) => {
    return axios.put(`http://localhost:5000/api/update-carusage/${id}`, { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarUsage = async (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-carusage/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}