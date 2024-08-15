import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  // store in database
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [person, setPerson] = useState(1);
  const [city, setCity] = useState();
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [typeroom, setTyperoom] = useState();
  const [price, setPrice] = useState();

  const [bookings, setBookings] = useState([]);

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
        price,
      })
      .then(() => alert("Booking Successful"), navigate("/"))
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

  // Fetch all bookings
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/bookings`)
      .then((response) => {
        // console.log(response.data);
        setBookings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get user for verify admin or user
  const [userData, setUserData] = useState([]);
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

  // booking delete
  const deleteBooking = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/booking/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      if (result) {
        alert("Booking Deleted");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // get city from localstorage
  useEffect(() => {
    if (localStorage.getItem("City")) {
      const cty = localStorage.getItem("City");
      setCity(cty);
    }
  }, []);

  // get RoomType from localstorage
  useEffect(() => {
    if (localStorage.getItem("RoomType")) {
      const RoomType = localStorage.getItem("RoomType");
      console.log(RoomType);
      setTyperoom(RoomType);
    }
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

  return userData.role === "admin" ? (
    bookings.length === 0 ? (
      <div className="All-background-img text-black w-screen bg-cover bg-center flex items-center justify-center">
        <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-3xl text-center">
          <h1 className="text-red-400">No booking Yet...!</h1>
        </div>
      </div>
    ) : (
      <div className="All-background-img text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
        <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-3xl w-full text-center">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 my-4 bg-gray-50 rounded-lg shadow-md border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-semibold text-blue-500">
                    Name: {booking.name}
                  </p>
                  <p>
                    <b>Email: </b>
                    {booking.email}
                  </p>
                  <p>
                    <b>City: </b>
                    {booking.city}
                  </p>
                  <p>
                    <b>Phone: </b>
                    {booking.phone}
                  </p>
                </div>
                <div>
                  <p>
                    <b>Persons: </b>
                    {booking.person}
                  </p>
                  <p>
                    <b>Room Type: </b>
                    {booking.typeroom}
                  </p>
                  <p>
                    <b>Check-in: </b>
                    {new Date(booking.checkin).toLocaleDateString()}
                  </p>
                  <p>
                    <b>Check-out: </b>
                    {new Date(booking.checkout).toLocaleDateString()}
                  </p>
                  <button
                    className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded mt-3"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  ) : (
    <>
      <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
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
                value={userData.username}
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
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Check-Out Date</label>
              <input
                type="date"
                name="checkOut"
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Room Type</label>
              <select
                value={typeroom}
                name="roomType"
                onChange={(e) => setTyperoom(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="" disabled>
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
