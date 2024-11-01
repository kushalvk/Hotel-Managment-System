import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBooking() {
  const navigation = useNavigate();

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigation("/") : null
  })

  // get user for verify admin or user
  const [userData, setUserData] = useState(String);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  const [bookings, setBookings] = useState();
  // Fetch bookings by name
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }mybookings/${userData}`
      )
      .then((response) => {
        // console.log(response.data);
        setBookings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);

  // booking delete
  const deleteBooking = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}booking/${id}`,
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

  const handleUpdate = (id) => {
    localStorage.setItem("updateid", id);
    navigation("/updatebooking");
  };

  const handleinvoic = (id) => {
    navigation(`/invoice?id=${id}`);
  };

  return (
    <>
      <div className="All-background-img text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold text-center mb-10 text-white mt-10">
          My Booking
        </h1>
        <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-3xl w-full text-center">
          {!bookings ? (
            <p className="text-xl font-semibold text-gray-700">
              No bookings found.
            </p>
          ) : (
            bookings.map((booking) => (
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
                  </div>
                </div>
                {/* Button Container with Flexbox */}
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
                    onClick={() => handleUpdate(booking._id)}
                  >
                    Update
                  </button>
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                    onClick={() => handleinvoic(booking._id)}
                  >
                    Invoice
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyBooking;
