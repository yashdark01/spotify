import React from "react";

const PremiumPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Listen without limits. Try 4 months of Premium for <span className="text-pink-500">₹119</span>.
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-400">
          Only ₹119/month after. Cancel anytime.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-pink-500 text-black font-semibold py-3 px-6 rounded-full text-lg">
            Get Premium Individual
          </button>
          <button className="border border-white text-white font-semibold py-3 px-6 rounded-full text-lg">
            View all plans
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Premium Individual only. ₹119 for 4 months, then ₹119 per month after. Offer only available if you haven't tried Premium before. 
          <a href="#" className="underline text-white">Terms apply.</a> Offer ends 5 March 2025.
        </p>
      </div>
    </div>
  );
};

export default PremiumPage;