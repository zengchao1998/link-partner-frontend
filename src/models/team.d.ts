import {UserType} from "./user";

/**
 * 队伍信息类别
 */
export type TeamType = {
    id: number,
    teamName: string,
    description?: string,
    maxNum: number,
    expireTime?: Date;
    userId: number,
    status: number,
    createTime: Date,
    updateTime: Date,
    teamUsers: null,
    createUser?: UserType,
    hasJoin: boolean,
    teamNum: number,
};