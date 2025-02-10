import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Theme() {
  // redirect to youtube
  const router = useRouter();
  useEffect(() => {
    void router.push("https://www.instagram.com/reel/DE2IY6FvbTm/");
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <Image
        src={"/2025/logo.png"}
        className="animate-pulse"
        alt="logo"
        width={300}
        height={300}
      />
    </div>
  );
}

export default Theme;
