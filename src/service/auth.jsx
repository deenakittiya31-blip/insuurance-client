import axios from "axios";

export const login = async (form) => {
    return axios.post('http://localhost:5000/api/login', form)
}

export const loginWithLine = async (form) => {
    return axios.post('http://localhost:5000/api/login-line', form)
}

export const loginWithGoogle = async (credential) => {
    return axios.post('http://localhost:5000/api/login-google', { credential })
}

export const register = async (form) => {
    return axios.post('http://localhost:5000/api/register', form)
}