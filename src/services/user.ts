import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

// 获取当前登录用户的信息(如果全局变量中有登录信息，则不需要发送请求获取)
export const getCurrentUser = async () => {

    // 在用户量不大的时候，可以不使用缓存
    // const currentUser = getCurrentUserState();
    // if(currentUser) {
    //     return currentUser;
    // }

    // 全局变量中不存在登录信息，远程获取
    const res = await myAxios.get('user/current');
    // @ts-ignore
    if(res.code === 0) {
        setCurrentUserState(res.data);
        return res.data
    }
    return null;
}