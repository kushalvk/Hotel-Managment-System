import axios from "axios";
import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";

function MyProfile() {

    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setUsername(res.data.user.username);
                setEmail(res.data.user.email);
                setId(res.data.user._id);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}updateuser/${id}`, {
            username, email,
        })
            .then(() => alert("Profile updated successfully!"), navigate("/"), location.reload())
            .catch((err) => console.log(err))
    };

    return (<>
        <ContainerBig title={"My Profile"}>
            <Form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                    <div className="flex justify-center mb-4">
                        <img
                            src={"https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"}
                            alt="Profile"
                            className="rounded-full w-24 h-24 object-cover"
                        />
                    </div>
                </div>
                <InputWithLabel Name={'Name'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <InputWithLabel Name={'Email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Button
                    type="submit"
                >
                    Update Profile
                </Button>
            </Form>
        </ContainerBig>
    </>);
}

export default MyProfile;
