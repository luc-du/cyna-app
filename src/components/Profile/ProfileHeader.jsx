import PropTypes from "prop-types";
import MenDefaultAvatar from "../../assets/avatars/default-men.png";
import CTAButton from "../ui/buttons/CTAButton";

const ProfileHeader = ({ data }) => {
  console.log(data);

  // 1.States
  // 2.Functions
  // 3.Others
  let content;
  if (!data || data === undefined) {
    content =
      "Erreur lors de la récupération des informations de l'utilisateur";
  } else {
    content = (
      <>
        <img
          src={data.urlProfile || MenDefaultAvatar}
          alt={`Photo de profil de ${data.firstname}${data.lastname}`}
          title={`Photo de profil de ${data.firstname}${data.lastname}`}
          className="w-24 h-24 rounded-full border"
        />
        <CTAButton label="Modifier" className={"cta-profile-style"} />
      </>
    );
  }
  // 4.Render
  return <div className="flex flex-col items-center mb-4">{content}</div>;
};
ProfileHeader.propTypes = {
  data: PropTypes.shape({
    urlProfile: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileHeader;
