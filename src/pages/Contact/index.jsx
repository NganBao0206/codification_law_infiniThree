import React from 'react';
import "./style.css";

const Contact = () => {
    return (
        <div className="p-5 md:p-24 ">
            <form className="contact-form">
                <h1 className="register-title">Thông tin liên hệ</h1>
                <div>
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

            </form >
        </div >
    );
};

export default Contact;