"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Button onClick={() => router.push("/todo")} className="cursor-pointer">
        Click on me to go Sample Page
      </Button>
    </div>
  );
};
export default HomePage;
