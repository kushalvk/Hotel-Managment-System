import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProfile() {

  const navigate = useNavigate()

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/") : null
  })

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setId(res.data.user._id);
      })
      .catch((err) => console.log(err));
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}updateuser/${id}`, {
      username,
      email,
    })
      .then(() => alert("Profile updated successfully!"),navigate("/"))
      .catch((err) => console.log(err))
  };

  return (
    <>
      <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl my-24">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            My Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={"https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"}
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Full name"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
