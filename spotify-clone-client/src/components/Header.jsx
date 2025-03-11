import {

  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./buttons/SignInOAuthButtons";
import { Button, buttonVariants } from "./ui/button";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
const Header = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 ">
      <div className="flex gap-2 items-center justify-center text-xl  font-semibold">
        <img src="/spotify.png" alt="Spotify" className="size-9" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"} className={cn(buttonVariants({variant:"outline"}))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
      
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />

        {/* <SignedIn>
        <SignOutButton>
        <Button
            variant={"secondary"}
            className="w-full text-white border-zinc-200 h-11"
          >
            Sign Out
            
          </Button>

        </SignOutButton>
         
        </SignedIn> */}
      </div>
    </div>
  );
};
export default Header;
