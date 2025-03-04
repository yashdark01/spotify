import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaHome } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { BsBoxArrowDown } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex items-center justify-between min-w-full w-screen  bg-black px-6 py-2  text-white">
      <div className="flex items-center gap-4">
        <img src="/spotify-icon.png" alt="Spotify Logo" className="w-8 h-8" />
        <FaHome className="text-xl text-gray-300" />
        <div className="relative flex items-center bg-[#121212] rounded-full px-4 py-1 w-96">
          <IoIosSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent text-white outline-none px-2 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-6 text-gray-300 text-sm">
        <span>Premium</span>
        <span>Support</span>
        <span>Download</span>
        <span className="text-gray-500">|</span>
        <BsBoxArrowDown className="text-lg" />
        <span>Install App</span>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn className="bg-black">
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
