import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LogoutBtn from "../../Molecules/Header/LogoutProfileBtn.jsx";
import HeaderBtn from "../../Atom/Header/HeaderBtn.jsx";
import HeaderManu from "../../Molecules/Header/HeaderManu.jsx";
import Logo from "../../Atom/Logo.jsx";
import {LoggedUser} from "../../../Services/AuthService.js";

function HeaderPage() {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // navigate
    function loginbtn() {
        navigate("/login");
    }

    function signupbtn() {
        navigate("/signup");
    }

    // usedata -> for auth user
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

    return (
        <header className="text-gray-600 bg-transparent shadow-2xl">
            <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                <Logo />
                <HeaderManu />

                {!userData ? (
                    <>
                        <HeaderBtn onClick={loginbtn}>Login</HeaderBtn>
                        <HeaderBtn onClick={signupbtn}>Sign up</HeaderBtn>
                    </>
                ) : (<>
                        <p className="text-white m-2">
                            Hello, {userData.username.toUpperCase()}
                        </p>
                        <LogoutBtn/>
                    </>
                )}
            </div>
        </header>
    );
}

export default HeaderPage;
