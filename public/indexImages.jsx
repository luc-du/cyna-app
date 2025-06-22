import {
  FaCcAmex as AmericanExpressIcon,
  FaFileDownload as DownloadIcon,
  FaCcJcb,
  FaCcMastercard as MastercardIcon,
  FaCcVisa as VisaIcon,
} from "react-icons/fa";
import IconCrossCircle from "./icons/IconCrossCircle";
import emptyCartIcon from "./icons/emptyCart.svg";
import {
  default as MenDefaultAvatar,
  default as WomenDefaultAvatar,
} from "./images/avatars/default-men.png";
import cloud from "./images/categories/cloud.jpg";
import edr from "./images/categories/edr.jpg";
import edrPremium from "./images/categories/edrPremium.jpg";
import idImg from "./images/categories/id.jpg";
import identity from "./images/categories/identity.jpg";
import siem from "./images/categories/siem.jpg";
import soc from "./images/categories/soc.jpg";
import emptyBox from "./images/empty-box.jpg";
import placeHolder from "./images/placeholder.svg";
import cert from "./images/products/cert.jpg";
import security from "./images/products/security.jpg";
import socPremium from "./images/products/soc_premium.jpg";
import technology from "./images/products/technology.jpg";
import xdr from "./images/products/xdr.jpg";
import xdrPremium from "./images/products/xdrPremium.png";
import cynaItLogo from "./logo/cyna_it_logo.jpeg";
import logoCynaWhite from "./logo/logo-cyna-white.svg";
import logoPng from "./logo/logo.png";

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
  DownloadIcon,
  MenDefaultAvatar,
  WomenDefaultAvatar,
];

/**
 * Exports nommés pour chaque asset, si vous voulez y accéder individuellement
 */
export {
  AmericanExpressIcon,
  cert,
  cloud,
  cynaItLogo,
  DownloadIcon,
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
  MenDefaultAvatar,
  placeHolder,
  security,
  siem,
  soc,
  socPremium,
  technology,
  VisaIcon,
  WomenDefaultAvatar,
  xdr,
  xdrPremium,
};
