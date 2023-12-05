import React, { useContext, useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa6";
import { UserContext } from '../../App';
import { Link, Navigate, Outlet } from 'react-router-dom';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { MdAdd } from "react-icons/md";
import "./style.css";


const BotChatLayout = () => {

    const data = [
        {
            "id": 1,
            "user_id": 581,
            "name": "Phòng chat mới"
        }, {
            "id": 2,
            "user_id": 581,
            "name": "Phòng chat mới 2"
        }, {
            "id": 3,
            "user_id": 581,
            "name": "Phòng chat mới 3"
        }
    ]

    const [messege, setMessege] = useState({});
    const [rooms, setRooms] = useState([]);
    const [subTopics, setSubTopics] = useState([]);
    const [startMsg, setStartMsg] = useState(true);
    const [beDisabled, setBeDisabled] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getsubTopics();
        setRooms(data);
    }, [])

    const changeMessege = (value, field) => {
        setMessege((current) => {
            return { ...current, [field]: value }
        })
    }

    const getsubTopics = async () => {
        try {
            const res = await APIs.get(endpoints["allsubTopics"]);
            if (res.status === 200) {
                setSubTopics(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const sendMessege = (evt) => {
        evt.preventDefault();
        if (!messege.sub_topic_id && !messege.content) {
            alert("Lỗi");
            return;
        }


        const process = async () => {
            console.log(messege)
            const res = await authApi().post(endpoints["sendMessege"], messege);
            if (res.status === 200) {
                console.log(res.data);
            }
        }

        process();
    }

    if (!currentUser) {
        return (<Navigate to="/dang-nhap?next=/chat" />);
    }

    return (
        <div className="h-[90vh] grid grid-cols-10 w-full">
            <>
                <div className=" hidden lg:block lg:col-span-3 border-r-2 border-dark flex flex-col items-center p-5">
                    <Link to="/chat" className=" w-full"><button onClick={() => setStartMsg(true)} className="w-full border-2 border-dark bg-white flex gap-2 px-4 py-3 shadow-small hover:bg-gray-100">
                        <MdAdd size="20" />
                        <span className="font-bold">Thêm đoạn chat mới</span>
                    </button></Link>
                    <div className="w-full my-5 flex flex-col">
                        <>
                            {rooms && rooms.map(r => {
                                return (<Link to={`${r.id}`} onClick={() => setStartMsg(false)}>
                                    <div className="w-full py-4 px-5 rounded-lg font-bold hover:bg-blue-100 ">
                                        {r.name}
                                    </div>
                                </Link>)
                            })}
                        </>
                    </div>
                </div>
                <div className="col-span-10 lg:col-span-7 p-5 pr-0 relative flex flex-col gap-5">
                    {
                        startMsg ? <>
                            <form onSubmit={sendMessege} className="w-full">
                                <div className="absolute bottom-10 w-full ">
                                    <div className="w-full grid grid-cols-4">
                                        <div className="relative">
                                            <select onChange={(evt) => changeMessege(evt.target.value, evt.target.name)} className="select-title py-3 truncate pr-8" name="sub_topic_id">
                                                <option>-- Chủ đề --</option>
                                                <>
                                                    {subTopics && subTopics.map((topic, index) => {
                                                        return <option key={index} value={topic.id}>{topic.name}</option>
                                                    })}
                                                </>
                                            </select>
                                            <FaCaretDown className="arrow" />
                                        </div>
                                        <div className="col-span-3">
                                            <input type="text" name="msg" onChange={(evt) => changeMessege(evt.target.value, evt.target.name)} className='chat-input' placeholder='Hãy đặt câu hỏi...' />
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </> : <>
                            <Outlet />
                        </>
                    }
                </div>
            </>
        </div>
    );
};
export default BotChatLayout;