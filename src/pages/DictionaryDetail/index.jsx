import { useParams } from "react-router-dom";
import "./style.css";
import { useContext, useEffect } from "react";
import { FileContext } from "../../layouts/DictionaryLayout";
import { scrollToElement, scrollToTop } from "../../utils/scrollUtils";

const DictionaryDetail = () => {

    const { slugTopic } = useParams();
    const { file, setFile, html } = useContext(FileContext);

    useEffect(() => {
        const HtmlRefresh = async () => {
            const arr = slugTopic.split("&");
            if (file !== arr[0]) {
                setFile(arr[0]);
                scrollToTop();
            }
            if (arr.length === 2) {
                if (file !== arr[0]) {
                    scrollToTop();
                    setFile(arr[0]);
                }
                const curFile = await file;
                if (curFile === arr[0]) {
                    scrollToElement(arr[1]);
                }
            }
        }
        HtmlRefresh();
    }, [slugTopic])

    return (
        <>
            {html &&
                <div className="px-10 py-5 bg-white shadow-3xl h-[120rem] overflow-y-auto" dangerouslySetInnerHTML={{ __html: html }} />
            }
        </>
    );
};

export default DictionaryDetail;  