import axios from "axios";
import api from "../config/axios";
import { API_URL } from "../config/api";


export const login = (form) => {
    return axios.post(`${API_URL}/api/login`, form)
}

export const statusLoginWith = (token, id, status) => {
    return api.put(`/api/status-loginwith/${id}`, { status }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getLoginWith = () => {
    return api.get('/api/get-loginwith')
}

export const currentUser = () => {
    return api.post('/api/current-user')
}

export const loginWithLine = (form) => {
    return axios.post(`${API_URL}/api/login-line`, form)
}

export const loginWithGoogle = (credential) => {
    return axios.post(`${API_URL}/api/login-google`, { credential })
}

export const register = (form) => {
    return axios.post(`${API_URL}/api/register`, form)
}
