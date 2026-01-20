import axios from "axios";

export const registerMember = (payload) => {
    return axios.post('/api/register-member', payload)
}