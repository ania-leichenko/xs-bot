declare type UsersGetAllRequestDto = {
    chat_id: number;
    first_name: string;
    username?: string;
    admin: number;
    joined: Date;
    last_action: Date;
};
export { type UsersGetAllRequestDto };
