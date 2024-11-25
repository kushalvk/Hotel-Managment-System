import InputWithLabel from "../Molecules/InputWithLabel.jsx";
import Paragraph from "../Atom/Paragraph.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../Atom/Button.jsx";
import axios from "axios";
import {useState} from "react";
import Heading from "../Atom/Heading.jsx";
import ContainerSmall from "../Templates/ContainerSmall.jsx";

function LoginPage() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmite = (e) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}login`, {
                username,
                password,
            })
            .then((result) => {
                if (result.status === 200) {
                    const {token, user} = result.data;
                    localStorage.setItem("token", token);
                    console.log("Logged in user:", user);
                    navigate("/");
                    location.reload();
                } else {
                    // Handle other status codes that are not 200
                    setError(result.data.error || "Unknown error occurred");
                }
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.error || "Login failed");
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
                <Heading>Login</Heading>
                <form onSubmit={handleSubmite}>
                    {Error && <p className="text-red-600 text-center mt-8">{Error}</p>}
                    <InputWithLabel Name={"Username"} onChange={(e) => setUsername(e.target.value)}/>
                    <InputWithLabel Name={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    <Paragraph>I do not have a account? <Link to={"/signup"}>Sign up</Link></Paragraph>
                    <Paragraph className={"mb-1"}><Link to={"/forgetpwd"}>Forgot password?</Link></Paragraph>
                    <Button type={"submit"}> Login </Button>
                </form>
            </ContainerSmall>
        </>
    )
}

export default LoginPage;