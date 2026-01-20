import axios from "axios";
import { API_URL } from "../config/api";

export const registerMember = (payload) => {
    return axios.post(`${API_URL}/api/register-member`, payload)
}