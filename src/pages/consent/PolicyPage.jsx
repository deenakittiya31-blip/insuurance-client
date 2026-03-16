import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { getPolicyList, createPolicy, updatePolicy, publishPolicy, deletePolicy } from '../../service/policy'
import Title from '../../component/form/Title'

const POLICY_TYPES = [
    { value: 'privacy', label: 'นโยบายความเป็นส่วนตัว' },
    { value: 'terms', label: 'ข้อกำหนดในการให้บริการ' },
    { value: 'cookie', label: 'นโยบายการใช้คุกกี้' },
]

// Editor Component
const RichEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    })

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || '')
        }
    }, [content])

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
                {[
                    { label: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
                    { label: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
                    { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
                    { label: 'H3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive('heading', { level: 3 }) },
                    { label: '• List', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
                    { label: '1. List', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
                ].map((btn) => (
                    <button
                        key={btn.label}
                        type="button"
                        onClick={btn.action}
                        className={`px-2 py-1 text-sm rounded font-medium transition ${btn.active ? 'bg-main text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
            <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none p-3 min-h-40 focus:outline-none font-kanit"
            />
        </div>
    )
}

// Form Component
const PolicyForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState(initial || {
        policy_type: 'privacy',
        title_th: '',
        title_en: '',
        content_th: '',
        content_en: '',
        version: '1.0',
    })

    const hdlChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const hdlSubmit = async (e) => {
        e.preventDefault()
        await onSave(form)
    }

    return (
        <form onSubmit={hdlSubmit} className="flex flex-col gap-4 font-kanit">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">ประเภทนโยบาย</label>
                    <select
                        name="policy_type"
                        value={form.policy_type}
                        onChange={hdlChange}
                        disabled={!!initial}
                        className="select select-bordered w-full mt-1"
                    >
                        {POLICY_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Version</label>
                    <input
                        name="version"
                        value={form.version}
                        onChange={hdlChange}
                        className="input input-bordered w-full mt-1"
                        placeholder="เช่น 1.0, 1.1, 2.0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">ชื่อ (ภาษาไทย)</label>
                    <input name="title_th" value={form.title_th} onChange={hdlChange} className="input input-bordered w-full mt-1" placeholder="นโยบายความเป็นส่วนตัว" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">ชื่อ (English)</label>
                    <input name="title_en" value={form.title_en} onChange={hdlChange} className="input input-bordered w-full mt-1" placeholder="Privacy Policy" />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">เนื้อหา (ภาษาไทย)</label>
                <RichEditor content={form.content_th} onChange={(val) => setForm(f => ({ ...f, content_th: val }))} />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">เนื้อหา (English)</label>
                <RichEditor content={form.content_en} onChange={(val) => setForm(f => ({ ...f, content_en: val }))} />
            </div>

            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="btn btn-outline">ยกเลิก</button>
                <button type="submit" className="btn bg-main text-white">บันทึก</button>
            </div>
        </form>
    )
}

// Main Page
const PolicyManage = () => {
    const [activeType, setActiveType] = useState('privacy')
    const [policies, setPolicies] = useState([])
    const [mode, setMode] = useState('list')   // list | create | edit
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        fetchList()
    }, [activeType])

    const fetchList = async () => {
        try {
            const res = await getPolicyList(activeType)
            setPolicies(res.data.policies)
        } catch (err) {
            toast.error('โหลดข้อมูลไม่สำเร็จ')
        }
    }

    console.log(activeType)
    const hdlSave = async (form) => {
        try {
            if (selected) {
                await updatePolicy(selected.id, form)
                toast.success('อัปเดตสำเร็จ')
            } else {
                await createPolicy(form)
                toast.success('สร้างสำเร็จ')
            }
            setMode('list')
            setSelected(null)
            fetchList()
        } catch (err) {
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    const hdlPublish = async (id) => {
        const result = await Swal.fire({
            title: 'Publish version นี้?',
            text: 'version เก่าที่ใช้งานอยู่จะถูกปิด',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Publish',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#16a34a',
        })
        if (!result.isConfirmed) return
        try {
            await publishPolicy(id)
            toast.success('Publish สำเร็จ')
            fetchList()
        } catch (err) {
            toast.error('เกิดข้อผิดพลาด')
        }
    }

    const hdlDelete = async (id) => {
        const result = await Swal.fire({
            title: 'ลบ version นี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก',
        })
        if (!result.isConfirmed) return
        try {
            await deletePolicy(id)
            toast.success('ลบสำเร็จ')
            fetchList()
        } catch (err) {
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    return (
        <div className="flex flex-col gap-5 h-auto p-5 font-prompt">
            <div className='flex items-center justify-between'>
                <Title
                    title='จัดการนโยบาย'
                />
                {mode === 'list' && (
                    <button onClick={() => { setSelected(null); setMode('create') }} className="btn bg-main text-white">
                        + สร้าง version ใหม่
                    </button>
                )}
            </div>

            {/* Tab เลือกประเภท */}
            {mode === 'list' && (
                <>
                    <div role="tablist" className="tabs tabs-border">
                        {POLICY_TYPES.map(t => (
                            <button
                                key={t.value}
                                onClick={() => setActiveType(t.value)}
                                className={`tab text-base text-gray-400 ${activeType === t.value ? 'tab-active font-semibold text-text-primary' : ''}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* ตาราง list */}
                    <div className='bg-white rounded-2xl p-5'>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className='font-medium text-neutral-400'>Version</th>
                                        <th className='font-medium text-neutral-400'>ชื่อ</th>
                                        <th className='font-medium text-neutral-400 text-center'>สถานะ</th>
                                        <th className='font-medium text-neutral-400 text-center'>Publish เมื่อ</th>
                                        <th className='font-medium text-neutral-400 text-center'>สร้างเมื่อ</th>
                                        <th className='font-medium text-neutral-400'>จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {policies.map(p => (
                                        <tr key={p.id} className='text-text-primary'>
                                            <td className="font-medium">{p.version}</td>
                                            <td>{p.title_th}</td>
                                            <td className='text-center'>
                                                {p.is_active
                                                    ? <span className="badge badge-success text-white">Active</span>
                                                    : <span className="badge badge-ghost">Draft</span>
                                                }
                                            </td>
                                            <td className="text-center">
                                                {p.published_at ? new Date(p.published_at).toLocaleDateString('th-TH') : '-'}
                                            </td>
                                            <td className="text-center">
                                                {new Date(p.created_at).toLocaleDateString('th-TH')}
                                            </td>
                                            <td>
                                                <div className="flex gap-1">
                                                    {!p.is_active && (
                                                        <button onClick={() => hdlPublish(p.id)} className="btn btn-sm btn-success text-white">
                                                            Publish
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => { setSelected(p); setMode('edit') }}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        แก้ไข
                                                    </button>
                                                    {!p.is_active && (
                                                        <button onClick={() => hdlDelete(p.id)} className="btn btn-sm btn-error text-white">
                                                            ลบ
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {policies.length === 0 && (
                                        <tr><td colSpan={6} className="text-center text-gray-400 py-8">ยังไม่มีข้อมูล</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Form สร้าง/แก้ไข */}
            {(mode === 'create' || mode === 'edit') && (
                <div className="bg-white rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold mb-4">
                        {mode === 'create' ? 'สร้าง version ใหม่' : `แก้ไข version ${selected?.version}`}
                    </h2>
                    <PolicyForm
                        initial={selected}
                        onSave={hdlSave}
                        onCancel={() => { setMode('list'); setSelected(null) }}
                    />
                </div>
            )}
        </div>
    )
}

export default PolicyManage