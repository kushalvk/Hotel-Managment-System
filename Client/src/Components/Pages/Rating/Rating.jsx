/* eslint-disable no-unused-vars */
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import FormWhite from "../../Atom/FormWhite.jsx";

function Rating() {
    const [name, setName] = useState("");
    const [star, setstar] = useState(0);
    const [userData, setUserData] = useState(null);
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    // Add rating
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addrating`, {
                name,
                star,
            })
            .then((added) => location.reload())
            .catch((err) => console.log(err));
    };

    // Get all ratings
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}ratings`)
            .then((getdata) => setRatings(getdata.data))
            .catch((err) => console.log(err));
    }, []);

    // Get user
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((user) => setUserData(user.data.user.role))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <ContainerBig title={"Customer Reviews"}>
                {ratings.length > 0 ? (
                    ratings.map((rating, index) => (
                        <DynamicContainer key={index} Datas={rating} heading={rating.name} contant={rating.star}
                                          extra={"/5"}/>
                    ))
                ) : (
                    <Paragraph>No ratings available</Paragraph>
                )}

                {userData === "user" ? (
                    <FormWhite onsubmit={handleSubmit} title={"Give Ratings"}>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <InputWithLabel Name={'Name'}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                onChange={(e) => setName(e.target.value)}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">

                                {/* Rationg stars */}
                                <div className="rating my-4">
                                    <input
                                        type="radio"
                                        id="star5"
                                        name="rate"
                                        value="5"
                                        onClick={(e) => setstar(e.target.value)}
                                    />
                                    <label title="Excellent!" htmlFor="star5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                        </svg>
                                    </label>
                                    <input
                                        value="4"
                                        name="rate"
                                        id="star4"
                                        type="radio"
                                        onClick={(e) => setstar(e.target.value)}
                                    />
                                    <label title="Great!" htmlFor="star4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                        </svg>
                                    </label>
                                    <input
                                        value="3"
                                        name="rate"
                                        id="star3"
                                        type="radio"
                                        onClick={(e) => setstar(e.target.value)}
                                    />
                                    <label title="Good" htmlFor="star3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                        </svg>
                                    </label>
                                    <input
                                        value="2"
                                        name="rate"
                                        id="star2"
                                        type="radio"
                                        onClick={(e) => setstar(e.target.value)}
                                    />
                                    <label title="Okay" htmlFor="star2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                        </svg>
                                    </label>
                                    <input
                                        value="1"
                                        name="rate"
                                        id="star1"
                                        type="radio"
                                        onClick={(e) => setstar(e.target.value)}
                                    />
                                    <label title="Bad" htmlFor="star1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                        </svg>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <Button
                                type="submit"
                            >
                                Add
                            </Button>
                        </div>
                    </FormWhite>
                ) : null}
            </ContainerBig>
        </>
    );
}

export default Rating;
