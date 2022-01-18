import Cookies from "js-cookie";
import { IUserData } from "../../interfaces/User/IUserData";

export const setUserData = (data: IUserData) => {
    Cookies.set('orlan_token', data.token, {expires: 1});

    window.location.replace('/')
}