import React, { useContext, useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa6";
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import { MdAdd } from "react-icons/md";
import "./style.css";


const BotChat = () => {

    const [msg, setMsg] = useState();
    const [rooms, setRooms] = useState([]);
    const [topics, setTopics] = useState([]);
    const [startMsg, setStartMsg] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getTopics();
    }, [])


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

    if (!currentUser) {
        return (<Navigate to="/dang-nhap?next=/chat" />);
    }

    return (
        <div className="h-[90vh] grid grid-cols-10 w-full">
            {rooms ? <>
                <div className="col-span-3 border-r-2 border-dark flex flex-col items-center p-5">
                    <button className="border-2 border-dark bg-white flex gap-2 px-4 py-3 shadow-small w-full hover:bg-gray-100">
                        <MdAdd size="20" />
                        <span className="font-bold">Thêm đoạn chat mới</span>
                    </button>
                </div>
                <div className="col-span-7 p-5 relative flex flex-col gap-5">
                    <div className="absolute bottom-10 w-[90%] grid grid-cols-4 left-[5%]">
                        <div className="relative">
                            <select className="select-title py-3 truncate pr-8" >
                                <option>-- Chủ đề --</option>
                                <>
                                    {topics && topics.map((topic, index) => {
                                        return <option key={index} value={topic.id}>{topic.name}</option>
                                    })}
                                </>
                            </select>
                            <FaCaretDown className="arrow" />
                        </div>
                        <form className="col-span-3" >
                            <input type="text" name="msg" onChange={(evt) => { setMsg(evt.target.value) }} className='chat-input' placeholder='Hãy đặt câu hỏi...' />
                        </form>
                    </div>
                </div>
            </> : <>
                <div className="col-span-10 ">
                    <select className="select-title py-3" >
                        <option>-- Lựa chọn chủ đề bắt đầu --</option>
                        <>
                            {topics && topics.map((topic, index) => {
                                return <option key={index} value={topic.id}>{topic.name}</option>
                            })}
                        </>
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <form >
                    <input type="text" name="msg" onChange={(evt) => { setMsg(evt.target.value) }} className='chat-input' placeholder='Hãy đặt câu hỏi...' />
                </form>
            </>}



        </div>
    );
};

export default BotChat;