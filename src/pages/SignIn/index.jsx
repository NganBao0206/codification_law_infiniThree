import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { useContext, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import cookies from "react-cookies";
import { UserContext } from "../../App";

const SignIn = () => {

    const [user, setUser] = useState();
    const nav = useNavigate();
    const { dispatch, currentUser } = useContext(UserContext);

    const changeUser = (value, field) => {
        setUser((current) => {
            return { ...current, [field]: value }
        })
    }

    const login = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let res = await APIs.post(endpoints['login'],
                    {
                        "username": user.username,
                        "password": user.password
                    }
                    , {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                if (res.status === 200) {
                    cookies.save("access_token", res.data["access_token"], {});
                    cookies.save("user", res.data["user"], {});
                    dispatch({
                        "type": "login",
                        "payload": res.data["user"]
                    });
                    nav("/");

                }
            } catch (ex) {
                console.error(ex);
            }
        }
        process();
    }

    if (currentUser) {
        return <Navigate to="/" />
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
                <button onSubmit={login} className="login-btn">Đăng nhập</button>
                <h3 className="pt-5 text-center text-xs md:text-base">Chưa có tài khoản? <span className="text-link"><Link to="/dang-ky">Đăng ký ngay</Link></span></h3>
            </form>
        </div>
    );
};

export default SignIn;