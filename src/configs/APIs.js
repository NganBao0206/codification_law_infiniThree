import axios from "axios";
// import cookie from "react-cookies";

const SERVER = import.meta.env.VITE_SERVER_URL;

export const endpoints = {
    "topics": `/api/codification-topics/`,


    // "current-user": `/api/current-user/`,
    // "register": `/api/users/`,
    // "motels": `/api/motels/`,
    // "motels-polygon": `/api/motels-polygon/`,
    // "posts": `/api/posts/`,
    // "countPosts": `/api/posts/count/`,
    // "addPostRent": `/api/posts/rent/`,
    // "addPostFind": `/api/posts/find/`,
    // "userInfo": (username) => `/api/users/${username}/`,
    // "motelInfo": (slug) => `/api/motels/${slug}/`,
    // "motelImages": (slug) => `/api/motels/${slug}/images/`,
    // "postInfo": (slug) => `/api/posts/${slug}/`,
    // "postImages": (slug) => `/api/posts/${slug}/images/`,
    // "postComments": (slug) => `/api/posts/${slug}/comments/`,
    // "mapAutocomplate": `/api/map/autocomplete/`,
    // "mapDetail": `/api/map/detail/`,
    // "mapDirection": `/api/map/direction/`,
    // "addComment": `/api/comments/`,
    // "register-landlord": `/api/register-landlord/`,

    // "favour": `/api/favourites/`,
    // "favourCount": `/api/favourites/count/`,

    // "getFavourOfUser": `/api/favourites/user/`,
    // "getAuthToken": `/api/auth-token/`,

    // "follows": `/api/follows/`,
    // "followers": (username: any) => `/api/follows/followers/${username}/`,
    // "followings": (username: any) => `/api/follows/followings/${username}/`,

    // "countFollowers": (username: any) => `/api/follows/followers-count/${username}/`,
    // "countFollowings": (username: any) => `/api/follows/followings-count/${username}/`,

    // "resend-confirm": `/api/resend-confirm-email/`,

    // "rates": `/api/rates/`,
    // "rates-motels-stats": `/api/rates/motels/stats/`,
    // "rates-motels": `/api/rates/motels/`,
    // "rate-user-motel": `/api/rates/user-motel/`

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