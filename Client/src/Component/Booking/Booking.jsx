import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Abooking from "./Abooking";

function Booking() {
  const navigate = useNavigate();

  // store in state
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [person, setPerson] = useState(1);
  const [city, setCity] = useState();
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [typeroom, setTyperoom] = useState();
  const [price, setPrice] = useState();
  const [userData, setUserData] = useState([]);
  const [citys, setCitys] = useState([]);

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/") : null;
  });

  // save data to database
  const handleSubmite = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/booking`, {
        name,
        email,
        phone,
        person,
        city,
        checkin,
        checkout,
        typeroom,
        price: locatedPrice,
      })
      .then(
        () =>
          alert("To Confarm Your Booking Please do a payment...! Thank you "),
        navigate("/payment")
      )
      .then(() => {
        localStorage.setItem("price", locatedPrice);
        location.reload();
      })
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

  // get user for verify admin or user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
        setName(res.data.user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  // get city & roomType from localstorage
  useEffect(() => {
    const roomType = localStorage.getItem("RoomType");
    const city = localStorage.getItem("City");

    if (roomType) {
      setTyperoom(roomType);
    }

    if (city) {
      setCity(city);
    }
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

  return userData.role === "admin" ? (
    <Abooking />
  ) : (
    <>
      <div className="All-background-img h-full p-9 w-screen bg-cover bg-center flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Booking
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
                pattern="^\d{10}$"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone no."
                className="w-full px-4 py-2 border rounded"
                required
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
                required
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
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded"
                required
                min={checkin || today}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Room Type</label>
              <select
                value={typeroom || "Select a room type"}
                name="roomType"
                onChange={(e) => setTyperoom(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="Select a room type" disabled>
                  Select a room type
                </option>
                <option value="Single Bad (Non A/c)">
                  Single Bad (Non A/c)
                </option>
                <option value="Single Bad (A/c)">Single Bad (A/c)</option>
                <option value="Double Bad (Non A/c)">
                  Double Bad (Non A/c)
                </option>
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
                  $ {price} / Per Day
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
    </>
  );
}

export default Booking;
