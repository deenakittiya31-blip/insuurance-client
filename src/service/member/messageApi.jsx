import api from "../../config/axios";

export const sendMessage = (form) => {
    return api.post('/api/send-message', form)
}