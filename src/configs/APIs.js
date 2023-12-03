import axios from "axios";
import cookies from "react-cookies";

const SERVER = import.meta.env.VITE_SERVER_URL;

export const endpoints = {

    // Topics Tree
    "topics": `/api/codification-topics/`,
    "subTopics": (id) => `/api/codification-topics/${id}/sub-topics/`,
    "indexes": (id) => `/api/codification-sub-topics/${id}/indexes/`,
    "indexChildren": (id) => `/api/codification-indexes/${id}/children/`,

    // User Login && Register
    "login": `/api/users/login/`,
    "register": `/api/users/register/`,
    "check-email": `api/users/email-existed/`,
    "check-username": `api/users/username-existed/`,

    // Terminologies
    "terminologies": `/api/terminologies/`,
    "search": `/api/terminologies/search-paragraph/`,

    // Contact
    "contact": `/api/contact/`,

    // Forum
    "questions": `/api/questions/`,
    "questionInfo": (id) => `/api/questions/${id}`,
    "repliesOfQuestion": (id) => `/api/replies/${id}`,
    "repliesOfUser": `/api/replies/`,


}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": 'Bearer ' + cookies.load("token")
        },
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }

    })
}

export default axios.create({
    baseURL: SERVER,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
})  