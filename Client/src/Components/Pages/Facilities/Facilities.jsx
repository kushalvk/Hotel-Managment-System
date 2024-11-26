import {useEffect, useState} from "react";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import PhotoTitleContant from "../../Organisms/PhotoTitleContant.jsx";
import InputWithLabel from "../../Molecules/InputWithLabel.jsx";
import TextareaWithLabel from "../../Molecules/TextareaWithLabel.jsx";
import Button from "../../Atom/Button.jsx";
import FormWhite from "../../Atom/FormWhite.jsx";
import {LoggedUser} from "../../../Services/AuthService.js";
import {Addfacility, ShowAllFacility} from "../../../Services/Facility.js";

function Facilities() {
    const [title, setTitle] = useState();
    const [imageUrl, setimageUrl] = useState();
    const [description, setDescription] = useState();
    const [facilities, setFacilities] = useState([]);
    const [userData, setUserData] = useState(null);

    //   fetch All facilities
    useEffect(() => {
        const allReviewAndLogged = async () => {
            try {
                setFacilities(await ShowAllFacility());
                setUserData(await LoggedUser());
            } catch (e) {
                console.log(e.message);
            }
        }
        allReviewAndLogged();
    }, []);

    //   add faciliti
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            await Addfacility(title, imageUrl, description);
            location.reload()
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <ContainerBig title={"Facilities"}>
                {facilities.map((facility) => (
                    <PhotoTitleContant key={facility.id} title={facility.title} imgURL={facility.imageUrl}
                                       content={facility.description}/>
                ))}
                {userData ? <>
                    {userData.role === "admin" ? (
                        <FormWhite onsubmit={handlesubmit} title={"Add Facility"}>
                            <InputWithLabel Name={'Title'}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setTitle(e.target.value)}/>
                            <div className="ml-4 w-1/2">
                                <InputWithLabel Name={'Image Url'}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                onChange={(e) => setimageUrl(e.target.value)}/>
                            </div>
                            <TextareaWithLabel name={'Description'} onChange={(e) => setDescription(e.target.value)}/>
                            <div className="p-2 w-full">
                                <Button type={'submit'}>Add</Button>
                            </div>
                        </FormWhite>
                    ) : null}
                </> : null}
            </ContainerBig>
        </>
    );
}

export default Facilities;
