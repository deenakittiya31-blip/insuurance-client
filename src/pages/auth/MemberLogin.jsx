import { useNavigate } from "react-router-dom";
import useInsureAuth from "../../store/auth-store";
import liff from "@line/liff";
import { useEffect } from "react";

const MemberLogin = () => {
    const navigate = useNavigate();
    const { actionCurrentMember, actionLoginLine, actionLogout, token } = useInsureAuth()

    useEffect(() => {
        const init = async () => {
            await liff.init({ liffId: "1655907951-VyHVQyHl" });

            if (!liff.isLoggedIn()) {
                liff.login();
                return;
            }

            // เช็คก่อนว่ามี JWT อยู่แล้วไหม และยังไม่หมดอายุ
            if (token) {
                try {
                    // ถ้ามีอยู่แล้ว ข้ามการ verify LINE ไปเลย
                    await actionCurrentMember()
                    navigate('/store')
                    return
                } catch (err) {
                    // token หมดอายุ ให้ไปยิง LINE login ใหม่
                    // ไม่ return เพื่อให้ flow ด้านล่างทำงานต่อ
                    actionLogout()
                }
            }


            const idToken = liff.getIDToken();
            // ส่ง token ไป backend
            try {
                const res = await actionLoginLine(idToken)
                if (res.status === 200) {
                    await actionCurrentMember()
                    navigate("/store");
                }
            } catch (err) {
                console.log(err)
                const status = err.response?.status

                // LINE idToken หมดอายุ → logout แล้ว login ใหม่
                if (status === 401) {
                    liff.logout()
                    liff.login()
                    return
                }

                if (status === 403 || status === 404) {
                    navigate('/member-register')
                }
            }
        };

        init();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-bars loading-xl"></span></div>
    )
}
export default MemberLogin