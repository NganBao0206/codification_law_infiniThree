import { createContext, useEffect, useState } from "react";
import "./style.css";
import { FaCaretDown } from "react-icons/fa6";
import APIs, { endpoints } from "../../configs/APIs";
import { Outlet } from "react-router-dom";
import TreeView from "./components/TreeView";

export const FileContext = createContext();

const DictionaryLayout = () => {
    const [html, setHTML] = useState();
    const [file, setFile] = useState();
    const [topics, setTopics] = useState([]);
    const [subTopics, setSubTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [filterTopic, setFilterTopic] = useState(null);
    const [selectedSubTopic, setSelectedSubTopic] = useState('');
    const [filterSubTopic, setFilterSubTopic] = useState(null);


    useEffect(() => {
        getTopics();
    }, []);

    useEffect(() => {
        let url = import.meta.env.VITE_PUBLIC_URL + file + ".html";
        getHtml(url);
    }, [file])

    useEffect(() => {
        if (selectedTopic.length > 0) {
            getSubTopic(selectedTopic);
            setFilterTopic(topics.filter(topic => String(topic.id) === selectedTopic));
        }
        else {
            setFilterTopic(topics);
        }
    }, [selectedTopic, topics]);

    useEffect(() => {
        if (selectedTopic.length > 0) {
            setFilterSubTopic(subTopics.filter(subTopic => String(subTopic.id) === selectedSubTopic));
        }
        else {
            setFilterTopic(subTopics);
        }
    }, [selectedSubTopic, subTopics]);

    const getTopics = async () => {
        try {
            const res = await APIs.get(endpoints["topics"]);
            if (res.status === 200) {
                setTopics(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const getHtml = async (url) => {
        try {
            if (!url) {
                return;
            }
            const res = await fetch(url);
            if (res.status === 200) {
                let text = await res.text();
                let parser = new DOMParser();
                let doc = parser.parseFromString(text, 'text/html');
                let imgs = doc.getElementsByTagName('img');
                while (imgs.length > 0) {
                    imgs[0].parentNode.removeChild(imgs[0]);
                }
                text = doc.body.innerHTML;
                setHTML(text);
            }
        }
        catch (ex) {
            console.error(ex);
        }
    };


    const getSubTopic = async (id) => {
        try {
            const url = endpoints.subTopics(id);
            const res = await APIs.get(url);
            if (res.status === 200) {
                setSubTopics(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const changeTopic = (event) => {
        setSelectedTopic(event.target.value);
    };

    const changeSubTopic = (event) => {
        setSelectedSubTopic(event.target.value);
    };

    return (
        <div >
            <h1 className="title">Bộ pháp điển điện tử</h1>
            <div className="search-grid">
                <div className="relative">
                    <select onChange={changeTopic} className="select-title" >
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
                    <select onChange={changeSubTopic} className="select-title" >
                        <option >-- Xem theo Đề mục --</option>
                        {subTopics.map((subTopic, index) => (
                            <option key={index} value={subTopic.id}>{subTopic.name}</option>
                        ))}
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <div >
                    <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm" />
                </div>
            </div>

            <FileContext.Provider value={{ file, setFile, topics, subTopics, html }}>
                <div className="p-2 lg:p-10 grid grid-cols-10">
                    <div className={`${file ? "cols-span-3" : "col-span-10 border-r-0 "} tree-view`}>
                        <TreeView data={filterTopic ? filterTopic : topics}></TreeView>
                    </div>
                    <div className="col-span-10 lg:col-span-7 px-5" >
                        <Outlet />
                    </div>

                </div>
            </FileContext.Provider>
        </div>
    );
};

export default DictionaryLayout;  