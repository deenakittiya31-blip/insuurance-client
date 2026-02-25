import TextInput from "../form/TextInput"

const GroupLevelDiscount = ({ group, groups, onUpdate }) => {
    return (
        <div>
            <h1 className='title text-main'>ส่วนลดเลเวลลูกค้า</h1>
            <div className="grid grid-cols-5 gap-3">
                {
                    group.map((i) => (
                        <div key={i.id}>
                            <TextInput
                                width='w-full'
                                name='thirdparty_injury_death_per_person'
                                title={i.group_name}
                                type='number'
                                onChange={e =>
                                    onUpdate(i.id, 'discount_percent', e.target.value)
                                }
                                value={
                                    groups.find(g => g.group_id === i.id)
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