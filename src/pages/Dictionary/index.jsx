import { createContext, useEffect, useState } from "react";
import TreeView from "./components/TreeView";
import "./style.css";
import { FaCaretDown } from "react-icons/fa6";
import APIs, { endpoints } from "../../configs/APIs";

const Dictionary = () => {
    let url = import.meta.env.VITE_PUBLIC_URL + "0abd54e4-923f-48a3-9f22-b9672dcf4185.html";
    const [html, setHTML] = useState("");
    const FileContext = createContext();
    const [file, setFile] = useState();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const getTopics = async () => {
            try {
                const res = APIs.get(endpoints["topics"]);
                if (res.status == 200) {
                    setTopics(res.data);
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        const getHtml = () => {
            fetch(url).then(res => res.text())
                .then(data => setHTML(data));
        }
        getTopics();
        getHtml();
    }, [])

    return (
        <div >
            <h1 className="dictionary-title">Bộ pháp điển điện tử</h1>
            <div className="search-grid">
                <div className="relative">
                    <select className="select-title" >
                        <option value="">-- Xem theo chủ đề --</option>
                        <>
                            {topics && topics.map((topic, index) => {
                                return <option key={index} value={topic.id}>{topic.name}</option>
                            })}
                        </>
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <div className="relative">
                    <select className="select-title" >
                        <option >-- Xem theo Đề mục --</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <div >
                    <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm" />
                </div>
            </div>

            <FileContext.Provider value={{ file, setFile }}>
                <div className="p-2 lg:p-10 grid grid-cols-10">
                    <div className="col-span-3 border-r-2 border-dark p-2">
                        <TreeView data={topics}></TreeView>
                    </div>
                    <div className="col-span-7 px-5" >
                        <div className="px-10 py-5 bg-white shadow-3xl" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>

                </div>
            </FileContext.Provider>
        </div>
    );
};

export default Dictionary;  