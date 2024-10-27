import React, { ReactNode } from "react";
interface ContainerI {
  children: ReactNode;
}

const PageContainer: React.FC<ContainerI> = ({ children }) => {
  return (
    <>
      <div className="font-poppins min-h-screen min-w-screen">{children}</div>
    </>
  );
};

export default PageContainer;
