import api from '../../config/axios'

export const createPackage = (token, form) => {
    return api.post('/api/create-package', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPackage = (pageNumber) => {
    return api.get(`/api/list-package/page?page=${pageNumber}&per_page=10`)
}

export const listPackageSelect = () => {
    return api.get('/api/list-package-select')
}

export const readPackage = (token, id) => {
    return api.get(`/api/read-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePackage = (token, id, form) => {
    return api.put(`/api/update-package/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePackage = (token, id) => {
    return api.delete(`/api/delete-package/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}