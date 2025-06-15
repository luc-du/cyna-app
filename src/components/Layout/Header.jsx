import DarkModeToggle from "../ui/buttons/DarkModeToggle";
import Navbar from "./navbar/Navbar";

export default function Header() {
  return (
    <>
      <header className="w-full top-0 flex flex-row justify-between items-center p-4 bg-primaryBackground text-white shadow-md z-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
      </header>
      <div className="flex w-full items-center justify-end my-4 p-4">
        <DarkModeToggle variant={"switch"} />
      </div>
    </>
  );
}
