import PropTypes from "prop-types";
import {
  FaBalanceScale,
  FaEnvelopeOpenText,
  FaFileContract,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

/** * FooterLinks
 * Composant de liens de pied de page.
 * Affiche des liens vers les pages CGV, Mentions légales, FÀQ et Contact.
 *Utilisé dans le composant Footer en MobileMenu.
 * @param {Object} props - Propriétés du composant.
 */
const FooterLinks = ({
  className = "flex flex-row gap-6 text-sm",
  onClick,
}) => {
  const links = [
    { label: "CGV", to: "/cgv", icon: <FaFileContract /> },
    { label: "Mentions légales", to: "/legal", icon: <FaBalanceScale /> },
    { label: "FÀQ", to: "/faq", icon: <FaQuestionCircle /> },
    { label: "Contact", to: "/contact", icon: <FaEnvelopeOpenText /> },
  ];

  return (
    <nav className={className}>
      {links.map(({ label, to, icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onClick}
          className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white"
        >
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default FooterLinks;

FooterLinks.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
