import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import FriendsActivity from "./components/RightSidebar";
import { useEffect, useMemo, useState } from "react";

const MainLayout = () => {
  const isMobile = useMemo(() => window.innerWidth <= 768, []);
  const [panelSize, setPanelSize] = useState(20);
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 7}
          maxSize={22}
          onResize={setPanelSize} 
        >
          <LeftSideBar panelSize={panelSize} />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Right Sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25}>
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;