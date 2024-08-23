"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AdminPageWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const accessKey = window.localStorage.getItem("VitaLinkAccessKey");
      if (!accessKey) {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [router]);

  
  if (!isAuthorized) {
    return null; 
  }

  return <>{children}</>;
};

export default AdminPageWrapper;
