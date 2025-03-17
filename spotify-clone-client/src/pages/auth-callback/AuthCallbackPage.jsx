
import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthCallbackPage = () => {
  const {isLoaded, user} = useUser(); 
  const syncAttempted = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try{
        if(!isLoaded || !user || syncAttempted.current) return;

        // console.log("Syncing user with user data : ",  user.id, user.firstName, user.lastName, user.imageUrl);
        try{
          const response = await axiosInstance.post("/auth/callback", {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          });
          syncAttempted.current = true;
        }
        catch(error){
          if(axios.isAxiosError(error)){
            console.error("Error in auth callback:", error.response?.data);
          }
          else{
            console.error("Error in auth callback:", error);
          }
        }
        // console.log("User synced with backend 2");

      }catch(error){
        console.error("Error in auth callback:", error);
      }finally{
        navigate('/');  
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader className="siz-6 text-emerald-700 animate-spin" />
      {/* <Card className="w-[80%] max-w-md bg-zinc-900 border-zinc-800 flex justify-center items-center">
          <Loader className="siz-6 text-emerald-700 animate-spin" />
          <h3 className="text-zinc-400 text-xl">Loading</h3>
          <p className="text-zinc-400 text-sm">Redirecting...</p>
      </Card> */}
    </div>
  );
};

export default AuthCallbackPage;
