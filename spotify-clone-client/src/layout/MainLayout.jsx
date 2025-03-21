import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import FriendsActivity from "./components/RightSidebar";
import { useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControl from "./components/PlaybackControls";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerVisibility } from "@/redux/playerSlice";
import { useAuth } from "@clerk/clerk-react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [panelSize, setPanelSize] = useState(20);

  const { isPlaying, isPlayer } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { userId } = useAuth();

  useEffect(() => {
    // Update `isMobile` on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPlaying && !isPlayer) {
      dispatch(setPlayerVisibility(true));
    }
  }, [isPlaying, isPlayer, dispatch]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <AudioPlayer />

        {/* Left Sidebar */}
        {userId && <>
          <ResizablePanel
            defaultSize={20}
            minSize={isMobile ? 0 : 7}
            maxSize={22}
            onResize={setPanelSize}
          >
            <LeftSideBar panelSize={panelSize} />
           
          </ResizablePanel>
           <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
           </>
        }

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* Right Sidebar */}
        {userId && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25}>
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Playback Controls */}
      <div
        className={`${
          isPlayer ? "flex opacity-100 translate-y-0" : "hidden translate-y-24"
        } w-full h-auto transition-all duration-700`}
      >
        <PlaybackControl />
      </div>
    </div>
  );
};

export default MainLayout;