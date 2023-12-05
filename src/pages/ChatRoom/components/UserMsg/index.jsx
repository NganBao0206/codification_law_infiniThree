import React from 'react';

const UserMsg = ({ content }) => {
    return (
        <div className="chat chat-end max-w-[75%]  ml-auto">
            <div className="chat-bubble bg-primary text-dark border-2 border-dark before:hidden">{content}</div>
        </div>
    );
};

export default UserMsg;