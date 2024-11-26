import axios from "axios";
import {error} from "./Error.js";

export const ShowAllFacility = async () => {
    try {
        const responce = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}facilities`)
        return responce.data;
    } catch (err) {
        error(err)
    }
};

export const Addfacility = async (title,imageUrl,description) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addfacility`, {
            title,
            imageUrl,
            description,
        })
    } catch (err) {
        error(err)
    }
};