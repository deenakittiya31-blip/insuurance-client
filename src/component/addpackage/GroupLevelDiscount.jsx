import useInsureAuth from "../../store/auth-store"
import TextInput from "../form/TextInput"

const GroupLevelDiscount = ({ group, groups, onUpdate }) => {
    const user = useInsureAuth((s) => s.user)
    const isAdmin = user?.role === 'admin'
    return (
        <div>
            <h1 className='title text-main'>ส่วนลดเลเวลลูกค้า</h1>
            <div className="grid grid-cols-5 gap-3">
                {
                    group.map((i) => (
                        <div key={i.id}>
                            <TextInput
                                width='w-full'
                                name={`group_${i.id}`}
                                title={i.group_name}
                                type='number'
                                disabled={!isAdmin}
                                onChange={e =>
                                    onUpdate(i.group_code, 'discount_percent', e.target.value)
                                }
                                value={
                                    groups.find(g => g.group_code === i.group_code)
                                        ?.discount_percent || ''
                                }

                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default GroupLevelDiscount