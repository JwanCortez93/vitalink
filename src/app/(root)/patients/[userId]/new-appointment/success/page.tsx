import { Calendar, CalendarCheck, CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "../../../../../../../types";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "../../../../../../../constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const { appointmentId } = searchParams;
  const appointment = await getAppointment(appointmentId as string);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/logo/png/logo-no-background.png"
            height={180}
            width={180}
            alt="logo"
          />
        </Link>

        <section className="flex flex-col items-center">
          <div className="rounded-full bg-popover-foreground">
            <CalendarCheck2 className="h-28 w-28 p-5 text-secondary animate-pulse" />
          </div>
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your{" "}
            <span className="text-secondary animate-pulse">
              appointment request
            </span>{" "}
            has been succesfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm</p>
        </section>
        <section className="request-details">
          <p>Requested appointments details</p>
          <div className="flex items-center gap-3">
            <Image src={doctor?.image!} alt="doctor" width={50} height={50} />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Calendar />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <div className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              Make a new appointment
            </Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href={`/`}>Go back</Link>
          </Button>
        </div>
        <p className="text-14-regular mt-4 justify-items-end text-muted xl:text-left">
          © 2024 VitaLink
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
