import {useEffect, useState} from "react";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import TextBox from "../../Atom/TextBox.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import {
    AutoDeleteBooking,
    DeleteBooking,
    FetchAllBooking,
    SearchBooking
} from "../../../Services/BookingService.js";

function Abooking() {
    const [bookings, setBookings] = useState([]);

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
            const MyBookingAndLogged = async () => {
                try {
                    setBookings(await SearchBooking(debouncedSearchQuery));
                } catch (e) {
                    console.log(e.message);
                }
            }
            MyBookingAndLogged();
        } else {
            // Fetch all bookings when search query is empty
            const allBookig = async () => {
                try {
                    setBookings(await FetchAllBooking());
                } catch (e) {
                    console.log(e.message);
                }
            }
            allBookig();
        }

        // delete old booking
        for (let i = 0; i < 1; i++) {
            const autoDelete = async () => {
                try {
                    await AutoDeleteBooking();
                } catch (e) {
                    console.log(e.message);
                }
            }
            autoDelete();
        }
    }, [debouncedSearchQuery]);

    // Fetch all bookings
    useEffect(() => {
        const allBookig = async () => {
            try {
                setBookings(await FetchAllBooking());
            } catch (e) {
                console.log(e.message);
            }
        }
        allBookig();
    }, []);

    // booking delete
    const deleteBooking = async (id) => {
        try {
            await DeleteBooking(id);
            location.reload();
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

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
