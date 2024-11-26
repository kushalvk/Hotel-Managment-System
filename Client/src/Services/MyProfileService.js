import axios from "axios";
import {error} from "./Error.js";

export const UpdateProfile = async (id, username, email) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}updateuser/${id}`, {
            username, email
        })
    } catch (err) {
        error(err)
    }
};