import PatientForm from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/logo/svg/logo-color.svg"
            height={1000}
            width={1000}
            alt="logo"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
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
        className="side-img max-w-[50]"
      />
    </div>
  );
}
