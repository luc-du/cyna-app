import Navbar from "./navbar/Navbar";

export default function Header() {
  return (
    <header className="w-full top-0 flex flex-row justify-between items-center p-4 bg-primaryBackground text-white shadow-md">
      <Navbar />
    </header>
  );
}
