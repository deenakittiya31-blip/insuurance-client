import { useState } from "react"
import NameTable from "../../component/form/NameTable"
import TextInput from "../../component/form/TextInput"
import { createTag, listTag, removeTag, statusTag, updateTag } from "../../service/member/tag"
import toast from "react-hot-toast"
import TableTag from "../../component/table/TableTag"
import { useEffect } from "react"
import Title from "../../component/form/Title"
import Swal from "sweetalert2"
import SelectPerPage from "../../component/form/SelectPerPage"
import Pagination from "../../component/paginationComponent/Pagination"
import ModalAddTagMember from "../../component/modal/ModalAddTagMember"

const tagPage = () => {
    const [tag, setTag] = useState('')
    const [tagData, setTagData] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getTag(page, perPage, sortConfig.key, sortConfig.direction);
    }, [page, perPage, sortConfig])


    const getTag = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listTag(page, perPage, sortKey, sortDirection)
            setTagData(res.data.data)
            setTotal(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!tag.trim()) {
            return toast('กรุณากรอกข้อมูล')
        }

        try {
            const res = await createTag(tag)
            toast.success(res.data.msg)
            getTag(page, perPage, sortConfig.key, sortConfig.direction);
            setTag('')
        } catch (err) {
            console.log(err)
            toast.error('ไม่สามารถสร้างได้')
        }
    }

    const hdlDelete = async (id) => {
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
            const res = await removeTag(id)
            getTag(page, perPage, sortConfig.key, sortConfig.direction);
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateTag = async (id, value) => {
        try {
            const res = await updateTag(id, value)
            toast.success(res.data.msg)
            getTag(page, perPage, sortConfig.key, sortConfig.direction);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentState) => {
        try {
            const res = await statusTag(id, !currentState)
            toast.success(res.data.msg)
            getTag(page, perPage, sortConfig.key, sortConfig.direction);
        } catch (err) {
            console.log(err)
            toast.error('ไม่สามารถอัปเดตสถานะได้')
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ป้ายกำกับลูกค้า'
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-end gap-3'>
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                    <div className="flex items-end gap-1">
                        <form onSubmit={handleSubmit} className='flex items-baseline-last gap-1 font-prompt'>
                            <TextInput
                                value={tag}
                                placeholder='เพิ่มป้ายกำกับ...'
                                width='w-40 lg:w-xs'
                                name='tag_name'
                                type='text'
                                onChange={(e) => setTag(e.target.value)}
                            />
                            <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                        </form>
                        <ModalAddTagMember />
                    </div>
                </div>
                <TableTag
                    data={tagData}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateTag}
                    onToggle={hdlToggleActive}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
            </div>
            <div className='flex justify-end'>
                {
                    total > perPage && (
                        <Pagination
                            disablePrev={page === 1}
                            disableNext={page === lastPage}
                            onPrevious={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default tagPage