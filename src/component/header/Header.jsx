import Logo from '../../assets/logo.svg'
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillSmile } from "react-icons/ai";
import { createCompare } from '../../service/compare';
import { useState } from 'react';
import useActionStore from '../../store/action-store';
import ModalCompare from '../modal/ModalCompare'
import { IoSettings } from "react-icons/io5";

const initialState = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
    sub_car_model: ''
}

const Header = () => {
    const token = useInsureAuth((s) => s.token)
    const user = useInsureAuth((s) => s.user)
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState)
    const { getCarModelSelect } = useActionStore();



    const hdlOnChange = async (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const hdlSelectChange = async (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'car_brand_id' && { car_model_id: '' })
        }))

        if (name === 'car_brand_id') {
            await getCarModelSelect(value)
        }
    }


    const hdlOnClose = () => {
        setForm(initialState)
        document.getElementById('modalcompare').close()
    }

    const hldOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                offer: user.name
            };

            const res = await createCompare(token, payload)
            document.getElementById('modalcompare').close()
            setForm(initialState)
            toast.success('สร้างใบเสนอราคาเรียบร้อย')

            navigate(`/admin/quotation/${res.data.q_id}`)
        } catch (err) {
            console.log(err)
            toast.error('สร้างใบเสนอราคาไม่สำเร็จ')
        }
    }

    return (
        <header className='flex justify-between items-center px-5 py-3 font-prompt'>
            <div className='flex items-center gap-20'>
                <div className='flex items-center gap-5'>
                    <img src={Logo} className='w-10 rounded-md' />
                    <h1 className='font-bold text-3xl text-main'>DEENA</h1>
                </div>
                <h1 className='hidden lg:block flex-1 font-semibold text-2xl text-text-primary'>ยินดีต้อนรับ <span className='capitalize'>{user?.name} !</span></h1>
            </div>

            <div className='flex gap-5 items-center'>
                <div className='flex gap-3 items-center'>
                    <div className='flex justify-center items-center rounded-full border border-main w-10 h-10 overflow-hidden'>
                        {
                            user?.image
                                ? <img src={user.image} className='object-cover' />
                                : <AiFillSmile className='fill-main size-6' />
                        }

                    </div>
                    <div>
                        <p className='text-text-primary text-sm font-semibold capitalize'>{user?.name}</p>
                        <p className='text-xs text-border'>{user?.role}</p>
                    </div>
                </div>
                {/* สร้างเลขใบเสนอราคา */}
                <ModalCompare
                    form={form}
                    onChange={hdlOnChange}
                    onChangeSelect={hdlSelectChange}
                    onClose={hdlOnClose}
                    onSubmit={hldOnSubmit}
                    setForm={setForm}
                />
                <div>
                    <Link to='/admin/setting' >
                        <button className='btn flex items-center gap-3 bg-white px-3 rounded-md text-main'>
                            <IoSettings /> ตั้งค่า
                        </button>

                    </Link>

                </div>
            </div>
        </header >
    )
}

export default Header