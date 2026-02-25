import liff from "@line/liff";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Line = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            await liff.init({ liffId: "2008929214-oMQadweJ" });
            // เข้า store ได้เลย ไม่ต้องเช็ค login
            navigate('/store')
        };

        init();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-bars loading-xl"></span></div>
    )
}
export default Line