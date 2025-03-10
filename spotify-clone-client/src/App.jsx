import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/chat/ChatPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<Chat/>} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
