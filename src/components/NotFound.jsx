import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800  dark:bg-gray-800">
      <h1 className="text-9xl font-extrabold text-purple-600 animate-bounce">
        404
      </h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2 dark:text-white">
        Oops! La page demandée n`&apos;`existe pas.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-xl"
      >
        Retour à la page d`&apos;`accueil
      </Link>
    </div>
  );
};

export default NotFound;
