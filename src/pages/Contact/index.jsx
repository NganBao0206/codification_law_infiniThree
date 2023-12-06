import React, { useContext, useState } from 'react';
import "./style.css";
import { authApi, endpoints } from '../../configs/APIs';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Contact = () => {
    const [info, setInfo] = useState({});
    const { currentUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const changeInfo = (value, field) => {
        setInfo((current) => {
            return { ...current, [field]: value }
        })
    }

    const sendInfo = (evt) => {
        setLoading(true);
        evt.preventDefault();

        if (!info.subject || !info.content) {
            alert("Vui lòng nhập tiêu đề và nội dung");
            setLoading(false);
            return;
        }

        const process = async () => {
            const res = await authApi().post(endpoints["contact"], {
                "subject": info.subject,
                "content": info.content
            });
            if (res.status === 200) {
                alert("Gửi thông tin thành công");
                setInfo({});
                setLoading(false);
            }
        }
        process();
    }


    if (!currentUser) {
        return <Navigate to="/dang-nhap?next=/lien-he" />
    }

    return (
        <div className="p-5 md:p-24 ">
            <form onSubmit={(evt) => sendInfo(evt)} className="contact-form">
                <h1 className="register-title">Thông tin liên hệ</h1>
                <div className="flex flex-col gap-4 mb-5">
                    <div>
                        <h3 className="mb-2">Tiêu đề</h3>
                        <input onChange={e => changeInfo(e.target.value, e.target.name)} name="subject" className="styled-input" type="text" />
                    </div>
                    <div>
                        <h3 className="mb-2">Nội dung</h3>
                        <textarea onChange={e => changeInfo(e.target.value, e.target.name)} name="content" rows="5" className="w-full p-2 text-lg focus:outline-none border-dark border-[1px]" ></textarea>
                    </div>
                </div>
                <div className="col-span-3 flex justify-center">
                    {
                        loading ? <span className="loading loading-infinity loading-lg bg-button"></span> : <button className="register-btn">Gửi thông tin</button>
                    }
                </div>
            </form >
        </div >
    );
};

export default Contact;