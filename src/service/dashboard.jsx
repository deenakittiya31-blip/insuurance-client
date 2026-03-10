import api from '../config/axios'

export const dashboard = () => {
    return api.get('/api/dashboard/summary')
}