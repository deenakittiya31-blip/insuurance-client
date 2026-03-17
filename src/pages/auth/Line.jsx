import liff from "@line/liff";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInsureAuth from "../../store/auth-store";

const Line = () => {
    const navigate = useNavigate();
    const { actionCurrentMember, actionLoginLine, actionLogout, token } = useInsureAuth()

    useEffect(() => {
        const init = async () => {
            await liff.init({ liffId: "1655907951-VyHVQyHl" });

            if (!liff.isLoggedIn()) {
                liff.login();
                return;
            }

            // ดึง redirect param
            const params = new URLSearchParams(window.location.search)
            const redirect = params.get('redirect') // 'register' | 'store' | null

            // เช็คก่อนว่ามี JWT อยู่แล้วไหม และยังไม่หมดอายุ
            if (token) {
                try {
                    // ถ้ามีอยู่แล้ว ข้ามการ verify LINE ไปเลย
                    await actionCurrentMember()
                    navigate(redirect === 'register' ? '/member-register' : '/store')
                    return
                } catch (err) {
                    // token หมดอายุ ให้ไปยิง LINE login ใหม่
                    // ไม่ return เพื่อให้ flow ด้านล่างทำงานต่อ
                    actionLogout()
                }
            }

            const idToken = liff.getIDToken();

            try {
                const res = await actionLoginLine(idToken)
                const { status } = res.data

                if (status === 'member') {
                    await actionCurrentMember()
                    navigate('/store')

                } else if (status === 'not_registered') {
                    await actionCurrentMember()
                    // ถ้ากดปุ่มลงทะเบียนมาไป register
                    // ถ้ากดปุ่มร้านค้ามาไป store ได้เลย
                    navigate(redirect === 'register' ? '/member-register' : '/store')

                } else if (status === 'guest') {
                    navigate('/store')
                }
            } catch (err) {
                const status = err.response?.status

                if (status === 401) {
                    // idToken หมดอายุ
                    liff.logout()
                    liff.login()
                    return
                }

                // error อื่นๆ → ไป store แบบ guest ก็ได้
                navigate('/store')
            }
        };

        init();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-bars loading-xl"></span></div>
    )
}
export default Line
