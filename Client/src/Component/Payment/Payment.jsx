import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/payment`, {
        name,
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        amount,
      })
      .then(() => alert("Payment Successful"), localStorage.removeItem("price"))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  // get user for verify admin or user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setName(res.data.user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setAmount(localStorage.getItem("price"))
  }, [amount])

  return (
    <>
      <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center py-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Payment
          </h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter Name"
                className="w-full px-4 py-2 border rounded"
                required
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="Enter Cardholder Name"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardNumber}
                maxLength={16}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter Card Number"
                className="w-full px-4 py-2 border rounded"
                required
                pattern="^\d{16}$"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="month"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cvv}
                maxLength={3}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Enter CVV"
                className="w-full px-4 py-2 border rounded"
                required
                pattern="^\d{3}$"
              />
            </div>
            <div className="mb-4">
              <h1 value={amount} className="text-red-500">
                  $ {amount} / Per Day
                </h1>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
