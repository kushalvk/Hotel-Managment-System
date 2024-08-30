import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
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
    <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md my-28">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Forget Password
        </h2>
        {Error && <p className="text-red-600 text-center mt-8">{Error}</p>}
        <form
          onSubmit={handleSubmit}
        >

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          {showPassword && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Passwoed</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your New Password"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Passwoed</label>
                <input
                  type="password"
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Enter your New Password"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
