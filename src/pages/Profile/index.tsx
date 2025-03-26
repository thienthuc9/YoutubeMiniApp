import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogout =()=>{
    dispatch(logout());
    window.location.reload();
  }
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;