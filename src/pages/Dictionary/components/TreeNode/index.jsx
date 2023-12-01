import { useContext, useEffect, useState } from "react";
import { PiFolderOpen, PiFolder, PiFile } from "react-icons/pi";
import APIs, { endpoints } from "../../../../configs/APIs";
import { FileContext } from "../..";


const TreeNode = ({ data, level }) => {
    const [expand, setExpand] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [items, setItems] = useState([]);
    const { setFile, topics, subTopics } = useContext(FileContext);

    const fetchData = async (level, id) => {
        const fetchIndexChildren = async function (id) {
            try {
                const url = endpoints.indexChildren(id);
                const res = await APIs.get(url);
                if (res.status === 200) {
                    return res.data;
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        switch (level) {
            case 0:
                const fetchSubTopics = async function (id) {
                    try {
                        const url = endpoints.subTopics(id);
                        const res = await APIs.get(url);
                        if (res.status === 200) {
                            return res.data;
                        }
                    } catch (ex) {
                        console.error(ex);
                    }
                }
                return await fetchSubTopics(id);
            case 1:
                const fetchTopicIndexes = async function (id) {
                    try {
                        const url = endpoints.indexes(id);
                        const res = await APIs.get(url);
                        if (res.status === 200) {
                            return res.data;
                        }
                    } catch (ex) {
                        console.error(ex);
                    }
                }
                return await fetchTopicIndexes(id);
            default:
                return await fetchIndexChildren(id);
        }
    };

    const handleExpand = async () => {
        if (!fetched) {
            const fetchedItems = await fetchData(level, data.id);
            console.log(fetchedItems);
            setItems(fetchedItems);
            setFetched(true);
        }
        setExpand(!expand);
    };

    const renderLevel = (data, level) => {
        switch (level) {
            case 0:
                return <span className="col-span-9">Chủ đề {data.order}: {data.name} </span>;
            case 1:
                return <span className="col-span-9">Đề mục {data.order}: {data.name} <span onClick={(evt) => { evt.stopPropagation(); setFile(data.id); }} className="hover:underline hover:font-bold hover:text-button">(Xem chi tiết)</span> </span>;
            default:
                return <span className="col-span-9">{data.name} <span onClick={(evt) => { evt.stopPropagation(); setFile(data["sub_topic_id"]); }} className="hover:underline hover:font-bold hover:text-button">(Xem chi tiết)</span> </span>;
        }
    }

    useEffect(() => {
        setExpand(false);
    }, [topics, subTopics]);


    return (
        <div className="cursor-pointer">
            <div className="w-full p-2 grid grid-cols-10 gap-2 items-start hover:bg-blue-100 " onClick={handleExpand}>
                <div className="col-span-1">
                    {data["index_type"] !== "Dieu" ? (expand ? <PiFolderOpen size="20" /> : <PiFolder size="20" />) : <PiFile size="20" />}
                </div>
                {renderLevel(data, level)}
            </div>
            <div className={`${expand ? "block ml-3.5 pl-4 border-l-2 border-gray-500" : "hidden"}`}>
                {items && items.map((child) => (
                    <TreeNode key={child.name} data={child} level={level + 1} />
                ))}
            </div>
        </div >
    );
};

export default TreeNode;
