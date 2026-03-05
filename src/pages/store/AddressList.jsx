import React, { useEffect, useState } from "react";
import TabBackward from '../../component/mobile/TabBackward'
import { listAddress, removeAddress, setDefaultAddress } from "../../service/member/address";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AddressList = () => {
    const [address, setAddress] = useState([])

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await listAddress()
                setAddress(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchAddress();
    }, [])

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

        setAddress(prev => prev.filter(a => a.id !== id))

        try {
            const res = await removeAddress(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }
    console.log(address)

    const handleSetDefault = async (id) => {
        setAddress(prev =>
            prev.map(a => ({ ...a, is_default: a.id === id }))
        )

        try {
            const res = await setDefaultAddress(id)
            toast.success(res.data.msg)
        } catch (err) {
            // Rollback ถ้า API ล้มเหลว
            toast.error('เกิดข้อผิดพลาด')
            const res = await listAddress()
            setAddress(res.data.data)
        }
    }
    return (
        <div>
            <TabBackward
                linkTo='/store'
                title='ที่อยู่ของฉัน'
            />
            <div className="p-5 font-prompt space-y-3">
                <div className="flex justify-end">
                    <Link to='/store/create-address'>
                        <button className="btn text-white bg-main"><IoMdAdd /> เพิ่มที่อยู่</button>
                    </Link>
                </div>
                <div className="space-y-3">
                    {
                        address.map((i) => (
                            <div key={i.id} className="card w-full bg-base-100 card-xs">
                                <div className="card-body">
                                    <div className="flex gap-3 items-start">
                                        <input
                                            type="radio"
                                            name="default_address"
                                            className="radio radio-sm radio-success"
                                            checked={i.is_default}
                                            onChange={() => handleSetDefault(i.id)}
                                        />
                                        <div className="w-full">
                                            <div className="space-y-1">
                                                <h2 className="card-title text-text-primary">{i.full_name} <span className="font-normal text-gray-400 text-xs">| {i.phone}</span></h2>
                                                <p className="text-gray-400">{i.address_line}</p>
                                                <p className="text-gray-400">ตำบล{i.subdistrict
                                                } อำเภอ{i.district} จังหวัด{i.province} {i.
                                                    zipcode}</p>
                                            </div>

                                            <div className="flex gap-2 justify-end mt-2">
                                                <Link to={`/store/address/${i.id}`}>
                                                    <button className="btn btn-xs btn-warning">แก้ไข</button>
                                                </Link>
                                                <button onClick={() => handleDelete(i.id)} className="btn btn-xs btn-erro">ลบ</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default AddressList