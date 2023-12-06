import { useParams } from "react-router-dom";
import "./style.css";
import { useContext, useEffect } from "react";
import { FileContext } from "../../layouts/DictionaryLayout";
import { scrollToElement, scrollToTop } from "../../utils/scrollUtils";

const DictionaryDetail = () => {

    const { slugTopic } = useParams();
    const { file, setFile, html } = useContext(FileContext);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const arr = slugTopic.split("&");
        if (file !== arr[0]) {
            setFile(arr[0]);
        }
        if (arr.length === 2) {
            if (file !== arr[0]) {
                scrollToTop();
                setFile(arr[0]);
            }
            scrollToElement(arr[1]);
        }
    }, [slugTopic])

    return (
        <>
            <div className="p-10 bg-white shadow-3xl h-[120rem] overflow-y-auto">
                <>
                    {html ? (<div dangerouslySetInnerHTML={{ __html: html }} />) : (<span className="loading loading-infinity loading-lg bg-button"></span>)}
                </>
            </div>
        </>
    );
};

export default DictionaryDetail;  