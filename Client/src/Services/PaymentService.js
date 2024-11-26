import axios from "axios";
import {error} from "./Error.js";

export const AddPayment = async (name,cardHolderName,cardNumber,expiryDate,cvv,amount) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}payment`, {
            name,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            amount,
        })
    } catch (err) {
        error(err)
    }
};