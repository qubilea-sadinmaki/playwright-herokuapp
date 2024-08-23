import { User } from "./types";
require('dotenv').config()

export class Constants {
    static readonly BASE_URL: string = 'https://thinking-tester-contact-list.herokuapp.com';
    static readonly MAIN_USER: User = {
        username: `${process.env.USER_NAME}`,
        password: `${process.env.PASSWORD}`
    };
}