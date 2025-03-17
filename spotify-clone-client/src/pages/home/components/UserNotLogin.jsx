import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserNotLogin = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else {
      setGreeting("Good Evening 🌙");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-8 bg-zinc-900 border border-zinc-800 animate-pulse text-white rounded-lg shadow-2xl text-center max-w-md "
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 ">
          {greeting}
        </h1>
        <h2 className="text-2xl font-semibold  mb-3">
          Oops! You’re not logged in.
        </h2>
        <p className=" mb-6">
          Please log in to access this page and explore all the features.
        </p>
      </motion.div>
    </div>
  );
};

export default UserNotLogin;