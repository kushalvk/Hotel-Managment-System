import axios from "axios";
import { useEffect, useState } from "react";

function Footer() {
  // usedata -> for auth user
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
        // console.log(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <h1 className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            VK
          </h1>
          <a
            href="https://github.com/kushalvk"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <span className="ml-3 text-xl">Vaghela Kushal</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Experience unparalleled luxury and comfort at our hotel, where
            exceptional service meets exquisite accommodations.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              AUTHENTICATION
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="/" className="text-gray-600 hover:text-white">
                  Home
                </a>
              </li>

              {userData ? (
                <>
                  <li>
                    <a
                      href="booking"
                      className="text-gray-600 hover:text-white"
                    >
                      Booking
                    </a>
                  </li>
                  <li>
                    <a
                      href="myprofile"
                      className="text-gray-600 hover:text-white"
                    >
                      My Profile
                    </a>
                  </li>
                  {userData.role === "user" ? (
                    <li>
                      <a
                        href="mybooking"
                        className="text-gray-600 hover:text-white"
                      >
                        My Booking
                      </a>
                    </li>
                  ) : null}
                </>
              ) : (
                <>
                  <li>
                    <a href="login" className="text-gray-600 hover:text-white">
                      Log in
                    </a>
                  </li>
                  <li>
                    <a href="signup" className="text-gray-600 hover:text-white">
                      Sign up
                    </a>
                  </li>
                </>
              )}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              HOTEL
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="aboutus" className="text-gray-600 hover:text-white">
                  About as
                </a>
              </li>
              <li>
                <a href="contactas" className="text-gray-600 hover:text-white">
                  Contact as
                </a>
              </li>
              {userData ? (
                <>
                  <li>
                    <a
                      href="careers"
                      className="text-gray-600 hover:text-white"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="faq" className="text-gray-600 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </>
              ) : null}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              YOUR SATISFACTION
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="facilities" className="text-gray-600 hover:text-white">
                  Facility
                </a>
              </li>

              {userData ? (
                <>
                  <li>
                    <a
                      href="blognews"
                      className="text-gray-600 hover:text-white"
                    >
                      Blog / News
                    </a>
                  </li>
                  <li>
                    <a href="rating" className="text-gray-600 hover:text-white">
                      Rating
                    </a>
                  </li>
                  <li>
                    <a
                      href="reviews"
                      className="text-gray-600 hover:text-white"
                    >
                      Reviews
                    </a>
                  </li>
                </>
              ) : null}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              BEAUTY
            </h2>
            <nav className="list-none mb-10">
              {userData ? (
                <>
                  <li>
                    <a
                      href="gallery"
                      className="text-gray-600 hover:text-white"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="policies"
                      className="text-gray-600 hover:text-white"
                    >
                      Policies
                    </a>
                  </li>
                  <li>
                    <a
                      href="privacyPolicy"
                      className="text-gray-600 hover:text-white"
                    >
                      Privacy & Policy
                    </a>
                  </li>
                </>
              ) : null}

              <li>
                <a
                  href="termscondition"
                  className="text-gray-600 hover:text-white"
                >
                  Term & Condition
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 from Kushal Vaghela —
            <a
              href="https://www.linkedin.com/in/kushal-vaghela-247b942a1/"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @Kushal Vaghela
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/Vaghela.Kushal.Star"
              className="text-gray-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/_.vk._star/"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kushal-vaghela-247b942a1/"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
