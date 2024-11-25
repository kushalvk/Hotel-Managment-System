import ContainerSmall from "../../Templates/ContainerSmall.jsx";
import Heading from "../../Atom/Heading.jsx";
import ToggleButton from "../../Atom/ToggleButton.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../Atom/Button.jsx";
import {useState} from "react";
import axios from "axios";

function SignUp() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Error, setError] = useState("");
    const navigate = useNavigate();
    const [adminCode, setAdminCode] = useState("");
    // redio button
    const [role, setRole] = useState("user");

    const handleSubmite = (e) => {
        e.preventDefault();
        if (role === "admin") {
            if (adminCode === "VKHOTELMS") {
                handleSubmiteDone();
            } else {
                setError("Invalid Admin Code");
            }
        } else {
            handleSubmiteDone();
        }
    };

    const handleSubmiteDone = () => {
        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}signup`, {
                username,
                email,
                password,
                role,
            })
            .then((result) => {
                console.log(result);
                if (result.status === 201) {
                    navigate("/login");
                } else {
                    setError(result.data.error || "Unknown error occurred");
                }
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.error || "Signup failed");
                } else if (err.request) {
                    setError("No response from the server. Please try again later.");
                } else {
                    setError("Error: " + err.message);
                }
            });
    };

    return (
        <>
            <ContainerSmall>
                <Heading>Sign Up</Heading>
                <form onSubmit={handleSubmite}>
                    {Error && <p className="text-red-600 text-center mt-8">{Error}</p>}
                    <ToggleButton
                        role={role}
                        setRole={setRole}
                        adminCode={adminCode}
                        setAdminCode={setAdminCode}
                    />
                    <InputWithLabel Name={"Username"} onChange={(e) => setUsername(e.target.value)}/>
                    <InputWithLabel Name={"Email"} type={"email"} onChange={(e) => setEmail(e.target.value)}/>
                    <InputWithLabel Name={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    <Paragraph>I already have a account? <Link to={"/login"}>Login</Link></Paragraph>
                    <Button type={"submit"}>  Sign Up </Button>
                </form>
            </ContainerSmall>
        </>
    )
}

export default SignUp