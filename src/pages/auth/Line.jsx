import liff from "@line/liff";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Line = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            try {
                await liff.init({ liffId: "2008929214-oMQadweJ" });
                navigate('/store')
            } catch (err) {
                console.log('liff init error', err)
                navigate('/store') // init fail ก็ไป store ได้เลย
            }
        };

        init();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-bars loading-xl"></span></div>
    )
}
export default Line
