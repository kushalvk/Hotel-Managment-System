import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../Atom/Button.jsx";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";

function MyBooking() {

    const navigation = useNavigate();
    const [userData, setUserData] = useState(String);
    const [bookings, setBookings] = useState();

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigation("/") : null
    })

    // get user for verify admin or user
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

    // Fetch bookings by name
    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
                }/mybookings/${userData}`
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
            <ContainerBig title={'My Bookings'}>
                {!bookings ? (
                    <Paragraph className="text-xl font-semibold text-gray-700">
                        No bookings found.
                    </Paragraph>
                ) : (
                    bookings.map((booking) => (
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
                                </div>
                            </div>
                            {/* HeaderBtn ContainerSmall with Flexbox */}
                            <div className="flex justify-center space-x-4 mt-4">
                                <Button
                                    className="text-white bg-red-600 hover:bg-red-700 rounded"
                                    onClick={() => deleteBooking(booking._id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="text-white bg-green-600 hover:bg-green-700 rounded"
                                    onClick={() => handleUpdate(booking._id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    className="text-white bg-blue-600 hover:bg-blue-700 rounded"
                                    onClick={() => handleinvoic(booking._id)}
                                >
                                    Invoice
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </ContainerBig>
        </>
    );
}

export default MyBooking;
