import { useNavigate } from "react-router-dom";


function LogoutBtn() {

    const navigate = useNavigate()
    const logoutbtn = () => {
        localStorage.clear();
        navigate("/");
        location.reload()
    }

  return (
    <>
      <button
        onClick={logoutbtn}
        className="bg-neutral-950 mx-2 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
      >
        <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
