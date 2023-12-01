import cookie from 'react-cookies'

const UserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            return action.payload || null;
        case "logout":
            cookie.remove("token");
            cookie.remove("user");
            return null;
        default:
    }
    return currentState;
};

export default UserReducer;