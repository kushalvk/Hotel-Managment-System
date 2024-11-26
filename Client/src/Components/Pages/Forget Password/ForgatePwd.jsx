import ContainerSmall from "../../Templates/ContainerSmall.jsx";
import Heading from "../../Atom/Heading.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../Atom/Button.jsx";
import {ShowAllReview} from "../../../Services/ReviewService.js";
import {ForgetPassword, LoggedUser} from "../../../Services/AuthService.js";

function ForgatePwd() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === cPassword) {
            try {
                await ForgetPassword(email, password);
                alert('Password Updated successfully.');
                navigate("/login");
            } catch (e) {
                console.log(e.message);
            }
        } else {
            setError("Password dose not match");
        }
    };

    return (
        <>
            <ContainerSmall>
                <Heading>Forgate Password</Heading>
                <form onSubmit={handleSubmit}>
                    {Error && <p className="text-red-600 text-center mt-8">{Error}</p>}
                    <InputWithLabel Name={"Email"} type={"email"} onChange={handleEmailChange} />
                    {showPassword && (
                        <>
                            <InputWithLabel Name={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} />
                            <InputWithLabel Name={"Confarm Password"} type={"password"} onChange={(e) => setCPassword(e.target.value)} />
                        </>
                    )}
                    <Button type={"submit"} className={"w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"}> Forgate Password </Button>
                </form>
            </ContainerSmall>
        </>
    )
}

export default ForgatePwd