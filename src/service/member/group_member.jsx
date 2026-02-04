import api from "../../config/axios";

export const createGroup = (group_name) => {
    return api.post('/api/create-groupmember', { group_name })
}
export const listGroup = () => {
    return api.get('/api/list-groupmember')
}
export const updateGroup = (id, group_name) => {
    return api.put(`/api/update-groupmember/${id}`, { group_name })
}
export const deleteGroup = (id) => {
    return api.delete(`/api/delete-groupmember/${id}`)
}