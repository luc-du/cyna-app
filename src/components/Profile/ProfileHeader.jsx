import CTAButton from "@shared/buttons/CTAButton";
import { MenDefaultAvatar } from "@utils/indexImages";
import PropTypes from "prop-types";
import { useRef } from "react";

/**
 * En-tête de la page de profil utilisateur, affiche l'avatar
 * et permet son changement via un input file caché.
 * @param {{ user: object, onAvatarUpload: function }} props
 * @returns JSX.Element
 */
const ProfileHeader = ({ user, onAvatarUpload }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    console.log("uploadAvatar");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onAvatarUpload?.(file);
  };

  const fullName = `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim();
  const altText = fullName
    ? `Photo de profil de ${fullName}`
    : "Photo de profil";

  return (
    <div className="flex flex-col items-center mb-4">
      <img
        src={user.urlProfile || MenDefaultAvatar}
        alt={altText}
        title={altText}
        className="w-24 h-24 rounded-full border"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Changer la photo de profil"
      />
      <CTAButton
        label="Modifier"
        className="cta-profile-style"
        handleClick={handleButtonClick}
        aria-label="Modifier la photo de profil"
      />
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    urlProfile: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
  onAvatarUpload: PropTypes.func.isRequired,
};

export default ProfileHeader;
