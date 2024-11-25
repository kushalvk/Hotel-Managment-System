/* eslint-disable no-unused-vars */
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import Button from "../../Atom/Button.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import TextareaWithLabel from "../../Molecules/TextareaWithLabel.jsx";
import FormWhite from "../../Atom/FormWhite.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";

function Review() {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    // Add review
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addreview`, {
                name,
                review,
            })
            .then((added) => location.reload())
            .catch((err) => console.log(err));
    };

    // Get all reviews
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}reviews`)
            .then((getdata) => setReviews(getdata.data))
            .catch((err) => console.log(err));
    }, []);

    //   get user
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

    // booking delete
    const deleteReview = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}review/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();
            console.log(result);
            setReviews((prevBookings) =>
                prevBookings.filter((review) => review._id !== id)
            );
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    return (
        <>
                <ContainerBig title={"Customer Reviews"}>
                    {reviews.length > 0 ?
                        reviews.map((review, index) => (
                            <DynamicContainer key={index} Datas={review} heading={review.name} contant={review.review}>
                                {userData === "admin" ? (
                                    <Button
                                        align={'start'}
                                        className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded mt-3"
                                        onClick={() => deleteReview(review._id)}
                                    >
                                        Delete
                                    </Button>
                                ) : null}
                            </DynamicContainer>
                        ))
                        : <Paragraph>No reviews available</Paragraph>}

                    {userData === "user" ? (
                        <FormWhite onsubmit={handleSubmit} title={"Add Review"}>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <InputWithLabel Name={"Name"}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <TextareaWithLabel name={"Review"} onChange={(e) => setReview(e.target.value)}/>
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

export default Review;
