import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [Error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmite = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}login`, { username, password })
      .then((result) => {
        console.log(result);
        if (result.data.user.username === username) {
          const { token, user } = result.data;
          // Store the token in local storage
          localStorage.setItem("token", token);
          console.log("Logged in user:", user);
          navigate("/");
          location.reload()
        } else {
          setError(result.data)
        }
      })
      .catch(err => setError(err.message))
  };

  return (
    <div className="All-background-img h-screen flex items-center justify-center w-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>
        {Error && <p className='text-red-600 text-center mt-8'>{Error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmite}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p className="text-black">I do not have a account? <Link to={'/signup'}>Sign up</Link> </p>
            <p className="text-black"><Link to={'/forgetpwd'}>Forgot password?</Link> </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
