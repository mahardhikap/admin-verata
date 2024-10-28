import React, { ReactNode } from "react";
import PageContainer from "@/containers/page.container";
import Image from "next/image";
import { MenuDashboard } from "@/data/menu.data";
import { useRouter } from "next/router";
interface DashboardI {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardI> = ({ children }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/");
  };
  return (
    <PageContainer>
      <div className="grid grid-cols-12">
        <div className="col-span-3 flex flex-col text-base font-medium gap-3 bg-main h-screen sticky text-white p-3">
          <Image
            src="/verata.jpg"
            alt="verata-logo"
            width={500}
            height={500}
            className="w-1/4 grayscale hover:grayscale-0 cursor-pointer"
            onClick={() => router.replace("/dashboard")}
          />
          {MenuDashboard?.map((item, i) => {
            return (
              <div
                onClick={() => router.replace(item.url)}
                key={i}
                className={`px-3 py-2 rounded-xl cursor-pointer ${
                  item.url === router.pathname ? "bg-[#919295]" : ""
                }`}
              >
                {item.label}
              </div>
            );
          })}
          <div
            className="px-3 py-2 border-b-2 border-[#919295] w-fit cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </div>
        </div>
        <div className="col-span-9 overflow-y-auto h-screen">{children}</div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
