import React, { useEffect } from "react";
import { HeadphonesIcon, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);

const FriendsActivity = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="p-4 flex justify-center items-center border-b border-zinc-800">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <Users className="size-5 shrink-0" />
            <h2 className="font-semibold">Friends activity</h2>
          </div>
          <p className="text-xs text-zinc-500">Demo — live listening not wired yet</p>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1 ">
        <div className="p-4 space-y-4">
          {users.length === 0 && user && (
            <p className="text-center text-sm text-zinc-400">No other users yet.</p>
          )}
          {users.map((listedUser) => (
            <div
              key={listedUser._id}
              className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
            >
              <div className="flex item-start gap-3">
                <div className="relative">
                  <Avatar className="size-10 ">
                    <AvatarImage
                      className=" size-12 rounded-full  border border-zinc-800 p-0.5"
                      src={listedUser.imageUrl}
                      alt={listedUser.fullName}
                    />
                    <AvatarFallback className="flex items-center justify-center bg-zinc-700 text-white text-sm font-medium">
                      {listedUser.fullName?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm text-white">
                    {listedUser.fullName}
                  </span>
                  <div className="mt-1 text-xs text-zinc-400">Activity unavailable</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;
