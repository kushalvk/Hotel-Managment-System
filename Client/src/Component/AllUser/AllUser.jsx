import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="All-background-img pb-9 text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start">
                <h1 className="text-4xl font-bold text-center mb-10 text-white mt-10">
                    Users
                </h1>
                <div className="bg-white bg-opacity-75 p-9 rounded-3xl shadow-lg max-w-3xl w-full text-center">
                    <div className="my-5 p-6 bg-black rounded-lg shadow-md justify-between items-center">
                        <p className="text-white">Currently, <span className="text-blue-500"> {users.length - 1} valued users</span> are enjoying the services of our Hotel.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {users.map((user) => (
                            <>
                                {user.role === 'admin' ? null :
                                    <div
                                        key={user._id}
                                        className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 grid grid-cols-2 justify-between items-center"
                                    >
                                        <div className="text-left">
                                            <p className="font-semibold text-blue-500">User: {user.username}</p>
                                            <p>Email: {user.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <button
                                                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllUser;
