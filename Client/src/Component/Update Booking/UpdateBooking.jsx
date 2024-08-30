/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateBooking() {

  const navigate = useNavigate();

    // get booking ID from localstorage
  const [updateid, setUpdateid] = useState()
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateid]);

  // store in database
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState(1);
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [typeroom, setTyperoom] = useState("");
  const [price, setPrice] = useState();

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
        price,
      })
      .then((booked) => alert("Booing Updated"), navigate("/mybooking"), localStorage.removeItem("updateid"))
      .catch((err) => console.log(err));
  };

  // get all city
  const [citys, setCitys] = useState([]);
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
    if (typeroom === "Hall-1 (300 capacity)") {
      setPrice(170000);
      setPerson(300);
    } else if (typeroom === "Hall-2 (700 capacity)") {
      setPrice(270000);
      setPerson(700);
    } else {
      setPrice(person * 70);
    }
  }, [typeroom, person]);

  const handleCheckoutChange = (e) => {
    const selectedCheckoutDate = e.target.value;
    if (new Date(selectedCheckoutDate) <= new Date(checkin)) {
      alert("Check-Out Date cannot be earlier than or the same as Check-In Date.");
      setCheckout(" ")
    } else {
      setCheckout(selectedCheckoutDate);
    }
  };

  const handleCheckinChange = (e) => {
    const selectedCheckinDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (selectedCheckinDate < currentDate) {
      alert("Check-In Date cannot be earlier than today's date.");
      setCheckin(" ")
    } else {
      setCheckin(selectedCheckinDate);
    }
  };

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
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
              className="allcity mb-4 px-4 py-2 border rounded w-full text-white"
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
              onChange={handleCheckinChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Check-Out Date</label>
            <input
              type="date"
              name="checkOut"
              value={checkout}
              onChange={handleCheckoutChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Room Type</label>
            <select
              name="roomType"
              value={typeroom}
              onChange={(e) => setTyperoom(e.target.value)}
              className="w-full px-4 py-2 border rounded"
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
              <h1 value={price} className="text-red-500">
                $ {price}
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
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBooking;
