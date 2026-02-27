import axios from "axios";
import { API_URL } from "../config/api";
import api from '../config/axios'

export const registerMember = (payload) => {
    return axios.post(`${API_URL}/api/register-member`, payload)
}

export const readMember = (id) => {
    return api.get(`/api/read-member/${id}`)
}

export const updateMember = (id, form) => {
    return api.patch(`api/update-member/${id}`, form)
}

export const deleteMember = (id) => {
    return api.delete(`api/delete-member/${id}`)
}

export const listMember = ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = '',
    group_id = []
}) => {
    return api.get('/api/list-members', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined,
            group_id: group_id.length > 0
                ? group_id.join(',')
                : undefined
        }
    })
}


export const sendDocumentToMember = (members, q_id, mode) => {
    return api.post('/api/sendDocument-tomember', {
        members,
        q_id,
        mode
    })
}

export const statusMember = (id, is_active) => {
    return api.put(`/api/status-member/${id}`, { is_active })
}