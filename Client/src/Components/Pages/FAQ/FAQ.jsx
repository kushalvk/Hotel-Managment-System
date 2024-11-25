/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import FormWhite from "../../Atom/FormWhite.jsx";

function FAQ() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [userData, setUserData] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    // Add FAQ
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addfaq`, {
                question,
                answer,
            })
            .then((added) => location.reload())
            .catch((err) => console.log(err));
    };

    // Get all FAQs
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}faqs`)
            .then((getdata) => setFaqs(getdata.data))
            .catch((err) => console.log(err));
    }, []);

    // Get user
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((user) => setUserData(user.data.user.role))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <ContainerBig title={"Frequently Asked Questions"}>
                {faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                        <DynamicContainer key={index} Datas={faq} heading={faq.question}
                                          contant={faq.answer}/>
                    ))
                ) : (
                    <Paragraph>No FAQs available</Paragraph>
                )}

                {userData === "admin" ? (
                        <FormWhite onsubmit={handleSubmit} title={"Add Question"}>
                            <InputWithLabel Name={'Question'}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setQuestion(e.target.value)}/>
                            <div className="ml-4 w-1/2">
                                <InputWithLabel Name={'Answer'}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                onChange={(e) => setAnswer(e.target.value)}/>
                            </div>
                            <div className="p-2 w-full">
                                <Button type={'submit'}>Add</Button>
                            </div>
                        </FormWhite>
                ) : null}
            </ContainerBig>
        </>
    );
}

export default FAQ;
