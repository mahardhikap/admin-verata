import PageContainer from "@/containers/page.container";
import Image from "next/image";
import { Input, Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter()
  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-main text-white">
        <Image
          src="/verata.jpg"
          alt="logo-verata"
          width={500}
          height={500}
          className="w-3/12 md:w-2/12 lg:w-1/12 grayscale hover:grayscale-0"
        />
        <div className="flex flex-col justify-center items-center w-8/12 md:w-6/12 lg:w-4/12 gap-5">
          <Input color="white" label="Username" type="text"/>
          <Input color="white" label="Password" type="password"/>
          <Button color="white" className="w-full" onClick={()=>router.push('/dashboard')}>Login</Button>
        </div>
      </div>
    </PageContainer>
  );
}
