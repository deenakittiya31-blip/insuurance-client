import { useEffect, useState } from "react";
import liff from "@line/liff"
import { useNavigate } from "react-router-dom";
import useInsureAuth from '../../store/auth-store'
import toast from "react-hot-toast";

const Line = () => {
    const navigate = useNavigate();
    const { actionCurrentMember, actionLoginLine, token } = useInsureAuth()

    useEffect(() => {
        const init = async () => {
            await liff.init({ liffId: "2008929214-oMQadweJ" });

            if (!liff.isLoggedIn()) {
                liff.login();
                return;
            }

            // เช็คก่อนว่ามี JWT อยู่แล้วไหม และยังไม่หมดอายุ
            if (token) {
                // ถ้ามีอยู่แล้ว ข้ามการ verify LINE ไปเลย
                await actionCurrentMember()
                navigate('/store')
                return
            }


            const idToken = liff.getIDToken();
            // ส่ง token ไป backend
            const res = await actionLoginLine(idToken)

            if (res.status === 200) {
                await actionCurrentMember()
                toast.success('ล็อกอินสำเร็จ')
                navigate("/store");
            } else {
                navigate("/member-register");
            }
        };

        init();
    }, []);
    return (
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-bars loading-xl"></span></div>
    )
}
export default Line