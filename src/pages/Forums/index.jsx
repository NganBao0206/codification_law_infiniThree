import React, { useContext, useEffect, useState } from 'react';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { FaCaretDown } from "react-icons/fa6";
import { schemaQuestion } from '../../validators/yupValidator';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./style.css"
import { useDebounce } from 'use-debounce';

const Forums = () => {

    // Topics
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState();

    // Questions
    const [question, setQuestion] = useState({
        title: "",
        description: ""
    });
    const [filterTitle, setFilterTitle] = useState("");
    const [debouncedfilterTitle] = useDebounce(filterTitle, 1000);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});

    // Errors
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    // Replies
    const [reply, setReply] = useState({
        content: ""
    });
    const [replies, setReplies] = useState({});

    // Current User
    const { currentUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getTopics();
        getQuestions();
    }, [])

    // Validation
    useEffect(() => {
        const validateAll = async () => {
            let schemas = [schemaQuestion];
            let data = [question];
            let dataNames = ['question'];
            setErrors({});
            for (let i = 0; i < schemas.length; i++) {
                try {
                    await schemas[i].validate(data[i], { abortEarly: false });
                } catch (error) {
                    const errorMessages = {};
                    error.inner.forEach((err) => {
                        errorMessages[err.path] = err.message;
                    });
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [dataNames[i]]: errorMessages
                    }));
                }
            }
        };
        validateAll();
    }, [question]);

    // Load Replies
    useEffect(() => {
        showReplies();
    }, [selectedQuestion])

    // Load Questions By Topic
    useEffect(() => {
        setLoading(true);
        getQuestions();
    }, [selectedTopic])

    // Load Questions By Title
    useEffect(() => {
        setLoading(true);
        getQuestions();
    }, [filterTitle])

    // All topics
    const getTopics = async () => {
        try {
            const res = await APIs.get(endpoints["topics"]);
            if (res.status === 200) {
                setTopics(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    // All questions
    const getQuestions = async () => {
        console.log(debouncedfilterTitle);
        try {
            const res = await APIs.get(endpoints["questions"], {
                params: {
                    "kw": debouncedfilterTitle,
                    "topic_id": selectedTopic
                }
            });
            if (res.status === 200) {
                setQuestions(res.data.questions);
                setLoading(false);
            }
        } catch (ex) {
            console.error(ex);
            setLoading(false);
        }
    };

    // Update Question
    const changeQuestion = (value, field) => {
        setQuestion((current) => {
            return { ...current, [field]: value }
        })
    }

    // Update Replies
    const changeReply = (value, field) => {
        setReply((current) => {
            return { ...current, [field]: value }
        })
    }

    const postQuestion = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        if (Object.keys(errors).length > 0) {
            setShowError(true);
            setLoading(false);
            return;
        }
        setShowError(false);
        const process = async () => {
            try {
                let form = new FormData();
                form.append("topic_id", question.topic);
                form.append("title", question.title);
                form.append("description", question.description);
                form.append("user_id", currentUser.id);

                let res = await authApi().post(endpoints['questions'], form);
                if (res.status === 201) {
                    alert("Thêm câu hỏi thành công");
                    setLoading(false);
                    setQuestion({
                        topic: "",
                        title: "",
                        description: "",
                        user_id: undefined,
                    });
                    getQuestions();
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        process();
    }

    const showReplies = async () => {
        try {
            const res = await APIs.get(endpoints["replies"], {
                "question_id": selectedQuestion.id
            });
            if (res.status === 200) {
                console.log(res.data)
                setReplies(res.data.replies);
            }
        } catch (ex) {
            console.error(ex);
        }
    }


    const replyQuestion = async (evt) => {
        evt.preventDefault();
        if (reply.content.length > 0) {
            const newReply = {
                ...reply,
                user_id: currentUser.id,
                question_id: selectedQuestion.id
            };
            setReply(newReply);
            try {
                const res = await authApi().post(endpoints["replies"], reply);
                if (res.status === 201) {
                    setReply({
                        content: ""
                    });
                    showReplies();
                }
            } catch (ex) {
                console.error(ex);
            }
        }
    }

    return (
        <div>
            <h1 className="title">Diễn đàn pháp luật</h1>
            <div className="grid grid-cols-10 gap-2">
                <div className="col-span-10">
                    <div className="grid grid-cols-10 gap-5 items-center mx-5">
                        <div className="relative col-span-10 lg:col-span-4">
                            <select className="select-title" onChange={(evt) => setSelectedTopic(evt.target.value)} >
                                <option value="">-- Xem theo chủ đề --</option>
                                <>
                                    {topics && topics.map((topic, index) => {
                                        return <option key={index} value={topic.id}>{topic.name}</option>
                                    })}
                                </>
                            </select>
                            <FaCaretDown className="arrow" />
                        </div>
                        <div className="col-span-10 lg:col-span-4">
                            <input value={filterTitle} className="search-input" type="text" placeholder="Tìm kiếm tiêu đề của bài viết" onChange={(evt) => setFilterTitle(evt.target.value)} />
                        </div>
                        {
                            currentUser ? <div className="col-span-10 lg:col-span-2 flex justify-center">
                                <button className="styled-button w-full" onClick={() => document.getElementById('question_modal').showModal()}>Đặt câu hỏi</button>
                            </div> : <Link to="/dang-nhap?next=/dien-dan" className="col-span-10 lg:col-span-2 flex justify-center">
                                <button className="styled-button w-full" >Đặt câu hỏi</button>
                            </Link>
                        }
                        <dialog id="question_modal" className="modal">
                            <div className="modal-box p-8 shadow-3xl  w-11/12 max-w-5xl rounded-none">
                                <form method="dialog">
                                    <button className="exit-btn">✕</button>
                                </form>
                                <h3 className="font-bold text-2xl">Đặt câu hỏi</h3>
                                <form onSubmit={postQuestion} className="my-8 flex flex-col gap-3">
                                    <div>
                                        <h3 className="mb-2">Chủ đề</h3>
                                        <div className="relative col-span-10 lg:col-span-4">
                                            <select className="select-title" value={question.topic} name="topic" onChange={(evt) => changeQuestion(evt.target.value, evt.target.name)}>
                                                <option value="">-- Chọn chủ đề để đặt câu hỏi --</option>
                                                <>
                                                    {topics && topics.map((topic, index) => {
                                                        return <option key={index} value={topic.id}>{topic.name}</option>
                                                    })}
                                                </>
                                            </select>
                                            <FaCaretDown className="arrow" />
                                        </div>
                                        {showError ? <p id="standard_error_help" className="mt-2 text-sm text-button">{errors.question && errors.question.topic}</p> : <></>}
                                    </div>
                                    <div>
                                        <h3 className="mb-2">Tiêu đề</h3>
                                        <input value={question.title} onChange={(evt) => changeQuestion(evt.target.value, evt.target.name)} name="title" className="styled-input" type="text" />
                                        {showError ? <p id="standard_error_help" className="mt-2 text-sm text-button">{errors.question && errors.question.title}</p> : <></>}
                                    </div>
                                    <div className="mb-3 lg:mb-5">
                                        <h3 className="mb-2">Nội dung</h3>
                                        <textarea value={question.description} onChange={(evt) => changeQuestion(evt.target.value, evt.target.name)} name="description" rows="5" className="w-full p-2 text-lg focus:outline-none  border-[1px] border-dark" placeholder="Nhập nội dung ..." ></textarea>
                                        {showError ? <p id="standard_error_help" className="mt-2 text-sm text-button">{errors.question && errors.question.description}</p> : <></>}
                                    </div>
                                    <button className='ask-btn'>
                                        Đăng câu hỏi
                                    </button>
                                </form>
                            </div>
                        </dialog>

                        <div className="col-span-10">
                            <> {loading ?
                                <span className="loading loading-infinity loading-lg bg-button"></span> :
                                <>
                                    {
                                        questions.length ? questions.map((q, index) => {
                                            return (
                                                <div key={index} className="question-item">
                                                    <div className="question-bg">
                                                        <img className="w-12 h-12 rounded-full object-cover border border-dark shadow-small" src={q.user.avatar} alt="avatar" />
                                                        <span className="font-bold text-lg">{q.user.name}</span>
                                                    </div>
                                                    <div className="col-span-5 flex flex-col gap-2 px-5">
                                                        <h1 className="font-bold text-xl">{q.title}</h1>
                                                        <p className="font-light">{q.description}</p>
                                                    </div>
                                                    <div className="col-span-6 flex border-t-2 border-dark px-5 pt-5 grid grid-cols-5 items-center">
                                                        <div className="col-span-2">
                                                            <h3 className='w-full truncate'><span className="font-bold">Chủ đề: </span>{q.topic.name}</h3>
                                                        </div>
                                                        <div>
                                                            <h3><span className="font-bold">Lượt trả lời: </span></h3>
                                                        </div>
                                                        <div>
                                                            <h3><span className="font-bold">Thời gian đăng: </span>{moment(q['created_at']).fromNow()}</h3>
                                                        </div>
                                                        <div className="flex justify-end items-center">
                                                            <button className="replies-btn" onClick={() => { setSelectedQuestion(q); document.getElementById('reply-modal').showModal() }}>Xem câu trả lời</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : (<>
                                            <p className=' w-full flex justify-center items-center'>Không tìm thấy kết quả nào </p>
                                        </>)
                                    }
                                </>
                            }
                                <dialog id="reply-modal" className="modal">
                                    <div className="modal-box p-8 shadow-3xl  w-11/12 max-w-5xl rounded-none">
                                        <form method="dialog">
                                            <button className="exit-btn">✕</button>
                                        </form>
                                        <div className="w-full flex flex-col gap-5 p-5">
                                            <>
                                                {
                                                    replies.length ? replies.map((reply, index) => {
                                                        return (<div key={index} className="grid grid-col-10">
                                                            <div className="col-span-2">

                                                            </div>
                                                            <div className="col-span-8">
                                                                {reply.content}
                                                            </div>
                                                        </div>)
                                                    }) : <div>
                                                        Chưa có câu trả lời nào
                                                    </div>
                                                }
                                            </>
                                        </div>
                                        <form onSubmit={replyQuestion} className="mt-8 grid grid-cols-5 gap-3 w-full">
                                            <div className="col-span-4">
                                                <input value={reply.content} onChange={(evt) => changeReply(evt.target.value, evt.target.name)} name="content" className="styled-input" type="text" />
                                            </div>
                                            <button className='ask-btn'>
                                                Gửi phản hồi
                                            </button>
                                        </form>
                                    </div>
                                </dialog>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Forums;