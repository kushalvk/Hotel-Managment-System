import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DefaultHome() {
  const [city, setCity] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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

  const [citys, setCitys] = useState([]);

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

  const handleSearch = () => {
    if (!userData) {
      navigate("/login");
    } else {
      localStorage.setItem("City", city);
      console.log("Searching for hotels in:", city);
      navigate("/typeroom");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Welcome to Our Hotel,{" "}
        {userData ? (
          <>
            {userData.role.toUpperCase()} {userData.username}
          </>
        ) : null}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Experience luxury and comfort with us.
      </p>

      <select
        className="allcity mb-4 px-4 py-2 border rounded w-full text-black"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="" disabled className="text-white bg-black" >
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
    </>
  );
}

export default DefaultHome;