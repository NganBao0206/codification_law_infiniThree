import React, { useContext, useEffect, useState } from 'react';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { FaCaretDown } from "react-icons/fa6";
import { schemaQuestion } from '../../validators/yupValidator';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./style.css"

const Forums = () => {

    const [topics, setTopics] = useState([]);
    const [question, setQuestion] = useState({});
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState();
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getTopics();
        getQuestions();
    }, [])

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

    useEffect(() => {
        const filterTopic = async () => {
            if (selectedTopic)
                try {
                    let url = endpoints.questionsByTopic(selectedTopic);
                    const res = await APIs.get(url);
                    if (res.status === 200) {
                        setQuestions(res.data);
                    }
                } catch (ex) {
                    console.error(ex);
                }
        }

        filterTopic();
    }, [selectedTopic]);

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

    const getQuestions = async () => {
        try {
            const res = await APIs.get(endpoints["questions"]);
            if (res.status === 200) {
                setQuestions(res.data.questions);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const changeQuestion = (value, field) => {
        setQuestion((current) => {
            return { ...current, [field]: value }
        })
    }

    const postQuestion = async (evt) => {
        evt.preventDefault();
        if (Object.keys(errors).length > 0) {
            setShowError(true);
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
                    alert("Thêm câu hỏi thành công")
                    getQuestions();
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        process();
    }

    const replyQuestion = async (evt) => {
        evt.preventDefault();
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
                            <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm" />
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
                            <>
                                {
                                    questions && questions.map((q, index) => {
                                        return (
                                            <div key={index} className="question-item">
                                                <div className="question-bg">
                                                    {/* <img className="w-12 h-12 rounded-full object-cover border border-dark shadow-small" src={q.user.avatar} alt="avatar" />
                                                    <span className="font-bold text-lg">{q.user.name}</span> */}
                                                </div>
                                                <div className="col-span-5 flex flex-col gap-2 px-5">
                                                    <h1 className="font-bold text-xl">{q.title}</h1>
                                                    <p className="font-light">{q.description}</p>
                                                </div>
                                                <div className="col-span-6 flex border-t-2 border-dark px-5 pt-5 grid grid-cols-3 items-center">
                                                    <div>
                                                        <h3><span className="font-bold">Lượt trả lời: </span></h3>
                                                    </div>
                                                    <div>
                                                        <h3><span className="font-bold">Thời gian đăng: </span>{moment(q['created_at']).fromNow()}</h3>
                                                    </div>
                                                    <div className="flex justify-end items-center">
                                                        <button className="replies-btn" onClick={() => document.getElementById('reply-modal').showModal()}>Xem câu trả lời</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <dialog id="reply-modal" className="modal">
                                    <div className="modal-box p-8 shadow-3xl  w-11/12 max-w-5xl rounded-none">
                                        <form method="dialog">
                                            <button className="exit-btn">✕</button>
                                        </form>
                                        <div className="w-full">

                                        </div>
                                        <form onSubmit={replyQuestion} className="mt-8 grid grid-cols-5 gap-3 w-full">
                                            <div className="col-span-4">
                                                <input value={question.title} onChange={(evt) => changeQuestion(evt.target.value, evt.target.name)} name="title" className="styled-input" type="text" />
                                                {showError ? <p id="standard_error_help" className="mt-2 text-sm text-button">{errors.question && errors.question.title}</p> : <></>}
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