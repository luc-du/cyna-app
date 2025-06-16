import {
  FaCcMastercard as MastercardIcon,
  FaCcVisa as VisaIcon,
} from "react-icons/fa";

// Choix de l'icône selon le type
export const BrandIcon = (type) => {
  type?.toLowerCase().includes("visa")
    ? VisaIcon
    : type?.toLowerCase().includes("master")
    ? MastercardIcon
    : null;
};
