import { Link } from "react-router-dom";
import logo from "../../assets/infinity.png";
import "./style.css";
import { FaAngleDown } from "react-icons/fa6";


const Navbar = () => {
    return (
        <div className="navbar border-b-2 border-dark">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-3 lg:p-5">
                    <img src={logo} alt="logo" className="h-8 w-8" />
                    <h1 className="font-extrabold lg:text-2xl">InfiniThree</h1>
                </Link>
            </div>
            <div className="flex-none hidden lg:flex">
                <ul className="navbar-menu">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/bo-phap-dien">Bộ pháp điển</Link></li>
                    <li>
                        <div className="dropdown dropdown-bottom dropdown-end ">
                            <div tabIndex={0} role="button" className="flex items-center gap-2">
                                <span className="cursor-pointer">Thuật ngữ</span>
                                <FaAngleDown />
                            </div>
                            <ul className="menu dropdown-content mt-3 z-[1] bg-white w-52">
                                <li><Link to="/tra-cuu-thuat-ngu">Tra cứu</Link></li>
                                <li><Link to="/tim-trong-van-ban">Tìm trong đoạn văn</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/dien-dan-phap-luat">Diễn đàn</Link></li>
                    <li><Link to="/lien-he">Liên hệ</Link></li>
                    <li><Link to="/dang-nhap"><div className="styled-button">Đăng nhập</div></Link></li>
                </ul>
            </div>
            <div className="dropdown dropdown-bottom dropdown-end lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/bo-phap-dien">Bộ pháp điển</Link></li>
                    <li><Link to="/tra-cuu-thuat-ngu">Thuật ngữ</Link></li>
                    <li><Link to="/dien-dan-phap-luat">Diễn đàn</Link></li>
                    <li><Link to="/lien-he">Liên hệ</Link></li>
                    <li><Link to="/dang-nhap">Đăng nhập</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;