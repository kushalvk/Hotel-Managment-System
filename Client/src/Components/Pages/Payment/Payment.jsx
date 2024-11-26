import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import {AddPayment} from "../../../Services/PaymentService.js";
import {LoggedUser} from "../../../Services/AuthService.js";

function Payment() {
    const navigate = useNavigate();

    const [UserData, setUserData] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");

    const handlePaymentSubmit = async () => {
        try {
            await AddPayment(name, cardHolderName, cardNumber, expiryDate, cvv, amount);
            navigate("/mybooking");
            alert("Payment Successful");
            localStorage.removeItem("price","City","RoomType");
        } catch (e) {
            console.log(e.message);
        }
    };

    // get user for verify admin or user
    useEffect(() => {
        const Logged = async () => {
            try {
                setUserData(await LoggedUser());
            } catch (e) {
                console.log(e.message);
            }
        }
        Logged();
        setAmount(localStorage.getItem("price"))
    }, []);

    const today = new Date().toISOString().slice(0, 7);

    return (
        <>
            <ContainerBig title={"Payment"}>
                <Form onSubmit={handlePaymentSubmit}>
                    <InputWithLabel Name={'Name'} value={UserData.username} disabled/>
                    <InputWithLabel Name={'Card Holder Name'} onChange={(e) => setCardHolderName(e.target.value)}/>
                    <InputWithLabel Name={'Card Number'}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    maxLength={16}
                                    pattern="^\d{16}$"
                    />
                    <InputWithLabel Name={'Expiry Date'} type={'month'} onChange={(e) => setExpiryDate(e.target.value)} min={today}/>
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
