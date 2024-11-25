import HeaderFooterManu from "../../Atom/HeaderFooterManu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function HeaderManu() {

    const [userData, setUserData] = useState(null);

    // usedata -> for auth user
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
        <>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center my-2">
                <HeaderFooterManu href="/">Home</HeaderFooterManu>
                <HeaderFooterManu href="facilities">Facilities</HeaderFooterManu>
                <HeaderFooterManu href="contactas">Contact Us</HeaderFooterManu>
                {userData ? <>
                    <HeaderFooterManu href="booking">Booking</HeaderFooterManu>
                    <HeaderFooterManu href="blognews">Blogs / News</HeaderFooterManu>
                    <HeaderFooterManu href="manu">Manu</HeaderFooterManu>
                    {userData.role === "admin" ?
                        <HeaderFooterManu href="allusers">All Users</HeaderFooterManu>
                        : <HeaderFooterManu href="mybooking">My Booking</HeaderFooterManu>}
                </> : <HeaderFooterManu href="aboutus">About Us</HeaderFooterManu> }
            </nav>
        </>
    )
}

export default HeaderManu