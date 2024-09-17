import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {

  // redio button
  const [role, setRole] = useState("user");
  console.log(role);

  const handleToggle = () => {
    setRole(role === "user" ? "admin" : "user");
  };

  // signup
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [Error, setError] = useState("")
  const [adminCode, setAdminCode] = useState("")
  const navigate = useNavigate()

  const handleSubmite = (e) => {
    e.preventDefault()
    if (role === "admin") {
      if (adminCode === "VKHOTEL") {
        handleSubmiteDone()
      } else {
        setError("Invalid Admin Code");
      }
    } else {
      handleSubmiteDone()
    }
  }

  const handleSubmiteDone = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`, {
        username,
        email,
        password,
        role,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          navigate("/login"); // Redirect to login on success
        } else {
          setError(result.data.error || "Unknown error occurred");
        }
      })
      .catch((err) => {
        if (err.response) {
          // The server responded with an error (e.g. 400, 500)
          setError(err.response.data.error || "Signup failed");
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from the server. Please try again later.");
        } else {
          // Something else happened in setting up the request
          setError("Error: " + err.message);
        }
      });
  };

  return (
    <div className="All-background-img h-screen flex items-center justify-center w-screen">
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Sign Up
        </h2>
        {Error && <p className='text-red-600 text-center mt-8'>{Error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmite}>
          {/* Radio button */}
          <div className="mb-4 flex items-center">
            <label
              className="mr-2 block text-gray-700 text-sm font-bold"
              htmlFor="radio-button"
            >
              I am:
            </label>
            <label className="cursor-pointer relative h-[1.5em] w-[3em] rounded-full bg-[hsl(0,0%,7%)] shadow-[0px_2px_4px_0px_rgb(18,18,18,0.25),0px_4px_8px_0px_rgb(18,18,18,0.35)]">
              <span className="absolute inset-[0.05em] rounded-full border-[1px] border-[hsl(0,0%,25%)]"></span>
              <div className="absolute left-[0.25em] top-1/2 flex h-[1em] w-[1em] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[inset_0px_2px_2px_0px_hsl(0,0%,85%)]">
                <div className="h-[0.75em] w-[0.75em] rounded-full bg-[hsl(0,0%,7%)] shadow-[0px_2px_2px_0px_hsl(0,0%,85%)]"></div>
              </div>
              <div className="absolute right-[0.25em] top-1/2 h-[0.125em] w-[0.75em] -translate-y-1/2 rounded-full bg-[hsl(0,0%,50%)] shadow-[inset_0px_2px_1px_0px_hsl(0,0%,40%)]"></div>
              <input
                className="peer h-[0.5em] w-[0.5em] opacity-0"
                id="radio-button"
                name="role"
                type="checkbox"
                checked={role === "user"}
                onChange={handleToggle}
              />
              <span className="absolute left-[0.125em] top-1/2 flex h-[1.25em] w-[1.25em] -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(26,26,26)] shadow-[inset_2px_2px_2px_0px_rgba(64,64,64,0.25),inset_-2px_-2px_2px_0px_rgba(16,16,16,0.5)] duration-300 peer-checked:left-[calc(100%-1.375em)]">
                <span className="relative h-full w-full rounded-full">
                  <span className="absolute inset-[0.05em] rounded-full border-[1px] border-[hsl(0,0%,50%)]"></span>
                </span>
              </span>
            </label>
            <p className="text-black mx-1">{role.toUpperCase()}</p>
          </div>

          {role === 'admin' && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="admin-code"
              >
                Admin Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="admin-code"
                name="adminCode"
                type="text"
                placeholder="Admin Code"
                required
                onChange={(e) => setAdminCode(e.target.value)}
              ></input>
            </div>
          )}

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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              required
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p className="text-black">I already have a account? <Link to={'/login'}>Login</Link> </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
