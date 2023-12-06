import React, { useEffect, useState } from 'react';

const BotMsg = ({ content, source }) => {

    const [messContent, setMessContent] = useState("");

    useEffect(() => {
        setMessContent(content.replaceAll("_", " "))
    }, [])

    return (
        <div className="chat chat-start max-w-[75%]">
            <div className="chat-bubble bg-white text-dark border-2 border-dark before:hidden">
                <div className="px-3 py-2">
                    {messContent}
                </div>
                <div className="px-3 py-2 border-t-2 border-dark">
                    <span className="font-bold text-buttonShadow">Nguồn</span>: <a href={source} className="underline text-blue-500 hover:text-blue-700">{source}</a>
                </div>
            </div>
        </div>
    );
};

export default BotMsg;