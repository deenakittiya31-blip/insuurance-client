import Title from "../../component/form/Title"
import TableModelFields from "../../component/table/TableModelFields"
import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createFieldsModel, deleteFieldModel, readFieldsModel, readModelDetail, updateAdditional, updateFieldsModel } from "../../service/custommodel";
import EditFieldModel from '../../component/edit/editFieldModel'
import toast from "react-hot-toast";
import ModalFieldModel from "../../component/modal/ModalFieldModel";
import Swal from "sweetalert2";
import TextArea from "../../component/form/TextArea";

const initialState = {
    key_name: '',
    description: '',
    example_value: '',
}

const CustomModelDetail = () => {
    const [data, setData] = useState([])
    const [additional, setAdditional] = useState('')
    const [additionalId, setAdditionalId] = useState(null)
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        getModelDetail()
    }, [id])

    const getModelDetail = async () => {
        try {
            const res = await readModelDetail(id)
            setData(res.data.data)
            setAdditional(res.data.additional.additional)
            setAdditionalId(res.data.additional.id)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(additionalId)
    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readFieldsModel(id)
            setForm(res.data.detail)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ...form,
            company_id: id
        }

        try {
            const res = await createFieldsModel(payload)
            document.getElementById('modalfieldmodel').close();
            setForm(initialState)
            getModelDetail();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const res = await updateFieldsModel(idSelect, form)
            toast.success(res.data.msg)
            setForm(initialState)
            closeForm()
            getModelDetail()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจ ?",
            text: "ต้องการจะลบจริง ๆ ใช่ไหม?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#E5E4E2",
            confirmButtonColor: "#d33",
            confirmButtonText: "ลบ",
            cancelButtonText: 'ยกเลิก'
        })

        if (!result.isConfirmed) return

        try {
            const res = await deleteFieldModel(id)
            getModelDetail()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateAdditional = async (e) => {
        e.preventDefault()
        try {
            const res = await updateAdditional(additionalId, additional)
            console.log('UPDATE id:', additionalId)
            getModelDetail()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <Title
                title='การกำหนดค่าฟิลด์'
            />
            <div className='flex flex-col gap-5 bg-white rounded-2xl p-5 '>
                <div>
                    <h3 className="font-semibold text-text-primary tracking-wide">คำแนะนำเพิ่มเติม</h3>
                    <TextArea
                        value={additional}
                        onChange={(e) => setAdditional(e.target.value)}
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handleUpdateAdditional}
                            className="btn btn-sm btn-neutral text-white">บันทึก</button>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-semibold text-text-primary tracking-wide">ฟิดล์ที่ต้องการดึง</h3>
                    <ModalFieldModel
                        value={form}
                        onSubmit={handleSubmit}
                        onChange={hdlOnChange}
                    />
                </div>
                <TableModelFields
                    data={data}
                    onDelete={handleDelete}
                    onEdite={openModal}
                />
            </div>
            <EditFieldModel
                value={form}
                onChange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}
export default CustomModelDetail