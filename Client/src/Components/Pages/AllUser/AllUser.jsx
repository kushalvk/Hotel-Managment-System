import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import Button from "../../Atom/Button.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";

function AllUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

    // Fetch all Users
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}alluser`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Delete Particular User
    const deleteUser = (id) => {
        try {
            axios
                .delete(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}deleteuser/${id}`
                )
                .then(
                    () => {
                        alert("User Deleted");
                        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                    },
                    () => alert("Error deleting user")
                )
                .catch(() => alert("Error to delete User with Request"));
        } catch (error) {
            alert("Error to delete User");
        }
    };

    return (
        <>
            <ContainerBig title={"Users"}>
                <div className="grid grid-cols-1 gap-6">
                    {users.map((user) => (
                        <>
                            {user.role === 'admin' ? null :
                                <div
                                    key={user._id}
                                    className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 grid grid-cols-2 justify-between items-center"
                                >
                                    <div className="text-left">
                                        <Paragraph
                                            className="font-semibold text-blue-500">User: {user.username}</Paragraph>
                                        <Paragraph>Email: {user.email}</Paragraph>
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            }
                        </>
                    ))}
                </div>
            </ContainerBig>
        </>
    );
}

export default AllUser;
  
