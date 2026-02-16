import api from "../config/axios";

export const readProfile = () => {
    return api.get('/api/read-profile')
}

export const updateProfile = (data) => {
    return api.put('/api/update-profile', data)
}