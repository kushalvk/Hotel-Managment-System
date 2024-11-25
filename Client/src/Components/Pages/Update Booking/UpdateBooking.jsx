/* eslint-disable no-unused-vars */
import axios from "axios";
import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import SelectCity from "../../Atom/SelectCity.jsx";
import Label from "../../Atom/Label.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import Button from "../../Atom/Button.jsx";
import ContainerBig from "../../Templates/ContainerBig.jsx";

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
                }/upbookings/${updateid}`
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
        <ContainerBig title={'Booking'}>
            <Form onSubmit={handleSubmite}>
                <InputWithLabel Name={'Name'} value={name} disabled/>
                <InputWithLabel Name={'Phone'} value={phone} pattern="^\d{10}$" max={10}
                                onChange={(e) => setPhone(e.target.value)}/>
                <InputWithLabel Name={'Email'} value={email} type={'email'} onChange={(e) => setEmail(e.target.value)}/>
                <InputWithLabel Name={'Person'}
                                type={'number'}
                                value={person}
                                min={1}
                                disabled={
                                    typeroom === "Hall-1 (300 capacity)" ||
                                    typeroom === "Hall-2 (700 capacity)"
                                }
                                onChange={(e) => setPerson(e.target.value)}/>
                <SelectCity city={city} setCity={setCity} label={'City'}/>
                <InputWithLabel Name={'Check In Date'} type={'date'} value={checkin} min={today}
                                onChange={(e) => setCheckin(e.target.value)}/>
                <InputWithLabel Name={'Check Out Date'} type={'date'} value={checkout} min={checkin || today}
                                onChange={(e) => setCheckout(e.target.value)}/>
                <div className="mb-4">
                    <Label Name={'Room Type'}/>
                    <select
                        value={typeroom || "Select a room type"}
                        name="roomType"
                        onChange={(e) => setTyperoom(e.target.value)}
                        className="bg-black text-white w-full px-4 py-2 border rounded"
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
                        <Paragraph className="text-black">
                            Please read once{" "}
                            {<a href="termscondition">Terms & Condition</a>} and{" "}
                            {<a href="privacyPolicy">Privacy Policy</a>} befor Booking.
                        </Paragraph>
                    </div>
                ) : null}
                <Button
                    type="submit"
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Book Now
                </Button>
            </Form>
        </ContainerBig>
    );
}

export default UpdateBooking;
