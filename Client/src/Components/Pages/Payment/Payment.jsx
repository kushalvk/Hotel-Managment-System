import axios from "axios";
import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";

function Payment() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}payment`, {
                name,
                cardHolderName,
                cardNumber,
                expiryDate,
                cvv,
                amount,
            })
            .then(() => alert("Payment Successful"), localStorage.removeItem("price"), localStorage.removeItem("City"), localStorage.removeItem("RoomType"))
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    // get user for verify admin or user
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setName(res.data.user.username);
            })
            .catch(() => navigate("/"));
    });

    useEffect(() => {
        setAmount(localStorage.getItem("price"))
    }, [amount])

    const today = new Date().toISOString().slice(0, 7);

    return (
        <>
            <ContainerBig title={"Payment"}>
                <Form onsubmit={handlePaymentSubmit}>
                    <InputWithLabel Name={'Name'} value={name} disabled/>
                    <InputWithLabel Name={'Card Holder Name'} onChange={(e) => setCardHolderName(e.target.value)}/>
                    <InputWithLabel Name={'Card Number'}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    maxLength={16}
                                    pattern="^\d{16}$"
                    />
                    <InputWithLabel Name={'Expiry Date'} type={'month'} onChange={(e) => setCardHolderName(e.target.value)} min={today}/>
                    <InputWithLabel Name={'CVV'} onChange={(e) => setCvv(e.target.value)} min={today} maxLength={3} pattern="^\d{3}$"/>
                    <div className="mb-4">
                        <h1 value={amount} className="text-red-500">
                            $ {amount} Total
                        </h1>
                    </div>
                    <Button
                        type="submit"
                    >
                        Pay Now
                    </Button>
                </Form>
            </ContainerBig>
        </>
    );
}

export default Payment;
