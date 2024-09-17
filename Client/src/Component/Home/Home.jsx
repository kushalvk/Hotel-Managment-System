/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import axios from "axios";
import DefaultHome from "./DefaultHome";

function Home() {
  const [userData, setUserData] = useState(null);

  // for auth user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => console.log(err));
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
          {userData ? (
            <>
              {userData.role === "admin" ? (
                <>
                  <h1 className="text-4xl font-bold mb-6 text-gray-900">
                    Welcome back to Hotel,{" "}
                    <h5>
                      {userData.role.toUpperCase()} {userData.username}
                    </h5>
                  </h1>
                  <p className="text-lg text-gray-700 mb-6">
                    Your place for easy hotel management. Manage tasks, check
                    bookings, and provide a great guest experience effortlessly!
                  </p>
                </>
              ) : (
                <DefaultHome />
              )}
            </>
          ) : (
            <DefaultHome />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
