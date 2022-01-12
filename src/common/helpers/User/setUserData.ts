import { IUserData } from "../../interfaces/User/IUserData";

export const setUserData = (data: IUserData) => {
    localStorage.setItem('orlan_token', data.token);
}