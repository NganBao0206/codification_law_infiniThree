import React from 'react';

const BotMsg = ({ content }) => {
    return (
        <div className="chat chat-start max-w-[75%]">
            <div className="chat-bubble bg-white text-dark border-2 border-dark before:hidden">{content}</div>
        </div>
    );
};

export default BotMsg;