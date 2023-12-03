import React, { useEffect, useState } from 'react';
import "./style.css";
import APIs, { endpoints } from '../../configs/APIs';
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { array } from 'yup';


const Terms = () => {

    const [terminologies, setTerminologies] = useState([]);
    const [filterTerms, setFilterTerms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [totalPages, setTotalPages] = useState();
    const [termCount, setTermCount] = useState();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [params, setParams] = useState(Object.fromEntries(searchParams));
    const [currentPage, setCurrentPage] = useState(params.page || 1);
    const [debouncedParams] = useDebounce(params, 500);

    const onPageChange = (page) => {
        setCurrentPage(page);
        setParams({ ...params, page: page });
    }

    const nav = useNavigate();
    useEffect(() => {

    }, [debouncedParams])

    useEffect(() => {
        const getTerminologies = async () => {
            try {
                const res = searchTerm.length === 0 ? (await APIs.get(endpoints["terminologies"], {
                    params: {
                        "page": currentPage
                    }
                })) : (await APIs.get(endpoints["terminologies"], {
                    params: {
                        "kw": searchTerm,
                        "page": 1
                    }
                }));
                if (res.status === 200) {
                    let data = res.data;
                    setTotalPages(data["total_pages"]);
                    setTermCount(data["total_terminologies"]);
                    setTerminologies(data["terminologies"]);
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        getTerminologies();
    }, [currentPage, searchTerm]);


    return (
        <div>
            <h1 className="title">Tra cứu thuật ngữ pháp luật</h1>
            <div>
                <input onChange={evt => setSearchTerm(evt.target.value)} value={searchTerm} className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm thuật ngữ" />
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
                            {filterTerms.length > 0 ? (filterTerms ? filterTerms.map((terminology, index) => {
                                return (<tr key={index + 1} className={`${index !== 49 ? "border-b border-dark" : ""}  hover:bg-blue-100`}>
                                    <th>{terminology.id}</th>
                                    <td>{terminology.value}</td>
                                    <td>{terminology.description}</td>
                                </tr>)
                            }) : <></>) : <>
                                {terminologies ? terminologies.map((terminology, index) => {
                                    return (<tr key={index + 1} className={`${index !== 49 ? "border-b border-dark" : ""}  hover:bg-blue-100`}>
                                        <th>{terminology.id}</th>
                                        <td>{terminology.value}</td>
                                        <td>{terminology.description}</td>
                                    </tr>)
                                }) : <></>}
                            </>}
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
                    {totalPages ? <>
                        {
                            totalPages <= 6 ? <>
                                {[...Array(totalPages).keys()].map((index) => {
                                    return (<button key={index} className={`page-btn ${currentPage === (index + 1) ? "current-page" : ""}`}>{index + 1}</button>);
                                })}
                            </> : <>
                                {currentPage !== 1 ? <>{[...Array(3).keys()].map((index) => {
                                    return (<button key={index} className={`page-btn ${currentPage === (currentPage - 1 + index) ? "current-page" : ""}`}>{currentPage - 1 + index}</button>);
                                })}</> : <>{[...Array(3).keys()].map((index) => {
                                    return (<button key={index} className={`page-btn ${currentPage === (index + 1) ? "current-page" : ""}`}>{index + 1}</button>);
                                })}</>}

                                <button className="page-btn btn-disabled">...</button>
                                {[...Array(3).keys()].map((index) => {
                                    return (<button key={index} className={`page-btn ${currentPage === (totalPages - 3 + index) ? "current-page" : ""}`}>{totalPages - 3 + index}</button>);
                                })}

                            </>}
                    </> : <></>}
                    {currentPage !== totalPages ?
                        <>
                            <button className="page-btn" onClick={() => setCurrentPage(prev => prev + 1)}><PiCaretRightBold /></button>
                            <button className="page-btn" onClick={() => setCurrentPage(totalPages)}><PiCaretDoubleRightBold /></button>
                        </> : <></>
                    }

                </div>
            </div>

        </div >
    );
};

export default Terms;