import axios from 'axios'

export const createPackage = (token, form) => {
    return axios.post('http://localhost:5000/api/create-package', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPackage = () => {
    return axios.get('http://localhost:5000/api/list-package')
}

export const listPackageSelect = () => {
    return axios.get('http://localhost:5000/api/list-package-select')
}

export const readPackage = (token, id) => {
    return axios.get(`http://localhost:5000/api/read-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePackage = (token, id, form) => {
    return axios.put(`http://localhost:5000/api/update-package/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePackage = (token, id) => {
    return axios.delete(`http://localhost:5000/api/delete-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}