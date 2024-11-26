import axios from "axios";
import {error} from "./Error.js";

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}login`,
            {username, password}
        );
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const signup = async (username,email,password,role) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}signup`, {
            username,
            email,
            password,
            role,
        })
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const LoggedUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return response.data.user;
    } catch (err) {
        error(err)
    }
};

export const ForgetPassword = async (email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}forget`, {
            email,
            password,
        })
        return response.data.user;
    } catch (err) {
        error(err)
    }
};

export const AllUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}alluser`)
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const DeleteUser = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}deleteuser/${id}`);
    } catch (err) {
        error(err)
    }
};