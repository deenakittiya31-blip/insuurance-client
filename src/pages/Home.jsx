import Title from "../component/form/Title"

const Home = () => {
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ข้อมูลลูกค้า'
                />
            </div>
        </div>
    )
}
export default Home