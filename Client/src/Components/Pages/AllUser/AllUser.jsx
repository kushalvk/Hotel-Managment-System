import {useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ContainerBig from "../../Templates/ContainerBig.jsx";
import Button from "../../Atom/Button.jsx";
import Paragraph from "../../Atom/Paragraph.jsx";
import {AllUsers, DeleteUser} from "../../../Services/AuthService.js";

function AllUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    // Fetch all Users
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        } else {
            const allUsers = async () => {
                try {
                    setUsers(await AllUsers())
                } catch (e) {
                    console.log(e.message);
                }
            }
            allUsers();
        }
    }, [navigate]);

    // Delete Particular User
    const deleteUser = async (id) => {
        try {
            await DeleteUser(id)
            location.reload()
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <ContainerBig title={"Users"}>
                <div className="my-5 p-6 bg-black text-center rounded-lg shadow-md justify-between items-center">
                    <p className="text-white">Currently, <span className="text-blue-500"> {users.length - 1} valued users</span> are
                        enjoying the services of our Hotel.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {users ? <>
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
                    </> : null}
                </div>
            </ContainerBig>
        </>
    );
}

export default AllUser;
  
