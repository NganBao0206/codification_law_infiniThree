import React from 'react';
import "./style.css";

const Terms = () => {
    return (
        <div>
            <h1 className="title">Thuật ngữ</h1>
            <div>
                <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm thuật ngữ" />
            </div>
        </div>
    );
};

export default Terms;