import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";

const SignIn = () => {

    const [user, setUser] = useState();
    const changeUser = (value, field) => {
        setUser((current) => {
            return { ...current, [field]: value }
        })
    }

    const login = (evt) => {
        evt.preventDefault();
        console.log(user)
    }

    return (
        <div className="p-5 md:p-24 ">
            <form onSubmit={login} className="login-form">
                <h1 className="login-title">Đăng nhập người dùng</h1>
                <div>
                    <h3 className="mb-2">Tên tài khoản</h3>
                    <input onChange={e => changeUser(e.target.value, e.target.name)} name="username" className="styled-input" type="text" />
                </div>
                <div className="mb-5 lg:mb-10" >
                    <h3 className="mb-2">Mật khẩu</h3>
                    <input onChange={e => changeUser(e.target.value, e.target.name)} name="password" className="styled-input" type="password" />
                </div>
                <button className="login-btn">Đăng nhập</button>
                <h3 className="pt-5 text-center text-xs md:text-base">Chưa có tài khoản? <span className="text-link"><Link to="/dang-ky">Đăng ký ngay</Link></span></h3>
            </form>
        </div>
    );
};

export default SignIn;