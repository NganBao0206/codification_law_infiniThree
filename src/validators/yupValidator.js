import * as yup from "yup";

export const schemaUser = yup.object().shape({
    username: yup.string().required('Tên người dùng không được để trống').min(3, 'Tên người dùng phải có ít nhất 3 ký tự').max(50, 'Tên người dùng không được vượt quá 50 ký tự').matches(/^[a-zA-Z0-9.]{0,51}$/, 'Tên người dùng không hợp lệ'),
    password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự').max(100, 'Mật khẩu không được vượt quá 100 ký tự').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\_\-+=])[A-Za-z\d!@#$%^&*\_\-+=]+$/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'),
    confirmPassword: yup.string().required('Không được để trống').oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});