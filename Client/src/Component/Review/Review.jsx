/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function Review() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const [userData, setUserData] = useState(null);

  const [reviews, setReviews] = useState([]);

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
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white m-9">
          Customer Reviews
        </h1>
        <div className="text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                    {review.name}
                  </h2>
                  <p className="text-lg text-gray-800">{review.review}</p>
                  {userData === "admin" ? (
                    <button
                      className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded mt-3"
                      onClick={() => deleteReview(review._id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}

            {userData === "user" ? (
              <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative mx-30">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Add Review
                      </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="name"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter Your Name Please"
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="review"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Review
                            </label>
                            <textarea
                              id="review"
                              name="review"
                              placeholder="Write Your Experience Here"
                              onChange={(e) => setReview(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <button
                            type="submit"
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
