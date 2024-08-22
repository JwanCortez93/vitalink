import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../../(components)/RegisterForm";
import { SearchParamProps } from "../../../../../../types";
import { getUser } from "@/lib/actions/patient.actions";

const UserRegistrationPage = async ({
  params: { userId },
}: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex justify-center">
            <Image
              src="/logo/svg/logo-color.svg"
              height={350}
              width={350}
              alt="logo"
            />
          </div>
          <RegisterForm user={user} />
          <p className=" text-14-regular mt-3 justify-items-end text-muted xl:text-left">
            © 2024 VitaLink
          </p>
        </div>
      </section>
      <Image
        src="/assets/form.jpg"
        height={500}
        width={500}
        alt="doctor"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default UserRegistrationPage;
