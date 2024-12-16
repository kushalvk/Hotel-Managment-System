import axios from "axios";
import {error} from "./Error.js";

export const InsertBooking = async (name, email, phone, person, city, checkin, checkout, typeroom, price) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}booking`, {
            name,
            email,
            phone,
            person,
            city,
            checkin,
            checkout,
            typeroom,
            price,
        })
    } catch (err) {
        error(err)
    }
};

export const FetchAllBooking = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}bookings`);
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const FetchBooking = async (id) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }upbookings/${id}`
        );
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const FetchBookingByName = async (name) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }mybookings/${name}`
        );
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const UpdateBooked = async (id, email, phone, person, city, checkin, checkout, typeroom, price) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}updatebooking/${id}`, {
                email,
                phone,
                person,
                city,
                checkin,
                checkout,
                typeroom,
                price,
            }
        );
        return response.data;
    } catch (err) {
        error(err)
    }
};

export const DeleteBooking = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}booking/${id}`);
    } catch (err) {
        error(err)
    }
};

export const AutoDeleteBooking = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}delete-old-bookings`);
    } catch (err) {
        error(err)
    }
};

export const SearchBooking = async (debouncedSearchQuery) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}bookings/search`,
            {
                params: {searchQuery: debouncedSearchQuery},
            })
        return response.data;
    } catch (err) {
        error(err)
    }
};
