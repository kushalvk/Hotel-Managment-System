import axios from "axios";
import {error} from "./Error.js";

export const AddRating = async (name,star) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addrating`, {
            name,
            star,
        })
    } catch (err) {
        error(err)
    }
};

export const ShowAllRating = async () => {
    try {
        const responce = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}ratings`)
        return responce.data;
    } catch (err) {
        error(err)
    }
};