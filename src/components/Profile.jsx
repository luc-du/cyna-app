import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(JSON.stringify(user.firstname, null, 2));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Profil</h1>
      {loading ? (
        <p>Chargement des informations...</p>
      ) : user ? (
        <>
          <p>
            Nom : {user.firstname} {user.lastname}
          </p>
          <p>Email : {user.email}</p>
          <button className="btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </>
      ) : (
        <p>Impossible de récupérer les informations de l'utilisateur.</p>
      )}
    </div>
  );
};

export default Profile;
