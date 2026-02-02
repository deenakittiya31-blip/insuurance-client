import api from '../config/axios'

export const listPayment = () => {
    return api.get('/api/list-payment')
}