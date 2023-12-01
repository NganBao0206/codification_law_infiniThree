import React, { useEffect, useState } from 'react';
import "./style.css";
import { BiImageAdd } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { schemaUser } from '../../validators/yupValidator';
import APIs, { endpoints } from '../../configs/APIs';

const SignUp = () => {

    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const [errors, setErrors] = useState({});
    const nav = useNavigate();

    const changeUser = (value, field) => {
        setUser((current) => {
            return { ...current, [field]: value }
        })
    }

    useEffect(() => {
        const validateAll = async () => {
            let schemas = [schemaUser];
            let data = [user];
            let dataNames = ['user'];
            setErrors({});
            for (let i = 0; i < schemas.length; i++) {
                try {
                    await schemas[i].validate(data[i], { abortEarly: false });
                } catch (error) {
                    const errorMessages = {};
                    error.inner.forEach((err) => {
                        errorMessages[err.path] = err.message;
                    });
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [dataNames[i]]: errorMessages
                    }));
                }
            }
        };
        validateAll();
    }, [user]);

    const handleFileChange = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            const file = evt.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
            setAvatarFile(evt.target.files);
        }
    };

    const handleRemoveImage = () => {
        setAvatar(null);
        setAvatarFile(null);
    }

    const register = (evt) => {
        evt.preventDefault();
        if (Object.keys(errors).length > 0 || !avatarFile) {
            alert("Thông tin đăng ký chưa hợp lệ, vui lòng kiểm tra trước khi hoàn tất");
            return;
        }
        const process = async () => {
            try {
                let form = new FormData();
                form.append("name", user.name);
                form.append("username", user.username);
                form.append("email", user.username);
                form.append("password", user.password);
                form.append("confirm", user.confirm);
                form.append("avatar", avatarFile[0]);

                let res = await APIs.post(endpoints['register'], form);
                if (res.status === 201) {
                    nav("/dang-nhap");
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        process();
    }

    return (
        <div className="p-5 md:p-24 ">
            <form onSubmit={register} className="register-form">
                <h1 className="register-title">Đăng ký tài khoản</h1>

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
                        <h3 className="mb-2">Tài khoản email</h3>
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
                <div className="form-right">
                    <div className="avatar-div">
                        {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="avatar-content">Ảnh đại điện</div>}
                    </div>
                    <div className="flex gap-1">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="avatar" className="add-button">
                                <p>Thêm ảnh đại điện</p>
                                <BiImageAdd size="25"></BiImageAdd>
                                <input id="avatar" type="file" className="hidden" accept='image/*' onChange={(evt) => handleFileChange(evt)} />
                            </label>
                        </div>
                        {avatar ? <button className="register-btn bg-white text-dark w-fit hover:text-white hover:bg-dark" onClick={handleRemoveImage}>Xóa</button> : <></>}
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

export default SignUp;