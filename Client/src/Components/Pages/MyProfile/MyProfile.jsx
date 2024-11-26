import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import { LoggedUser } from "../../../Services/AuthService.js";
import { UpdateProfile } from "../../../Services/MyProfileService.js";

function MyProfile() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        } else {
            const fetchUserData = async () => {
                try {
                    const user = await LoggedUser();
                    setId(user._id);
                    setUsername(user.username);
                    setEmail(user.email);
                } catch (e) {
                    console.log(e.message);
                }
            };
            fetchUserData();
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UpdateProfile(id, username, email);
            location.reload();
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
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
                <InputWithLabel
                    Name={"Name"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputWithLabel
                    Name={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit">Update Profile</Button>
            </Form>
        </ContainerBig>
    );
}

export default MyProfile;
