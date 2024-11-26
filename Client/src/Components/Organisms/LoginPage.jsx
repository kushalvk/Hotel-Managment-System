import InputWithLabel from "../Molecules/InputWithLabel.jsx";
import Paragraph from "../Atom/Paragraph.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../Atom/Button.jsx";
import {useState} from "react";
import Heading from "../Atom/Heading.jsx";
import ContainerSmall from "../Templates/ContainerSmall.jsx";
import { login } from "../../Services/AuthService.js";

function LoginPage() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmite = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await login(username, password);
            localStorage.setItem("token", token);
            console.log("Logged in user:", user);
            navigate("/");
            location.reload();
        } catch (err) {
            setError(err.message);
        }
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