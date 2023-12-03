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
    "current-user": `/api/current-user/`,
    "register": `/api/users/register/`,
    "check-email": `api/users/email-existed/`,
    "check-username": `api/users/username-existed/`,

    // Terminologies
    "terminologies": `/api/terminologies/`,
    "search": `/api/terminologies/search-paragraph/`,

    "contact": `/api/contact/`,

}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": 'Bearer ' + cookies.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})  