import ContainerSmall from "../../Templates/ContainerSmall.jsx";
import Heading from "../../Atom/Heading.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../Atom/Button.jsx";

function ForgatePwd() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState("");
    const navigation = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === cPassword) {
            axios
                .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}forget`, {
                    email,
                    password,
                })
                .then(
                    () => alert("Your Password Has Been Changed"),
                    navigation("/login")
                )
                .catch((err) => setError(err));
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