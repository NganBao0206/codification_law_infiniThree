import React, { useState } from 'react';
import { LuMinimize2, LuMaximize2 } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";



const ChatBot = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed z-999 bottom-0 right-10 w-[20%] bg-white border-2 border-dark">
            <div className="bg-primary pr-2 pl-5 py-3 font-bold text-lg text-white flex items-center">
                <span>Bot chat</span>
                <div className="flex ml-auto">
                    <div onClick={() => setOpen(!open)} className="cursor-pointer rounded hover:bg-gray-100 p-2 hover:text-dark">{open ? <LuMinimize2 /> : <LuMaximize2 />}</div>
                    <div className="cursor-pointer rounded hover:bg-gray-100 p-2 hover:text-dark"><FaXmark /></div>
                </div>
            </div>
            {
                open ? <div className="h-96">
                    <div className="w-full h-full grid grid-rows-10">
                        <div className="row-span-8">
                        </div>
                        <div className="row-span-2">
                            <input className="search-input w-[90%] mx-auto" type="text" placeholder="Aa" />
                        </div>
                    </div>
                    <div>
                    </div>
                </div> : <></>
            }


        </div>
    );
};

export default ChatBot;