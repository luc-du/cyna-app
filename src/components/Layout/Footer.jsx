import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="hidden sm:flex flex-col items-center p-6 w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white shadow-inner border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <nav className="flex flex-row space-x-4 mb-4 text-sm">
        <Link
          to="/terms"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          CGU
        </Link>
        <Link
          to="/legal"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          Mentions légales
        </Link>
        <Link
          to="/contact"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          Contact
        </Link>
      </nav>
      <div className="flex flex-row space-x-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre page Facebook"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre compte Twitter"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          <BsTwitterX className="text-xl" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre page LinkedIn"
          className="hover:text-primary dark:hover:text-gray-300"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>
    </footer>
  );
}
