import React, { useEffect, useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import { TbReload } from "react-icons/tb";

const SignUp = () => {

    const [user, setUser] = useState();
    const [captcha, setCaptcha] = useState('');

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(randomString);
    };

    const changeUser = (value, field) => {
        setUser((current) => {
            return { ...current, [field]: value }
        })
    }

    const register = (evt) => {
        evt.preventDefault();
        if (user && user.captcha !== captcha) {
            return;
        }
        console.log(user)
    }

    return (
        <div className="p-5 md:p-24 ">
            <form onSubmit={register} className="register-form">
                <h1 className="register-title">Đăng ký tài khoản</h1>
                <div>
                    <h3 className="mb-2">Tên tài khoản</h3>
                    <input onChange={e => changeUser(e.target.value, e.target.name)} name="username" className="styled-input" type="text" />
                </div>
                <div>
                    <h3 className="mb-2">Mật khẩu</h3>
                    <input onChange={e => changeUser(e.target.value, e.target.name)} name="password" className="styled-input" type="password" />
                </div>
                <div className="mb-2" >
                    <h3 className="mb-2">Xác nhận mật khẩu</h3>
                    <input onChange={e => changeUser(e.target.value, e.target.name)} name="confirm" className="styled-input" type="password" />
                </div>
                <div className="mb-5 lg:mb-10 grid grid-cols-2 md:grid-cols-3 items-end gap-5" >
                    <div className="col-span-2 w-full">
                        <h3 className="mb-2">Mã captcha</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="captcha" className="styled-input" type="text" />
                    </div>
                    <div className="col-span-2 md:col-span-1 w-full relative">
                        <div className="captcha styled-input">{captcha}</div>
                        <div onClick={generateCaptcha} className="reload-captcha"><TbReload size="25" className="text-white" /> </div>
                    </div>
                </div>
                <button className="register-btn">Đăng ký</button>
                <h3 className="pt-5 text-center text-xs md:text-base">Bạn đã có tài khoản? <span className="text-link"><Link to="/dang-nhap">Đăng nhập</Link></span></h3>
            </form>
        </div>
    );
};

export default SignUp;