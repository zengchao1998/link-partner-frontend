import {UserType} from "../models/user";

// 存储当前登录状态的变量
let currentUser: UserType;

const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

const getCurrentUserState = () => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}