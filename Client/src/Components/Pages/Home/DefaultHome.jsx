import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import SelectCity from "../../Atom/SelectCity.jsx";
import Button from "../../Atom/Button.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";

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
            <Paragraph className="text-lg text-gray-700 mb-6">
                Experience luxury and comfort with us.
            </Paragraph>
            <SelectCity city={city} setCity={setCity}/>
            <Button onClick={handleSearch}> Search </Button>
        </>
    );
}

export default DefaultHome;