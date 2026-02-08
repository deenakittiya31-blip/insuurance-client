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

export const listMemberPagination = (page, perPage, sortKey, sortDirection) => {
    return api.get('/api/list-members', {
        params: {
            page: page,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
}

export const listForMessage = (sortKey, sortDirection, group_id) => {
    const groupIdParams = Array.isArray(group_id) && group_id.length > 0
        ? group_id.join(',')
        : undefined

    return api.get('/api/list-members/message', {
        params: {
            sortKey,
            sortDirection,
            ...(groupIdParams && { group_id: groupIdParams })
        }
    })
}

export const sendDocumentToMember = (members, q_id) => {
    return api.post('/api/sendDocument-tomember', {
        members,
        q_id
    })
}

export const searchMember = async (arg) => {
    return api.post('/api/search-member', arg)
}