import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="hidden sm:flex flex-col items-center p-4 bg-primaryBackground text-white w-full bottom-0 shadow-md">
      <div className="flex flex-row space-x-4 mb-4">
        <Link to="/terms" className="hover:text-gray-400 text-white">
          CGU
        </Link>
        <Link to="/legal" className="hover:text-gray-400 text-white">
          Mentions légales
        </Link>
        <Link to="/contact" className="hover:text-gray-400 text-white">
          Contact
        </Link>
      </div>
      <div className="flex flex-row space-x-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-white"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-white"
        >
          <BsTwitterX className="text-xl" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-white"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>
    </footer>
  );
}
