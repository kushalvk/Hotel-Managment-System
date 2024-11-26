/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import DefaultHome from "./DefaultHome.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import Heading from "../../Atom/Heading.jsx";
import {LoggedUser} from "../../../Services/AuthService.js";

function AdminHome() {
  const [userData, setUserData] = useState(null);
  const [bgImage, setBgImage] = useState("");

  // for auth user
  useEffect(() => {
    const Logged = async () => {
      try {
        setUserData(await LoggedUser());
      } catch (e) {
        console.log(e.message);
      }
    }
    Logged();
  }, []);

  // chnaging background image
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
                  <Heading className="text-4xl font-bold mb-6 text-gray-900">
                    Welcome back to Hotel,{" "}
                      {userData.role.toUpperCase()} {userData.username}
                  </Heading>
                  <Paragraph>
                    Your place for easy hotel management. Manage tasks, check
                    bookings, and provide a great guest experience effortlessly!
                  </Paragraph>
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

export default AdminHome;
