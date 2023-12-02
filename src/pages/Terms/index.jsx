import React, { useEffect, useState } from 'react';
import "./style.css";
import APIs, { endpoints } from '../../configs/APIs';
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


const Terms = () => {

    const [terminologies, setTerminologies] = useState([]);
    const [pages, setPages] = useState();
    const [termCount, setTermCount] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        const getTerminologies = async () => {
            try {
                const res = await APIs.get(endpoints["terminologies"]);
                if (res.status === 200) {
                    const data = res.data;
                    setPages(data["total_pages"]);
                    setTermCount(data["total_terminologies"]);
                    setTerminologies(data["terminologies"]);
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        getTerminologies();
    }, [])

    return (
        <div>
            <h1 className="title">Tra cứu thuật ngữ pháp luật</h1>
            <div>
                <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm thuật ngữ" />
            </div>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead className="text-button font-bold text-lg border-b-2 border-dark">
                        <tr>
                            <th>#</th>
                            <th>Thuật ngữ</th>
                            <th>Định nghĩa</th>
                        </tr>
                    </thead>
                    <tbody className="text-base">
                        <>
                            {terminologies ? terminologies.map((terminology, index) => {
                                return (<tr key={index + 1} className={`${index !== 49 ? "border-b border-dark" : ""}  hover:bg-blue-100`}>
                                    <th>{index + 1}</th>
                                    <td>{terminology.value}</td>
                                    <td>{terminology.description}</td>
                                </tr>)
                            }) : <></>}
                        </>
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center">
                <div className="join bg-transparent my-10 mx-auto">
                    {currentPage !== 1 ?
                        <>
                            <button className="page-btn" onClick={() => setCurrentPage(1)}><PiCaretDoubleLeftBold /></button>
                            <button className="page-btn" onClick={() => setCurrentPage(prev => prev - 1)}><PiCaretLeftBold /></button>
                        </> : <></>
                    }
                    <button className="page-btn current-page">1</button>
                    <button className="page-btn">2</button>
                    {currentPage !== pages ?
                        <>
                            <button className="page-btn" onClick={() => setCurrentPage(prev => prev + 1)}><PiCaretRightBold /></button>
                            <button className="page-btn" onClick={() => setCurrentPage(pages)}><PiCaretDoubleRightBold /></button>
                        </> : <></>
                    }

                </div>
            </div>

        </div >
    );
};

export default Terms;