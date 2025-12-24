import axios from 'axios'

export const createYear = async (token, year) => {
    return axios.post('http://localhost:5000/api/create-year', { year }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listYear = async (pageNumber) => {
    return axios.get(`http://localhost:5000/api/list-year/page?page=${pageNumber}&per_page=5`)
}

export const updateYear = async (token, id, year) => {
    return axios.put('http://localhost:5000/api/update-year/' + id, { year }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeYear = async (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-year/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}