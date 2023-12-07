import React, { useEffect, useState } from 'react';
import UserMsg from './components/UserMsg';
import BotMsg from './components/BotMsg';
import { FaCaretDown } from "react-icons/fa6";
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { useParams } from 'react-router-dom';


const ChatRoom = () => {

    const [subTopics, setSubTopics] = useState([]);
    const [messeges, setMesseges] = useState([]);
    const [messege, setMessege] = useState({});
    const [loading, setLoading] = useState(false);
    const { slugChat } = useParams();


    useEffect(() => {
        const getMesseges = async () => {
            const url = endpoints.messeges(slugChat);
            const res = await authApi().get(url);
            if (res.status === 200) {
                setMesseges(res.data);
            }
        }
        getMesseges()
    }, [])

    useEffect(() => {
        getSubTopics();
    }, [])


    const changeMessege = (value, field) => {
        setMessege((current) => {
            return { ...current, [field]: value }
        })
    }

    const getSubTopics = async () => {
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
        setLoading(true);
        if (!messege.sub_topic_id && !messege.content) {
            alert("Cần chọn chủ đề và nội dung câu hỏi");
            setLoading(false);
            return;
        }

        changeMessege(slugChat, "chat_room_id");


        const process = async () => {
            const res = await authApi().post(endpoints["sendMessege"], messege);
            if (res.status === 200) {
                setLoading(false);
                setMessege({});
            }
        }

        process();
    }

    return (
        <div>
            <div className="h-[75vh] overflow-y-auto w-full">
                <>
                    {
                        messeges.length && messeges.map((mess, index) => {
                            return <>
                                {
                                    mess.is_user_message ? (<UserMsg key={index} content={mess.content}></UserMsg>) : (
                                        <BotMsg key={index} content={mess.content} source={mess.source}></BotMsg>
                                    )
                                }
                            </>
                        })
                    }
                    {loading ? <div className="chat chat-start max-w-[75%]">
                        <div className="chat-box">
                            <span className="loading loading-dots loading-sm"></span>
                        </div>
                    </div> : <></>}
                </>


            </div>
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
        </div>

    );
};

export default ChatRoom;