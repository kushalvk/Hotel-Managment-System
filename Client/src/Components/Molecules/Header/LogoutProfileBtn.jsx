import { useNavigate } from "react-router-dom";
import HeaderBtn from "../../Atom/Header/HeaderBtn.jsx";

function LogoutBtn() {
  const navigate = useNavigate();

  const logoutbtn = () => {
    localStorage.clear();
    navigate("/");
    location.reload();
  };

  const profilebtn = () => {
    navigate("/myprofile");
  };

  return (
    <>
        <HeaderBtn onClick={logoutbtn} >Logout</HeaderBtn>
        <HeaderBtn onClick={profilebtn} >Profile</HeaderBtn>
    </>
  );
}

export default LogoutBtn;
