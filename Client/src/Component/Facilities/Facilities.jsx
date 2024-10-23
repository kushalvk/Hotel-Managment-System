import axios from "axios";
import { useEffect, useState } from "react";

function Facilities() {
  const [title, setTitle] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [description, setDescription] = useState();
  const [facilities, setFacilities] = useState([]);
  const [userData, setUserData] = useState(null);

  //   fetch All facilities
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}facilities`)
      .then((getdata) => setFacilities(getdata.data))
      .catch((err) => console.log(err));
  }, []);

  //   add faciliti
  const handlesubmit = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addfacility`, {
        title,
        imageUrl,
        description,
      })
      .then((added) => console.log(added))
      .catch((err) => console.log(err))
  };

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

  return (
    <>
      <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
        <div className="gallery-background text-black min-h-screen w-full bg-cover bg-center flex flex-col items-center py-20">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">
            Hotel Facilities
          </h1>
          <div className="max-w-7xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            <div className="flex flex-wrap -m-4">
              {facilities.map((facility) => (
                <section key={facility._id} className="text-gray-600 body-font">
                  <div className="container mx-auto flex px-5 py-14 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                      <img
                        className="object-cover object-center rounded"
                        src={facility.imageUrl}
                        alt={facility.title}
                      />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {facility.title}
                      </h1>
                      <p className="mb-8 leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
              {userData === "admin" ? (
                <form onSubmit={handlesubmit}>
                  <section className="text-gray-600 body-font relative mx-32">
                    <div className="container px-5 py-10 mx-auto">
                      <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                          Add Facility
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
                                htmlFor="imageUrl"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Image Url
                              </label>
                              <input
                                type="imageUrl"
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="Add Image URL"
                                onChange={(e) => setimageUrl(e.target.value)}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="p-2 w-full">
                            <div className="relative">
                              <label
                                htmlFor="description"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Description
                              </label>
                              <textarea
                                id="description"
                                name="description"
                                placeholder="Add Description"
                                onChange={(e) => setDescription(e.target.value)}
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
      </div>
    </>
  );
}

export default Facilities;