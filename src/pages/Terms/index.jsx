import React, { useEffect, useState } from 'react';
import "./style.css";
import APIs, { endpoints } from '../../configs/APIs';

const Terms = () => {

    const [terminologies, setTerminologies] = useState([]);

    useEffect(() => {
        const getTerminologies = async () => {
            try {
                const res = await APIs.get(endpoints["terminologies"]);
                if (res.status === 200) {
                    console.log(res.data);
                    setTerminologies(res.data.terminologies);
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        getTerminologies();
    }, [])

    return (
        <div>
            <h1 className="title">Thuật ngữ</h1>
            <div>
                <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm thuật ngữ" />
            </div>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    <thead className="text-button font-bold text-xl border-b-2 border-dark">
                        <tr>
                            <th>#</th>
                            <th>Thuật ngữ</th>
                            <th>Nghĩa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {terminologies ? terminologies.map((terminology, index) => {
                                return (<tr key={index} className="border-b border-dark hover:bg-blue-100">
                                    <th>{index}</th>
                                    <td>{terminology.value}</td>
                                    <td>{terminology.description}</td>
                                </tr>)
                            }) : <></>}
                        </>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Terms;