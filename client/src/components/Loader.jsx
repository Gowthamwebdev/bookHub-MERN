import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-ping w-16 h-16 rounded-full bg-blue-100"></div>
    </div>
  );
};

export default Loader;
