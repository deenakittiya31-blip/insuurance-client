import axios from "axios";
import { API_URL } from "../config/api";
import api from '../config/axios'

export const registerMember = (payload) => {
    return axios.post(`${API_URL}/api/register-member`, payload)
}

export const listMember = () => {
    return api.get('/api/list-member')
}

export const sendImageToMember = (members, imageUrl) => {
    return api.post('/api/sendimage-tomember', { members, imageUrl })
}