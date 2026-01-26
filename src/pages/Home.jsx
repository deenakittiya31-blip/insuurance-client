import { useState, useEffect } from "react"
import Title from "../component/form/Title"
import { listMember } from "../service/member"
import TableMemberList from "../component/table/TableMemberList"
import NameTable from "../component/form/NameTable"
import SelectPerPage from "../component/form/SelectPerPage"
import Pagination from "../component/paginationComponent/Pagination"

const Home = () => {
    const [member, setMember] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const lastPage = Math.ceil(total / perPage)
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        getMember(page, perPage, sortConfig.key, sortConfig.direction)
    }, [page, perPage, sortConfig])

    const getMember = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listMember(page, perPage, sortKey, sortDirection)
            setMember(res.data.data)
            setTotal(res.data.total)

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


    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ข้อมูลลูกค้า'
                />
            </div>
            <div className='flex flex-col gap-3 bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='👩‍🦰'
                        name='ตารางข้อมูลลูกค้า'
                    />
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TableMemberList
                    data={member}
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
export default Home