import React, { useEffect, useState } from 'react';
import UserMsg from './components/UserMsg';
import BotMsg from './components/BotMsg';
import { FaCaretDown } from "react-icons/fa6";
import APIs, { endpoints } from '../../configs/APIs';


const ChatRoom = () => {

    const [subTopics, setSubTopics] = useState([]);

    useEffect(() => {
        getSubTopics();
    }, [])

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

    return (
        <div>
            <div className="h-[75vh] overflow-y-auto w-full">
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
                <UserMsg content={"hello"}></UserMsg>
                <BotMsg content={"Hello Bạn, rất hân hạnh được làm quen. Hãy đặt câu hỏi cho tôi nếu bạn cần sự giúp đỡ nhé !!!!"}></BotMsg>
            </div>
            <div className="absolute bottom-10 w-full pr-5">
                <div className="w-full grid grid-cols-4">
                    <div className="relative">
                        <select className="select-title py-3 truncate pr-8" >
                            <option className="w-32 overflow-w-auto">-- Chủ đề --</option>
                            <>
                                {subTopics && subTopics.map((topic, index) => {
                                    return <option className="w-32 overflow-w-auto" key={index} value={topic.id}>{topic.name}</option>
                                })}
                            </>
                        </select>
                        <FaCaretDown className="arrow" />
                    </div>
                    <div className="col-span-3">
                        <form className="w-full">
                            <input type="text" name="msg" onChange={(evt) => { setMsg(evt.target.value) }} className='chat-input' placeholder='Hãy đặt câu hỏi...' />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChatRoom;