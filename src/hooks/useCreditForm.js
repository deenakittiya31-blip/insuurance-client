import { useState } from "react"

const initialBank = { bank_id: '', ins_month: ['', '', ''] }

export const initialForm = {
    group_name: '',
    ins_bank: [{ ...initialBank }]
}

const useCreditForm = (setForm) => {

    const handleChangeName = (e) => {
        setForm(prev => ({ ...prev, group_name: e.target.value }))
    }

    const addBank = () => {
        setForm(prev => ({
            ...prev,
            ins_bank: [...prev.ins_bank, { ...initialBank }]
        }))
    }

    const removeBankForm = (index) => {
        setForm(prev => ({
            ...prev,
            ins_bank: prev.ins_bank.filter((_, i) => i !== index)
        }))
    }

    const handleChangeBank = (index, bank_id) => {
        setForm(prev => {
            const updated = [...prev.ins_bank]
            updated[index] = { ...updated[index], bank_id }
            return { ...prev, ins_bank: updated }
        })
    }

    const addMonth = (bankIndex) => {
        setForm(prev => {
            const updated = [...prev.ins_bank]
            updated[bankIndex] = {
                ...updated[bankIndex],
                ins_month: [...updated[bankIndex].ins_month, '']
            }
            return { ...prev, ins_bank: updated }
        })
    }

    const handleChangeMonth = (bankIndex, monthIndex, value) => {
        setForm(prev => {
            const updated = [...prev.ins_bank]
            const months = [...updated[bankIndex].ins_month]
            months[monthIndex] = value ? Number(value) : ''
            updated[bankIndex] = { ...updated[bankIndex], ins_month: months }
            return { ...prev, ins_bank: updated }
        })
    }

    return {
        handleChangeName,
        addBank,
        removeBankForm,
        handleChangeBank,
        addMonth,
        handleChangeMonth
    }
}

export default useCreditForm