/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function BlogNews() {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [summary, setSummary] = useState();

  const [articles, setArticles] = useState([]);
  const [userData, setUserData] = useState(null);

  //   add article
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/addarticle`, {
        title,
        date,
        summary,
      })
      .then((added) => location.reload())
      .catch((err) => console.log(err));
  };

  //   get all articles
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/articles`)
      .then((getdata) => setArticles(getdata.data))
      .catch((err) => console.log(err));
  }, []);

  //   get user
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
          Blog & News
        </h1>
        <div className="text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {articles.map((article, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(article.date).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-800">{article.summary}</p>
              </div>
            ))}
            {userData === "admin" ? (
              <form onSubmit={handlesubmit}>
                <section className="text-gray-600 body-font relative mx-30">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Add Blog & News
                      </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label
                              htmlFor="title"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              placeholder="Add Title"
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label
                              htmlFor="date"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="summary"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Summary
                            </label>
                            <textarea
                              id="summary"
                              name="summary"
                              placeholder="Add Summary"
                              onChange={(e) => setSummary(e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
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
export default BlogNews;
