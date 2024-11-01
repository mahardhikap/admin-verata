import Dashboard from "@/containers/dashboard.container";
import React, { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import withAuth from "@/utils/with-auth";
interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const StartDashboard: React.FC = () => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (error: any) {
        console.error(error.message); // Log errors
      }
    }
  }, []);

  return (
    <Dashboard>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="font-semibold">
          Hello {user?.username || "Guest"}, welcome to Verata dashboard!
        </div>
        <div>Menu ada di sebelah kiri</div>
      </div>
    </Dashboard>
  );
};

export default withAuth(StartDashboard)
