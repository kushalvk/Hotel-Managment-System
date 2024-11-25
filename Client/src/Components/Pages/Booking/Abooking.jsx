import axios from "axios";
import { useEffect, useState } from "react";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import TextBox from "../../Atom/TextBox.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";

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

  // search booking
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce search query to reduce API calls on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch all bookings or search based on debounced query
  useEffect(() => {
    if (debouncedSearchQuery) {
      // Fetch bookings by search query
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}bookings/search`,
          {
            params: { searchQuery: debouncedSearchQuery },
          }
        )
        .then((response) => {
          setBookings(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Fetch all bookings when search query is empty
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}bookings`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debouncedSearchQuery]);

  // delete old booking
  useEffect(() => {
    for (let i = 0; i < 1; i++) {
      axios
        .delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}delete-old-bookings`
        )
        .then((res) => console.log(res.data.message))
        .catch((err) => console.error("Failed to delete old bookings:", err));
    }
  },[])

  return (
    <>
      <ContainerBig title={'Booking'}>
          <TextBox
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookings by name or email"
            className="mb-5 p-3 rounded-lg shadow-md w-full bg-black text-white"
          />
          {bookings.length === 0 ? (
            <p className="text-xl font-semibold text-gray-700">
              No bookings found.
            </p>
          ) : (
            <>
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-6 my-4 bg-gray-50 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <Paragraph className="font-semibold text-blue-500">
                        Name: {booking.name}
                      </Paragraph>
                      <Paragraph>
                        <b>Email: </b>
                        {booking.email}
                      </Paragraph>
                      <Paragraph>
                        <b>City: </b>
                        {booking.city}
                      </Paragraph>
                      <Paragraph>
                        <b>Phone: </b>
                        {booking.phone}
                      </Paragraph>
                    </div>
                    <div>
                      <Paragraph>
                        <b>Persons: </b>
                        {booking.person}
                      </Paragraph>
                      <Paragraph>
                        <b>Room Type: </b>
                        {booking.typeroom}
                      </Paragraph>
                      <Paragraph>
                        <b>Check-in: </b>
                        {new Date(booking.checkin).toLocaleDateString()}
                      </Paragraph>
                      <Paragraph>
                        <b>Check-out: </b>
                        {new Date(booking.checkout).toLocaleDateString()}
                      </Paragraph>
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
            </>
          )}
      </ContainerBig>
    </>
  );
}

export default Abooking;
