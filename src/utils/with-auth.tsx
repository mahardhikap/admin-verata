// hooks/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { detailUser } from "@/api/user.api";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<Omit<P, keyof P>> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await detailUser();

          if (response?.code !== 200) {
            router.push("/");
          }
        } catch (error: any) {
          console.error(error.message);
          router.push("/");
        }
      };

      fetchUserDetails();
    }, [router]);

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;