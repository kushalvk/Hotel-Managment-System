/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FAQ() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userData, setUserData] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const navigate = useNavigate()

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/") : null
  })

  // Add FAQ
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addfaq`, {
        question,
        answer,
      })
      .then((added) => location.reload())
      .catch((err) => console.log(err));
  };

  // Get all FAQs
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}faqs`)
      .then((getdata) => setFaqs(getdata.data))
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
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white m-9">
          Frequently Asked Questions
        </h1>
        <div className="text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                    {faq.question} ?
                  </h2>
                  <p className="text-lg text-gray-800">{faq.answer}</p>
                </div>
              ))
            ) : (
              <p>No FAQs available</p>
            )}

            {userData === "admin" ? (
              <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative mx-30">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Add Question
                      </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="question"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Question
                            </label>
                            <input
                              type="text"
                              id="question"
                              name="question"
                              placeholder="Question"
                              onChange={(e) => setQuestion(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="answer"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Answer
                            </label>
                            <textarea
                              id="answer"
                              name="answer"
                              placeholder="Answer"
                              onChange={(e) => setAnswer(e.target.value)}
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

export default FAQ;
