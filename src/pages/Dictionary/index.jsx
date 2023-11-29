import { createContext, useEffect, useState } from "react";
import TreeView from "./components/TreeView";
import "./style.css";
import { FaCaretDown } from "react-icons/fa6";

const Dictionary = () => {
    const data = [
        {
            "id": "46163273-3C86-4DD9-AAF9-68853295E967",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003500000000000000000",
            "name": "Điều 1.1.LQ.35. Hiệu lực thi hành",
            "order": 1,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "BEDFEC59-22C7-4F2B-BF03-633B5EEECE5C",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003600000000000000000",
            "name": "Điều 1.1.LQ.36. Hướng dẫn thi hành",
            "order": 2,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "429C2651-11E8-455D-87BC-3154A8E9FCAB",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640220600016000180",
            "name": "Điều 1.1.NĐ.1.18. Hiệu lực thi hành",
            "order": 3,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "2B8ABBC3-D206-40AC-BD78-ED39DF703CDE",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640220600016000190",
            "name": "Điều 1.1.NĐ.1.19. Trách nhiệm thi hành",
            "order": 4,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "4925035A-FB53-4245-A971-CD274BDF2F9E",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640221420038000210",
            "name": "Điều 1.1.NĐ.2.21. Hiệu lực thi hành",
            "order": 5,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "0EC1FFD3-22C3-4EE3-AC7E-8287F63DAFBF",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640223350127000200",
            "name": "Điều 1.1.NĐ.3.20. Hiệu lực thi hành",
            "order": 6,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "E3398117-7D4C-49F6-B3F4-976C310F3B58",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640223350127000210",
            "name": "Điều 1.1.NĐ.3.21. Trách nhiệm thi hành",
            "order": 7,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "6AB60D15-2370-4AA5-95D6-B1AC3C9C0382",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640239990035000100",
            "name": "Điều 1.1.NĐ.4.10. Hiệu lực thi hành",
            "order": 8,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "DFC3443A-04F8-4F9F-A8F2-20E0A0E0CAC9",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640239990035000110",
            "name": "Điều 1.1.NĐ.4.11. Trách nhiệm thi hành",
            "order": 9,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "F6638D91-314D-4A07-B5DF-E9D4C8FCF133",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640246010006000170",
            "name": "Điều 1.1.NĐ.5.17. Hiệu lực thi hành",
            "order": 10,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "B356F5FC-3D51-4FEE-8A1E-259522657552",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640246010006000180",
            "name": "Điều 1.1.NĐ.5.18. Trách nhiệm thi hành",
            "order": 11,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "32581ABC-18CF-4784-ACF9-60A0D674134F",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640249780006000120",
            "name": "Điều 1.1.NĐ.6.12. Hiệu lực thi hành",
            "order": 12,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "D7C93792-ED91-4788-AD69-7D19CF2D1557",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003640249780006000130",
            "name": "Điều 1.1.NĐ.6.13. Trách nhiệm thi hành",
            "order": 13,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "777B8CFD-58C0-4CEE-98E0-2278C0E74C5E",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680224600002000080",
            "name": "Điều 1.1.TL.1.8. Tổ chức thực hiện",
            "order": 14,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "DF58590E-7F3F-434C-9EAA-E356E6CC7D8E",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680252460046000090",
            "name": "Điều 1.1.TT.1.9. Hiệu lực thi hành",
            "order": 15,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "8E357C55-F3A9-4971-9DF4-644B568A7346",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680252460046000100",
            "name": "Điều 1.1.TT.1.10. Tổ chức thực hiện",
            "order": 16,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "CD324169-FB13-456B-9856-110EFB8A1102",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680257240008000160",
            "name": "Điều 1.1.TT.2.16. Hiệu lực thi hành",
            "order": 17,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "CC4A1C4F-D927-4159-AF79-39C1CA693910",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680257240008000170",
            "name": "Điều 1.1.TT.2.17. Trách nhiệm thi hành",
            "order": 18,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "3BD2757C-E589-42FD-AB86-958219849971",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680258120002000100",
            "name": "Điều 1.1.TL.2.10. Trách nhiệm thi hành",
            "order": 19,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "A70B0B0E-C278-409E-B357-96D66C5981EB",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680258120002000110",
            "name": "Điều 1.1.TL.2.11. Hiệu lực thi hành",
            "order": 20,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "456A9086-CD48-4C5A-91D1-2100E46E1D0E",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680258590085000150",
            "name": "Điều 1.1.TL.3.15. Trách nhiệm thi hành",
            "order": 21,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        },
        {
            "id": "E70A1A26-0880-40F1-9922-13C5ABA8040C",
            "index_type": "Dieu",
            "map_index": "0100100000000000500003680258590085000160",
            "name": "Điều 1.1.TL.3.16. Hiệu lực thi hành",
            "order": 22,
            "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        }
    ];

    let url = import.meta.env.VITE_PUBLIC_URL + "0abd54e4-923f-48a3-9f22-b9672dcf4185.html";
    const [html, setHTML] = useState("");
    const FileContext = createContext();
    const [file, setFile] = useState();

    useEffect(() => {
        const getHtml = () => {
            fetch(url).then(res => res.text())
                .then(data => setHTML(data));
        }
        getHtml()
    }, [])

    return (
        <div >
            <h1 className="dictionary-title">Bộ pháp điển điện tử</h1>
            <div className="search-grid">
                <div className="relative">
                    <select className="select-title" >
                        <option value="">-- Xem theo chủ đề --</option>
                        <>
                            {data.map((topic, index) => {
                                return <option key={index} value={topic.id}>{topic.name}</option>
                            })}
                        </>
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <div className="relative">
                    <select className="select-title" >
                        <option >-- Xem theo Đề mục --</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                    <FaCaretDown className="arrow" />
                </div>
                <div >
                    <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm" />
                </div>
            </div>

            <FileContext.Provider value={{ file, setFile }}>
                <div className="p-2 lg:p-10 grid grid-cols-10">
                    <div className="col-span-3 border-r-2 border-dark p-2">
                        <TreeView data={data}></TreeView>
                    </div>
                    <div className="col-span-7 px-5" >
                        <div className="px-10 py-5 bg-white shadow-3xl" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>

                </div>
            </FileContext.Provider>
        </div>
    );
};

export default Dictionary;  