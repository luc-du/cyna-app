import PropTypes from "prop-types";
import { useRef } from "react";
import MenDefaultAvatar from "../../assets/avatars/default-men.png";
import CTAButton from "../shared/buttons/CTAButton";

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
        <p role="alert">Erreur lors de la récupération des infos utilisateur</p>
      ) : (
        <>
          <img
            src={data.urlProfile ? data.urlProfile : MenDefaultAvatar}
            alt={
              data.firstname || data.lastname
                ? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
                : "Photo de profil"
            }
            title={
              data.firstname || data.lastname
                ? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
                : "Photo de profil"
            }
            className="w-24 h-24 rounded-full border"
            aria-label={
              data.firstname || data.lastname
                ? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
                : "Photo de profil"
            }
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Changer la photo de profil"
            tabIndex={-1}
          />
          <CTAButton
            label="Modifier"
            className="cta-profile-style"
            handleClick={handleClick}
            aria-label="Modifier la photo de profil"
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
