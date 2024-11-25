import FooterLogo from "../../Molecules/Footer/FooterLogo.jsx";
import FooterManus from "../../Molecules/Footer/FooterManus.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import FooterSocialLinks from "../../Molecules/Footer/FooterSocialLinks.jsx";

function FooterPage() {

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
                console.log(res.data.user);
            })
            .catch((err) => console.log(err));
    }, []);

    const sections = [
        {
            title: "AUTHENTICATION",
            links: userData
                ? [
                    { label: "Home", href: "/" },
                    { label: "Booking", href: "booking" },
                    { label: "My Profile", href: "myprofile" },
                    ...(userData.role === "user"
                        ? [{ label: "My Booking", href: "mybooking" }]
                        : [{ label: "All Users", href: "allusers" }]),
                ]
                : [
                    { label: "Log in", href: "login" },
                    { label: "Sign up", href: "signup" },
                ],
        },
        {
            title: "HOTEL",
            links: [
                { label: "About us", href: "aboutus" },
                { label: "Contact us", href: "contactas" },
                ...(userData
                    ? [
                        { label: "Careers", href: "careers" },
                        { label: "FAQ", href: "faq" },
                    ]
                    : []),
            ],
        },
        {
            title: "YOUR SATISFACTION",
            links: [
                { label: "Facilities", href: "facilities" },
                ...(userData
                    ? [
                        { label: "Blog / News", href: "blognews" },
                        { label: "Rating", href: "rating" },
                        { label: "Reviews", href: "reviews" },
                    ]
                    : []),
            ],
        },
        {
            title: "BEAUTY",
            links: [
                ...(userData
                    ? [
                        { label: "Gallery", href: "gallery" },
                        { label: "Policies", href: "policies" },
                        { label: "Privacy & Policy", href: "privacyPolicy" },
                    ]
                    : []),
                { label: "Terms & Condition", href: "termscondition" },
            ],
        },
    ];

    return (
        <>
            <footer className="text-gray-600 body-font text-center justify-center">
                <div
                    className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <FooterLogo/>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        {sections.map((section, index) => (
                            <FooterManus key={index} title={section.title} links={section.links}/>
                        ))}
                    </div>
                </div>
                <FooterSocialLinks/>
            </footer>
        </>
    )
}

export default FooterPage;