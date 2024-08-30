import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutProfileBtn";

function Header() {
  // navigate
  const navigate = useNavigate();
  function loginbtn() {
    navigate("/login");
  }
  function signupbtn() {
    navigate("/signup");
  }

  // usedata -> for auth user
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, {
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
    <header className="text-gray-600 bg-transparent shadow-2xl">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <h1 className="ml-3 flex title-font font-medium items-center text-white mb-4 md:mb-0">
          VK
        </h1>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center my-2">
          <a href="/" className="mr-5 text-white hover:text-gray-400">
            Home
          </a>
          <a href="/facilities" className="mr-5 text-white hover:text-gray-400">
            Facilities
          </a>
          <a href="contactas" className="mr-5 text-white hover:text-gray-400">
            Contact as
          </a>
          {userData ? (
            <>
              <a
                href="/booking"
                className="mr-5 text-white hover:text-gray-400"
              >
                Booking
              </a>
              <a
                href="blognews"
                className="mr-5 text-white hover:text-gray-400"
              >
                Blog / News
              </a>
              <a
                href="termscondition"
                className="mr-5 text-white hover:text-gray-400"
              >
                Terms & Condition
              </a>
              {userData.role === "admin" ? null : (
                <a
                  href="mybooking"
                  className="mr-5 text-white hover:text-gray-400"
                >
                  My Booking
                </a>
              )}
            </>
          ) : (
            <a href="aboutus" className="mr-5 text-white hover:text-gray-400">
              About as
            </a>
          )}
        </nav>

        {userData ? (
          <p className="text-white m-2">
            Hello, {userData.username.toUpperCase()}
          </p>
        ) : null}

        {!userData ? (
          <>
            <button
              onClick={loginbtn}
              className="bg-neutral-950 m-2 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Login
            </button>
            <button
              onClick={signupbtn}
              className="bg-neutral-950 m-2 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Sign up
            </button>
          </>
        ) : (
          <LogoutBtn />
        )}
      </div>
    </header>
  );
}

export default Header;
