"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  return (
    <nav className="admin-header">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/logo/png/vitalink-high-resolution-logo-white.png"
          height={100}
          width={100}
          alt="logo"
          className="rounded-xl"
        />
      </Link>
      <div className="flex justify-evenly items-center gap-3">
        <p className="text-neutral-200">Admin Dashboard</p>
        <Button
          onClick={() => {
            window.localStorage.removeItem("VitaLinkAccessKey");
            router.push("/");
          }}
          className="bg-black text-white"
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
