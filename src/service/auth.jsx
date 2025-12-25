import axios from "axios";
import { API_URL } from "../config/api";


export const login = async (form) => {
    return axios.post(`${API_URL}/api/login`, form)
}

export const currentUser = async (token) => {
    return axios.post(`${API_URL}/api/current-user`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const loginWithLine = async (form) => {
    return axios.post(`${API_URL}/api/login-line`, form)
}

export const loginWithGoogle = async (credential) => {
    return axios.post(`${API_URL}/api/login-google`, { credential })
}

export const register = async (form) => {
    return axios.post(`${API_URL}/api/register`, form)
}