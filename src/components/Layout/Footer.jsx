import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import FooterLinks from "./Footer/FooterLink";

const Footer = () => {
  return (
    <footer className="hidden sm:flex flex-col items-center p-6 w-full bg-primary text-white dark:bg-gray-900 dark:text-white shadow-inner border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <FooterLinks />
      <div className="flex flex-row mt-4 gap-6">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre page Facebook"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre compte Twitter"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          <BsTwitterX className="text-xl" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre page LinkedIn"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
