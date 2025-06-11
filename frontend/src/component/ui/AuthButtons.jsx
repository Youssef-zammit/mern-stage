import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="px-6 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition">
        Login
      </button>
      <button className="px-6 py-2 bg-white border border-pink-400 text-pink-500 rounded-full shadow-md hover:bg-pink-100 transition">
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
