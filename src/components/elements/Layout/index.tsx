import React from "react";
import { LayoutProps } from "./interface";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full sm:w-[440px] flex flex-col items-center justify-center min-h-screen relative overflow-x-clip">
        <div className="flex flex-col w-full min-h-screen bg-[#F7F7F7]">
          {children}
        </div>
      </div>
    </div>
  );
};
