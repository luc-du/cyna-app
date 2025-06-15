import DarkModeToggle from "../ui/buttons/DarkModeToggle";
import Navbar from "./navbar/Navbar";

export default function Header() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <header className="w-full flex justify-between items-center px-4 py-3 bg-primary text-primary shadow-md z-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
      </header>
      <div className="w-full flex items-center justify-end p-4">
        <DarkModeToggle variant="switch" />
      </div>
    </>
  );
}
