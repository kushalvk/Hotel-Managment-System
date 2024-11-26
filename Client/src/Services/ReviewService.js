import axios from "axios";
import {error} from "./Error.js";

export const AddReview = async (name,review) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addreview`, {
            name,
            review,
        })
    } catch (err) {
        error(err)
    }
};

export const ShowAllReview = async () => {
    try {
        const responce = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}reviews`)
        return responce.data;
    } catch (err) {
        error(err)
    }
};

export const DeleteReview = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}review/${id}`)
    } catch (err) {
        error(err)
    }
};