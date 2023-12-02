import React, { useEffect, useState } from 'react';
import "./style.css";
import { BiImageAdd } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="p-5 md:p-24 ">
            <form className="primary-form">
                <h1 className="register-title">Thông tin liên hệ</h1>
                <div className="form-left">
                    <div>
                        <h3 className="mb-2">Họ tên</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="name" className="styled-input" type="text" />
                    </div>
                    <div>
                        <h3 className="mb-2">Tên tài khoản</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="username" className="styled-input" type="text" />
                    </div>
                    <div>
                        <h3 className="mb-2">Email</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="email" className="styled-input" type="email" />
                    </div>
                    <div>
                        <h3 className="mb-2">Mật khẩu</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="password" className="styled-input" type="password" />
                    </div>
                    <div className="mb-5 lg:mb-10" >
                        <h3 className="mb-2">Xác nhận mật khẩu</h3>
                        <input onChange={e => changeUser(e.target.value, e.target.name)} name="confirm" className="styled-input" type="password" />
                    </div>
                </div>

                <div className="col-span-3 flex justify-center">
                    <button className="register-btn">Đăng ký</button>
                </div>
                <h3 className="pt-5 text-center col-span-3 text-xs md:text-base">Bạn đã có tài khoản? <span className="text-link"><Link to="/dang-nhap">Đăng nhập</Link></span></h3>

            </form >
        </div >
    );
};

export default Contact;