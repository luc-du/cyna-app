// import { useSelector } from "react-redux";
// import { logout } from "../store/authSlice";

const Profile = () => {
  // 1.State
  // const user = useSelector((state) => state.auth.user);

  // if (!user) {
  //   return <h1>Nothing</h1>;
  // }
  // 2.Functions
  // const dispatch = useDispatch();
  // 3.Others

  // 4.Render
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   {user ? (
    //     <>
    //       <h1 className="text-2xl font-bold">Profil</h1>
    //       <p>Nom : {user?.name}</p>
    //       <p>Email : {user?.email}</p>
    //       {/* <button className="btn" onClick={() => dispatch("logout()")}>
    //         Se déconnecter
    //       </button> */}
    //     </>
    //   ) : (
    //     <h1>Veuillez vous connectez</h1>
    //   )}
    // </div>

    <h1>Profile</h1>
  );
};

export default Profile;
