import PropTypes from "prop-types";
import { useRef } from "react";
import MenDefaultAvatar from "../../assets/avatars/default-men.png";
import CTAButton from "../ui/buttons/CTAButton";

const ProfileHeader = ({ data, onUpload }) => {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      {!data ? (
        <p>Erreur lors de la récupération des infos utilisateur</p>
      ) : (
        <>
          <img
            src={data.urlProfile || MenDefaultAvatar}
            alt={`Photo de profil de ${data?.firstname}${data?.lastname}`}
            title={`Photo de profil de ${data?.firstname}${data?.lastname}`}
            className="w-24 h-24 rounded-full border"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <CTAButton
            label="Modifier"
            className="cta-profile-style"
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
};

ProfileHeader.propTypes = {
  data: PropTypes.shape({
    urlProfile: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
  onUpload: PropTypes.func,
};

export default ProfileHeader;
