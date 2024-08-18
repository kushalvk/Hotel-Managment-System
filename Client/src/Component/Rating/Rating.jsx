/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function Rating() {
  const [name, setName] = useState("");
  const [star, setstar] = useState(0);

  const [userData, setUserData] = useState(null);

  const [ratings, setRatings] = useState([]);

  // Add rating
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/addrating`, {
        name,
        star,
      })
      .then((added) => location.reload())
      .catch((err) => console.log(err));
  };

  // Get all ratings
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/ratings`)
        .then((getdata) => setRatings(getdata.data))
        .catch((err) => console.log(err));
    }, []);

  // Get user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((user) => setUserData(user.data.user.role))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white m-9">
          Customer Ratings
        </h1>
        <div className="text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                    {rating.name}
                  </h2>
                  <p className="text-lg text-gray-800">
                    {`Rating: ${rating.star}/5`}
                  </p>
                </div>
              ))
            ) : (
              <p>No ratings available</p>
            )}

            {userData === "user" ? (
              <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative mx-30">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                        Add Your Rating
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
                              placeholder="Enter Your name Please"
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              required
                            />
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
                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
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
                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
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
                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
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
                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
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
                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                              </label>
                            </div>

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

export default Rating;
