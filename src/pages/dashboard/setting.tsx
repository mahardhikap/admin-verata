import React from "react";
import Dashboard from "@/containers/dashboard.container";
import { LuConstruction } from "react-icons/lu";

const Setting: React.FC = () => {
  return (
    <Dashboard>
      <div className="flex flex-col justify-center items-center h-full">
        <LuConstruction size={96} className="text-orange-500" />
        <div className="font-semibold">Setting</div>
      </div>
    </Dashboard>
  );
};

export default Setting;
