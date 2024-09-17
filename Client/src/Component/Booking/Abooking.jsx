import axios from "axios";
import { useEffect, useState } from "react";

function Abooking() {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}bookings`)
      .then((response) => {
        // console.log(response.data);
        setBookings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <>
      {bookings.length === 0 ? (
        <div className="All-background-img text-black w-screen bg-cover bg-center flex items-center justify-center">
          <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-3xl text-center">
            <h1 className="text-blue-400">No booking Yet...!</h1>
          </div>
        </div>
      ) : (
        <div className="All-background-img pb-9 text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start">
          <h1 className="text-4xl font-bold text-center mb-10 text-white mt-10">
            Booking
          </h1>
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
      )}
    </>
  );
}

export default Abooking;
