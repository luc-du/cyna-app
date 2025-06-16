import {
  FaCcAmex as AmericanExpressIcon,
  FaCcJcb,
  FaCcMastercard as MastercardIcon,
  FaCcVisa as VisaIcon,
} from "react-icons/fa";
import cynaItLogo from "./cyna_it_logo.jpeg";
import emptyCartIcon from "./icons/emptyCart.svg";
import IconCrossCircle from "./icons/IconCrossCircle";
import cert from "./images/cert.jpg";
import cloud from "./images/cloud.jpg";
import edr from "./images/edr.jpg";
import edrPremium from "./images/edrPremium.jpg";
import emptyBox from "./images/empty-box.jpg";
import idImg from "./images/id.jpg";
import identity from "./images/identity.jpg";
import security from "./images/security.jpg";
import siem from "./images/siem.jpg";
import soc from "./images/soc.jpg";
import socPremium from "./images/socPremium.jpg";
import technology from "./images/technology.jpg";
import xdr from "./images/xdr.jpg";
import xdrPremium from "./images/xdrPremium.png";
import logoCynaWhite from "./logo-cyna-white.svg";
import logoPng from "./logo.png";
import placeHolder from "./placeholder.svg";

/**
 * Tableau indexé de toutes les images et icônes pour import global
 */
export const indexImages = [
  cert,
  cloud,
  edr,
  edrPremium,
  emptyBox,
  idImg,
  identity,
  security,
  siem,
  soc,
  socPremium,
  technology,
  xdr,
  xdrPremium,
  cynaItLogo,
  logoCynaWhite,
  logoPng,
  placeHolder,
  emptyCartIcon,
  IconCrossCircle,
];

// Les icônes spécifiques peuvent toujours être exportées individuellement si nécessaire,
// mais ne sont plus nécessaires dans un tableau séparé si elles sont dans indexImages.
export const icons = []; // Ce tableau peut être vidé ou supprimé si toutes les icônes sont dans indexImages

/**
 * Exports nommés pour chaque asset, si vous voulez y accéder individuellement
 */
export {
  AmericanExpressIcon,
  cert,
  cloud,
  cynaItLogo,
  edr,
  edrPremium,
  emptyBox,
  emptyCartIcon,
  FaCcJcb,
  IconCrossCircle,
  identity,
  idImg,
  logoCynaWhite,
  logoPng,
  MastercardIcon,
  placeHolder,
  security,
  siem,
  soc,
  socPremium,
  technology,
  VisaIcon,
  xdr,
  xdrPremium,
};

/* checked 2025-06-07 */
