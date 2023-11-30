import { Link } from "react-router-dom";
import "./style.css";
import { LuArrowUpRight } from "react-icons/lu";
import content from "../../assets/poster.png";

const Home = () => {

    return (
        <>
            <div className="content">
                <div className="grid-content">
                    <h1 className="home-title">Khám phá pháp điển điện tử về bộ<br className="lg:hidden"></br> <span className=" highline">Luật Việt Nam</span></h1>
                    <Link to="/bo-phap-dien" className="view-now styled-button animate-bounce" >
                        <span>Xem ngay</span>
                        <LuArrowUpRight size="23" />
                    </Link>

                </div>
                <div className="right-side">
                    <img className="object-cover h-full" src={content} alt="Content" />
                </div>
            </div >

        </>

    );

};

export default Home;