import { useEffect, useState } from "react"
import NameTable from "../../component/form/NameTable"
import Title from "../../component/form/Title"
import ModalBank from "../../component/modal/ModalBank"
import toast from "react-hot-toast"
import { createBank, createGroupCredit, editGroup, listBank, listBankSelect, listGroupCredit, readBank, readToSeeGroup, removeBank, removeGroupCredit, statusBank, statusGroupCredit, updateBank, updateGroupCredit } from "../../service/bank/bankandcardsevice"
import Swal from "sweetalert2"
import TableBank from "../../component/table/TableBank"
import SearchBox from "../../component/quotation_about/SearchBox"
import SelectPerPage from "../../component/form/SelectPerPage"
import EditBank from "../../component/edit/EditBank"
import Pagination from "../../component/paginationComponent/Pagination"
import ModalCreditInstall from "../../component/modal/ModalCreditInstall"
import TableGroupCredit from "../../component/table/TableGroupCredit"
import EditCreditInstall from "../../component/edit/EditCreditInstall"
import useCreditForm from "../../hooks/useCreditForm"

const initialState = {
    bank_name: '',
    logo_url: null,
    logo_public_id: '',
}

const initialBank = { bank_id: '', ins_month: ['', '', ''] }

const initialForm = {
    group_name: '',
    ins_bank: [{ ...initialBank }]
}

