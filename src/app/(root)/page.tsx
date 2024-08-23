import PatientForm from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "../../../types";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px] ">
          <div className="flex justify-center">
            <Image
              src="/logo/svg/logo-color.svg"
              height={350}
              width={350}
              alt="logo"
            />
          </div>
          <PatientForm />
          <div className="text-14-regular mt-2 flex justify-between">
            <p className="justify-items-end text-muted xl:text-left">
              © 2024 VitaLink
            </p>
            <Link href="/?admin=true" className="text-secondary">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/retrato-doctor.jpg"
        height={500}
        width={500}
        alt="doctor"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
