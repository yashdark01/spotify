import { SignedIn, SignedOut, SignIn, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./buttons/SignInOAuthButtons";
import { Button } from "./ui/button";
const Header = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 ">
      <div className="flex gap-2 items-center"><img src = "/spotify.png" alt="Spotify" className="size-9"/></div>
      <div>
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
        <SignOutButton>
        <Button
            variant={"secondary"}
            className="w-full text-white border-zinc-200 h-11"
          >
            Sign Out
            
          </Button>

        </SignOutButton>
         
        </SignedIn>
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};
export default Header;
