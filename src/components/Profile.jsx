import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Profil</h1>
      {user ? (
        <>
          <p>Nom : {user.name}</p>
          <p>Email : {user.email}</p>
          <button className="btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </>
      ) : (
        <p>Veuillez vous connecter.</p>
      )}
    </div>
  );
};

export default Profile;
