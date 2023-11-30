import { useState } from 'react';
import { PiFolder, PiFolderOpen, PiFile } from "react-icons/pi";
import APIs, { endpoints } from '../../../../configs/APIs';


const TreeNode = ({ data }) => {
    const [expand, setExpand] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [items, setItems] = useState([]);

    const handleExpand = async () => {
        if (!fetched) {
            const fetchSubTopics = async function (id) {
                try {
                    const url = endpoints.subTopics(id);
                    const res = await APIs.get(url);
                    if (res.status === 200) {
                        setItems(res.data);
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            fetchSubTopics(data.id);
            setFetched(true);
        }
        setExpand(!expand);
    };

    return (
        <div className="">
            <div className="w-full cursor-pointer p-2 grid grid-cols-10 gap-2 items-start hover:bg-blue-100" onClick={handleExpand}>
                <div className="col-span-1">
                    {data.order ? (expand ? <PiFolderOpen size="20" /> : <PiFolder size="20" />) : <PiFile size="20" />}
                </div>
                <span className="col-span-9">{data.name} </span>
            </div>
            <div className={`${expand ? "block ml-3.5 pl-4 border-l-2 border-gray-500" : "hidden"}`}>
                {items && items.map((child) => (
                    <TreeNode key={child.name} data={child} />
                ))}
            </div>
        </div >
    );
};

{/* <span className="italic hover:underline">(Xem chi tiết)</span> */ }

export default TreeNode;
