"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AdminPageWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("VitaLinkAccessKey")) {
      router.push("/");
    }
  }, [router]);

  if (window.localStorage.getItem("VitaLinkAccessKey")) {
    return children;
  }
};

export default AdminPageWrapper;
