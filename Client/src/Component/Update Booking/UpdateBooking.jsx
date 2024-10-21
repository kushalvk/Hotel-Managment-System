/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateBooking() {

  const navigate = useNavigate();
  const [updateid, setUpdateid] = useState()
  // store in data in state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState(1);
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [typeroom, setTyperoom] = useState("");
  const [price, setPrice] = useState();
  const [citys, setCitys] = useState([]);

  // get booking ID from localstorage
  useEffect(() => {
    if (localStorage.getItem("updateid")) {
      const uid = localStorage.getItem("updateid");
      setUpdateid(uid);
    }
  }, []);
  
  // Fetch bookings by id
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }upbookings/${updateid}`
      )
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setPerson(res.data.person);
        setCity(res.data.city);
        setTyperoom(res.data.typeroom);
        setPrice(res.data.price);
        setCheckin(new Date(res.data.checkin).toISOString().split("T")[0]);
        setCheckout(new Date(res.data.checkout).toISOString().split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateid]);

  // save data to database
  const handleSubmite = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}updatebooking/${updateid}`, {
        email,
        phone,
        person,
        city,
        checkin,
        checkout,
        typeroom,
        price: locatedPrice,
      })
      .then((booked) => alert("Booing Updated"), navigate("/mybooking"), localStorage.removeItem("updateid"))
      .catch((err) => console.log(err));
  };

  // get all city
  useEffect(() => {
    const config = {
      cUrl: "https://api.countrystatecity.in/v1/countries/IN/states/GJ/cities",
      ckey: "QWFqZnRBUGVpVVpFOGZhcHhCRko4cFdRdFFRakhVWkpmb0MwcjhGag==", // this key sent in email
    };

    async function loadCities() {
      try {
        const response = await fetch(config.cUrl, {
          headers: {
            "X-CSCAPI-KEY": config.ckey,
          },
        });
        const data = await response.json();
        setCitys(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    loadCities();
  }, []);

  // Automatically set price based on room type
  useEffect(() => {
    switch (typeroom) {
      case "Single Bad (Non A/c)":
        setPrice(person * 70);
        break;
      case "Single Bad (A/c)":
        setPrice(person * 110);
        break;
      case "Double Bad (Non A/c)":
        setPrice(person * 140);
        break;
      case "Double Bad (A/c)":
        setPrice(person * 200);
        break;
      case "Dining":
        setPrice(person * 90);
        break;
      case "Hall-1 (300 capacity)":
        setPrice(170000);
        setPerson(300);
        break;
      case "Hall-2 (700 capacity)":
        setPrice(270000);
        setPerson(700);
        break;
      default:
        break;
    }
  }, [typeroom, person]);

  // calculate diffrence between check-in and check-out & calculate total price
  const [locatedPrice, setlocatedPrice] = useState();

  useEffect(() => {
    if (checkin && checkout) {
      const checkInDate = new Date(checkin);
      const checkOutDate = new Date(checkout);

      // Calculate the difference in time
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();

      // Convert time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference > 1) {
        setlocatedPrice(price * daysDifference);
      } else {
        setlocatedPrice(price * 1);
      }
    }
  }, [checkin, checkout, price]);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

  return (
    <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Update Your Booking
        </h2>
        <form onSubmit={handleSubmite}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your Full name"
              className="bg-black text-white w-full px-4 py-2 border rounded"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone no.</label>
            <input
              type="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone no."
              className="bg-black text-white w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="bg-black text-white w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Person</label>
            <input
              type="number"
              name="person"
              value={person}
              min={1}
              onChange={(e) => setPerson(e.target.value)}
              placeholder="Enter a Person"
              className="bg-black text-white w-full px-4 py-2 border rounded"
              required
              disabled={
                typeroom === "Hall-1 (300 capacity)" ||
                typeroom === "Hall-2 (700 capacity)"
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-black text-white allcity mb-4 px-4 py-2 border rounded w-full"
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {citys.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
              <label className="block text-gray-700">Check-In Date</label>
              <input
                type="date"
                name="checkIn"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="bg-black text-white w-full px-4 py-2 border rounded"
                required
                min={today}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Check-Out Date</label>
              <input
                type="date"
                name="checkOut"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="bg-black text-white w-full px-4 py-2 border rounded"
                required
                min={checkin || today}
              />
            </div>
          <div className="mb-4">
            <label className="block text-gray-700">Room Type</label>
            <select
              name="roomType"
              value={typeroom}
              onChange={(e) => setTyperoom(e.target.value)}
              className="bg-black text-white w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a room type
              </option>
              <option value="Single Bad (Non A/c)">Single Bad (Non A/c)</option>
              <option value="Single Bad (A/c)">Single Bad (A/c)</option>
              <option value="Double Bad (Non A/c)">Double Bad (Non A/c)</option>
              <option value="Double Bad (A/c)">Double Bad (A/c)</option>
              <option value="Dining">Dining</option>
              <option value="Hall-1 (300 capacity)">
                Hall-1 (300 capacity)
              </option>
              <option value="Hall-2 (700 capacity)">
                Hall-2 (700 capacity)
              </option>
            </select>
          </div>
          {person ? (
            <div>
              <h1 value={locatedPrice || price} className="text-red-500">
                $ {locatedPrice || price}
              </h1>
              <p className="text-black">
                Please read once{" "}
                {<a href="termscondition">Terms & Condition</a>} and{" "}
                {<a href="privacyPolicy">Privacy Policy</a>} befor Booking.
              </p>
            </div>
          ) : null}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBooking;
