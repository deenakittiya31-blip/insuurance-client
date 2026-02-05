import api from '../../config/axios'

export const createPackage = (form) => {
    return api.post('/api/create-package', form)
}

export const listPackage = (pageNumber, perPage, sortKey, sortDirection) => {
    return api.get('/api/list-package/page', {
        params: {
            page: pageNumber,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
}

export const listPackageSelect = () => {
    return api.get('/api/list-package-select')
}

export const readPackage = (id) => {
    return api.get(`/api/read-package/${id}`)
}

export const readPackageEdit = (id) => {
    return api.get(`/api/readedit-package/${id}`)
}

export const updatePackage = (id, form) => {
    return api.patch(`/api/update-package/${id}`, form)
}

export const removePackage = (id) => {
    return api.delete(`/api/delete-package/${id}`)
}

export const statusPackage = (id, is_active) => {
    return api.put(`/api/status-package/${id}`, { is_active })
}