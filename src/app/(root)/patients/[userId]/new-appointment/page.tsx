import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import AppointmentForm from "../../(components)/AppointmentForm";
import { SearchParamProps } from "../../../../../../types";

const NewAppointmentPage = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between ">
          <div className="flex justify-center">
            <Image
              src="/logo/svg/logo-color.svg"
              height={300}
              width={300}
              alt="logo"
            />
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="text-14-regular mt-4 justify-items-end text-muted xl:text-left">
            © 2024 VitaLink
          </p>
        </div>
      </section>
      <Image
        src="/assets/waiting-room.jpg"
        height={500}
        width={500}
        alt="waiting room"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointmentPage;
