/**
 * 用户类别
 */
export type UserType = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    validateCode?: string;
    tags: string[];
    userProfile?: string;
    createTime?: Date;
};

export class TeamType {
}