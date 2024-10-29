import PageContainer from "@/containers/page.container";
import Image from "next/image";
import { Input, Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { loginUser } from "@/api/user.api";
import { UserLoginI } from "@/interfaces/user.interface";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<UserLoginI>({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const result = await loginUser(data);
      if(result?.code === 200){
        toast.success(result?.message)
        localStorage.setItem('token', result?.data?.token);
        router.push('/dashboard');
      } else {
        toast.error(result?.message)
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-main text-white relative">
        <Image
          src="/verata.jpg"
          alt="logo-verata"
          width={500}
          height={500}
          className="w-3/12 md:w-2/12 lg:w-1/12 grayscale hover:grayscale-0 cursor-pointer"
        />
        <div className="flex flex-col justify-center items-center w-8/12 md:w-6/12 lg:w-4/12 gap-5">
          <Input 
            color="white" 
            label="Username" 
            type="text" 
            name="username"
            value={data.username} 
            onChange={handleInputChange} 
            autoComplete="off"
          />
          <Input 
            color="white" 
            label="Password" 
            type="password" 
            name="password"
            value={data.password} 
            onChange={handleInputChange} 
          />
          <Button color="white" className="w-full" onClick={handleLogin}>Login</Button>
        </div>
        <div className="font-semibold text-white text-xs absolute bottom-0 pb-10">&copy; 2024 Verata. All rights reserved.</div>
      </div>
    </PageContainer>
  );
}