const BankAndCard = () => {
    //bank state
    const [bank, setBank] = useState([])
    const [bankSelect, setBankSelect] = useState([])
    const [form, setForm] = useState(initialState)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [textSearch, setTextSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(false)

    //group state
    const [group, setGroup] = useState([])
    const [readGroup, setReadGroup] = useState([])

    const [paginationGroup, setPaginationGroup] = useState({})
    const [debouncedGroup, setDebouncedGroup] = useState('')
    const [textGroup, setTextGroup] = useState('')
    const [perPageGroup, setPerPageGroup] = useState(10)
    const [pageGroup, setPageGroup] = useState(1)

    const [editId, setEditId] = useState(null)
    const [openGroup, setOpenGroup] = useState(false)

    const [formGroup, setFormGroup] = useState(initialForm)
    const [formEdit, setFormEdit] = useState(initialForm)

    const createActions = useCreditForm(setFormGroup)
    const editActions = useCreditForm(setFormEdit)

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedGroup(textGroup)
        }, 500)
        return () => clearTimeout(delay)
    }, [textGroup])

    useEffect(() => {
        getBank();
    }, [page, perPage, sortConfig, debouncedSearch])

    useEffect(() => {
        getGroupCredit();
    }, [pageGroup, perPageGroup, debouncedGroup])

    useEffect(() => {
        fetchBankSelect()
    }, [])

    const getBank = async () => {
        try {
            const res = await listBank({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch,
            })
            setBank(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        console.log(id)
        try {
            const res = await readBank(id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createBank(form)
            const newTag = res.data.data
            setBank(prev => [newTag, ...prev])
            setPagination(prev => ({
                ...prev,
                totalItems: prev.totalItems + 1
            }))
            setForm(initialState)
            document.getElementById('modalbank').close()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err?.respone?.data.message)
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

        setBank(prev => prev.filter(item => item.id !== id))
        setPagination(prev => ({
            ...prev,
            totalItems: prev.totalItems - 1
        }))
        try {
            const res = await removeBank(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }


    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        setBank(prev => prev.map(item =>
            item.id === idSelect ? { ...item, bank_name: form.bank_name } : item
        ))
        closeForm()
        try {
            const res = await updateBank(idSelect, form)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            getBank()
            toast.error('แก้ไขไม่สำเร็จ')
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        setBank(prev => prev.map(item =>
            item.id === id ? { ...item, is_active: !currentStatus } : item
        ))
        try {
            await statusBank(id, !currentStatus)
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            setBank(prev => prev.map(item =>
                item.id === id ? { ...item, is_active: currentStatus } : item
            ))
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    //ฟังก์ชันเพิ่มข้อมูลชุดบัตรเครดิต
    const fetchBankSelect = async () => {
        try {
            const res = await listBankSelect()
            setBankSelect(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getGroupCredit = async () => {
        try {
            const res = await listGroupCredit({
                page: pageGroup,
                limit: perPageGroup,
                search: debouncedGroup,
            })
            setGroup(res.data.data)
            setPaginationGroup(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formGroup)
        try {
            const res = await createGroupCredit(formGroup)
            toast.success(res.data.msg)
            getGroupCredit()
            handleCloseFormGroup()
        } catch (err) {
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    const handleCloseFormGroup = () => {
        setFormGroup(initialForm)
        document.getElementById('modalCredit').close()
    }

    const hdlDeleteGroup = async (id) => {
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

        setGroup(prev => prev.filter(item => item.id !== id))
        setPaginationGroup(prev => ({
            ...prev,
            totalItems: prev.totalItems - 1
        }))
        try {
            const res = await removeGroupCredit(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActiveGroup = async (id, currentStatus) => {
        setGroup(prev => prev.map(item =>
            item.id === id ? { ...item, is_active: !currentStatus } : item
        ))
        try {
            const res = await statusGroupCredit(id, !currentStatus)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            setGroup(prev => prev.map(item =>
                item.id === id ? { ...item, is_active: currentStatus } : item
            ))
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    const handlePerPageChangeGroup = (e) => {
        setPerPageGroup(Number(e.target.value))
        setPageGroup(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const openReadGroup = async (id) => {
        document.getElementById('modalCardGroup').showModal()

        try {
            const res = await readToSeeGroup(id)
            setReadGroup(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const openModalGroup = async (id) => {
        setOpenGroup(true)
        setEditId(id)
        try {
            const res = await readToSeeGroup(id)
            const data = res.data.data
            //แปลง bankInGroup → ins_bank format
            setFormEdit({
                group_name: data.group_name,
                ins_bank: data.bankingroup
                    .map(b => ({
                        bank_id: b.bank_id,
                        ins_month: b.installment_month
                    }))
            })
        } catch (err) {
            console.log(err)
        }
    }


    const closeFormGroup = () => {
        setOpenGroup(false)
        setFormEdit(initialForm)
    }

    const handleUpdateGroup = async (e) => {
        e.preventDefault()
        try {
            const res = await updateGroupCredit(editId, formEdit)
            toast.success(res.data.msg)
            getGroupCredit()
            closeFormGroup()
        } catch (err) {
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ธนาคารและการจัดการงวดบัตรเครดิต'
                />
            </div>
            {/* ส่วนจัดการงวด */}
            <div className='bg-white rounded-2xl p-5'>
                <div className="flex justify-end">
                    <ModalCreditInstall
                        banks={bankSelect}
                        form={formGroup}
                        onChangeName={createActions.handleChangeName}
                        onAddBank={createActions.addBank}
                        onRemoveBank={createActions.removeBankForm}
                        onChangeBank={createActions.handleChangeBank}
                        onAddMonth={createActions.addMonth}
                        onChangeMonth={createActions.handleChangeMonth}
                        onSubmit={handleSubmit}
                        onClose={handleCloseFormGroup}
                    />
                </div>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='💳'
                        name='ตารางชุดบัตรเครดิต'
                    />
                    <div className='flex items-end gap-5'>
                        <SearchBox
                            width='md:w-sm'
                            placeholder='ค้นหา...'
                            onChange={(e) => setTextGroup(e.target.value)}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChangeGroup}
                            perPage={perPageGroup}
                        />
                    </div>
                </div>
                <TableGroupCredit
                    data={group}
                    onDelete={hdlDeleteGroup}
                    onToggle={hdlToggleActiveGroup}
                    onRead={openReadGroup}
                    readData={readGroup}
                    onEdit={openModalGroup}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {group.length} จาก {paginationGroup.totalItems || 0} รายการ
                    (หน้า {paginationGroup.page || 1} / {paginationGroup.totalPages || 1})
                </div>
                {
                    paginationGroup.totalItems > perPageGroup && (
                        <Pagination
                            disablePrev={!paginationGroup.hasPrevPage}
                            disableNext={!paginationGroup.hasNextPage}
                            onPrevious={() => setPageGroup(prev => prev - 1)}
                            onNext={() => setPageGroup(prev => prev + 1)}
                        />
                    )
                }
            </div>
            {/* ส่วนของ master data */}
            <div>
                <div className='bg-white rounded-2xl p-5'>
                    <div className="flex justify-end">
                        <ModalBank
                            form={form}
                            setForm={setForm}
                            onChange={handleOnChange}
                            onSubmit={handleOnSubmit}
                        />
                    </div>
                    <div className='flex justify-between items-baseline-last'>
                        <NameTable
                            icon='🏦'
                            name='ตารางธนาคาร'
                        />
                        <div className='flex items-end gap-5'>
                            <SearchBox
                                width='md:w-sm'
                                placeholder='ค้นหา...'
                                onChange={(e) => setTextSearch(e.target.value)}
                            />
                            <SelectPerPage
                                onChange={handlePerPageChange}
                                perPage={perPage}
                            />
                        </div>
                    </div>
                    <TableBank
                        data={bank}
                        onDelete={hdlDelete}
                        onEdit={openModal}
                        page={page}
                        limit={perPage}
                        onToggle={hdlToggleActive}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                </div>
                <div className='flex justify-between mt-3'>
                    <div className="font-prompt text-sm text-gray-600">
                        แสดง {bank.length} จาก {pagination.totalItems || 0} รายการ
                        (หน้า {pagination.page || 1} / {pagination.totalPages || 1})
                    </div>
                    {
                        pagination.totalItems > perPage && (
                            <Pagination
                                disablePrev={!pagination.hasPrevPage}
                                disableNext={!pagination.hasNextPage}
                                onPrevious={() => setPage(prev => prev - 1)}
                                onNext={() => setPage(prev => prev + 1)}
                            />
                        )
                    }
                </div>
            </div>

            <EditBank
                form={form}
                setForm={setForm}
                onChange={handleOnChange}
                isOpen={open}
                onClose={closeForm}
                onSubmit={handleUpdate}
            />
            <EditCreditInstall
                isOpen={openGroup}
                banks={bankSelect}
                form={formEdit}
                onSubmit={handleUpdateGroup}
                onChangeName={editActions.handleChangeName}
                onAddBank={editActions.addBank}
                onRemoveBank={editActions.removeBankForm}
                onChangeBank={editActions.handleChangeBank}
                onAddMonth={editActions.addMonth}
                onChangeMonth={editActions.handleChangeMonth}
                onClose={closeFormGroup}
            />
        </div>
    )
}
export default BankAndCard