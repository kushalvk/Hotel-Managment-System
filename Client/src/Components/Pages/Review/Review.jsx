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
import {LoggedUser, signup} from "../../../Services/AuthService.js";
import {AddReview, DeleteReview, ShowAllReview} from "../../../Services/ReviewService.js";

function Review() {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate()

    // Get all reviews logged user
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        } else {
            const allReviewAndLogged = async () => {
                try {
                    setReviews(await ShowAllReview());
                    setUserData(await LoggedUser());
                } catch (e) {
                    console.log(e.message);
                }
            }
            allReviewAndLogged();
        }
    }, [navigate]);

    // Add review
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AddReview(name, review)
            location.reload()
        } catch (e) {
            console.log(e.message);
        }
    };

    // booking delete
    const deleteReview = async (id) => {
        try {
            await DeleteReview(id)
            location.reload()
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <ContainerBig title={"Customer Reviews"}>
                {reviews.length > 0 ?
                    reviews.map((review, index) => (
                        <DynamicContainer key={index} Datas={review} heading={review.name} contant={review.review}>
                            {userData ?
                                <>
                                    {userData.role === "admin" ? (
                                        <Button
                                            align={'start'}
                                            className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded mt-3"
                                            onClick={() => deleteReview(review._id)}
                                        >
                                            Delete
                                        </Button>
                                    ) : null}
                                </>
                                : null}
                        </DynamicContainer>
                    ))
                    : <Paragraph>No reviews available</Paragraph>}

                {userData ?
                    <>
                        {userData.role === "user" ? (
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
                    </>
                    : null}

            </ContainerBig>
        </>
    );
}

export default Review;
