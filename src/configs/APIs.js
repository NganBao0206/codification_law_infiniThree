import axios from "axios";
// import cookie from "react-cookies";

const SERVER = import.meta.env.VITE_SERVER_URL;

export const endpoints = {
    "topics": `/api/codification-topics/`,
    "subTopics": (id) => `/api/codification-topics/${id}/sub-topics/`,
    "indexes": (id) => `/api/codification-sub-topics/${id}/indexes/`,
    "indexChildren": (id) => `/api/codification-indexes/${id}/children/`


}

// export const authApi = () => {
//     return axios.create({
//         baseURL: SERVER,
//         headers: {
//             "Authorization": cookie.load("token")
//         }
//     })
// }

export default axios.create({
    baseURL: SERVER
})  