import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Profile = () => {
  // 1.State
  const user = useSelector((state) => state.auth.user);
  // 2.Functions
  const dispatch = useDispatch();
  // 3.Others

  // 4.Render
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Profil</h1>
      <p>Nom : {user?.name}</p>
      <p>Email : {user?.email}</p>
      <button className="btn" onClick={() => dispatch(logout())}>
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
