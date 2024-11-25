/* eslint-disable no-unused-vars */
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import TextareaWithLabel from "../../Molecules/TextareaWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import FormWhite from "../../Atom/FormWhite.jsx";

function BlogNews() {
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [summary, setSummary] = useState();
    const [articles, setArticles] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    //   add article
    const handlesubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}addarticle`, {
                title,
                date,
                summary,
            })
            .then((added) => location.reload())
            .catch((err) => console.log(err));
    };

    //   get all articles
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}articles`)
            .then((getdata) => setArticles(getdata.data))
            .catch((err) => console.log(err));
    }, []);

    //   get user
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
            <ContainerBig title={"Blog & News"}>
                {articles.map((article, index) => (
                    <DynamicContainer key={index} Datas={article} heading={article.title} date={article.date}
                                      contant={article.summary}/>
                ))}
                {userData === "admin" ? (
                    <FormWhite onsubmit={handlesubmit} title={"Add Blog & News"}>
                        <InputWithLabel Name={'Title'}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={(e) => setTitle(e.target.value)}/>
                        <div className="ml-4 w-1/2">
                            <InputWithLabel Name={'Date'}
                                            type={'date'}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        <TextareaWithLabel name={'Summary'} onChange={(e) => setSummary(e.target.value)}/>
                        <div className="p-2 w-full">
                            <Button type={'submit'}>Add</Button>
                        </div>
                    </FormWhite>
                ) : null}
            </ContainerBig>
        </>
    );
}

export default BlogNews;
