/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null);
  // const [token, setToken] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // for auth user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
        // setToken(res.data.token);
      })
      .catch((err) => console.log(err));
  }, []);

  // get city

  const handleSearch = () => {
    if (!userData) {
      navigate("/login");
    } else {
      localStorage.setItem("City", city)
      console.log("Searching for hotels in:", city);
      navigate("/typeroom")
    }
  };

  // load all city
  const [citys, setCitys] = useState([]);

  useEffect(() => {
    const config = {
      cUrl: 'https://api.countrystatecity.in/v1/countries/IN/states/GJ/cities',
      ckey: 'QWFqZnRBUGVpVVpFOGZhcHhCRko4cFdRdFFRakhVWkpmb0MwcjhGag==' // this key sent in email
    };

    async function loadCities() {
      try {
        const response = await fetch(config.cUrl, {
          headers: {
            "X-CSCAPI-KEY": config.ckey
          }
        });
        const data = await response.json();
        setCitys(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    loadCities();
  }, []);

  // chnaging background image
  const [bgImage, setBgImage] = useState("");

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345742266.jpg?k=fb33c11240d6cebb94cb34bd6c68196f859be21e4e3cd306b80006a5bf389dfc&o=&hp=1",
    "https://www.kayak.co.in/news/wp-content/uploads/sites/76/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setBgImage(images[index]);
      index = (index + 1) % images.length; // Cycle through images
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images]);

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bgImage})`,
        }}
      >
        <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Welcome to Our Hotel,{" "}
            {userData ? (
              <h5>
                {userData.role.toUpperCase()} {userData.username}
              </h5>
            ) : null}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Experience luxury and comfort with us.
          </p>

          <select
            className="allcity mb-4 px-4 py-2 border rounded w-full text-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="" disabled>
              Select a city
            </option>
            {citys.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
