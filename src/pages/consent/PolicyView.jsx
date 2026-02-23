// pages/member/PolicyView.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getActivePolicy } from '../../service/policy'
import DOMPurify from 'dompurify'
import TabBackward from '../../component/mobile/TabBackward'

const POLICY_META = {
    privacy: { title: 'นโยบายความเป็นส่วนตัว', titleEn: 'Privacy Policy' },
    terms: { title: 'ข้อกำหนดในการให้บริการ', titleEn: 'Terms of Service' },
    cookie: { title: 'นโยบายการใช้คุกกี้', titleEn: 'Cookie Policy' },
}

// กำหนด config ให้เอา link และ mailto ออก
const sanitize = (html) => DOMPurify.sanitize(html, {
    FORBID_TAGS: ['a'],        // เอา tag <a> ออกทั้งหมด
    FORBID_ATTR: ['href'],     // เอา href ออก
})

const PolicyView = () => {
    const { type } = useParams()   // /policy/privacy | /policy/terms | /policy/cookie
    const [policy, setPolicy] = useState(null)
    const [lang, setLang] = useState('th')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPolicy()
    }, [type])

    const fetchPolicy = async () => {
        try {
            const res = await getActivePolicy(type)
            setPolicy(res.data.policy)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <span className="loading loading-bars loading-lg" />
        </div>
    )

    if (!policy) return (
        <div className="w-full h-screen flex justify-center items-center font-kanit text-gray-400">
            ยังไม่มีนโยบายนี้
        </div>
    )

    return (
        <div className="font-kanit">
            <TabBackward linkTo='/store' title={POLICY_META[type]?.title || 'นโยบาย'} />

            <div className="max-w-2xl mx-auto p-5">
                {/* Toggle ภาษา */}
                <div className="flex gap-2 justify-end mb-4">
                    <button onClick={() => setLang('th')} className={`btn btn-sm rounded-full ${lang === 'th' ? 'bg-main text-white' : 'btn-outline'}`}>
                        ภาษาไทย
                    </button>
                    <button onClick={() => setLang('en')} className={`btn btn-sm rounded-full ${lang === 'en' ? 'bg-main text-white' : 'btn-outline'}`}>
                        English
                    </button>
                </div>

                <h1 className="text-2xl font-semibold mb-1">
                    {lang === 'th' ? policy.title_th : policy.title_en}
                </h1>
                <p className="text-xs text-gray-400 mb-6">
                    เวอร์ชัน {policy.version} | อัปเดตล่าสุด {new Date(policy.published_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                {/* เนื้อหา */}
                <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: sanitize(lang === 'th' ? policy.content_th : policy.content_en)
                    }}
                />
            </div>
        </div>
    )
}

export default PolicyView