import React from "react";
import Dashboard from "@/containers/dashboard.container";
import { LuConstruction } from "react-icons/lu";

const About: React.FC = () => {
  return (
    <Dashboard>
      <div className="flex flex-col justify-center items-center h-full">
        <LuConstruction size={96} className="text-orange-500"/>
        <div className="font-semibold">About</div>
      </div>
    </Dashboard>
  );
};

export default About;
