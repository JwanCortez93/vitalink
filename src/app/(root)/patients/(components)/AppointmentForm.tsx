"use client";

import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { createAppointment } from "@/lib/actions/appointment.actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarX2, NotepadText, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Doctors } from "../../../../../constants";
import { AppointmentFormProps, Status } from "../../../../../types";
import { getAppointmentSchema } from "@/lib/validation";

const AppointmentForm = ({ type, userId, patientId }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "cancel":
        status = "cancelled";
        break;
      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.push(
            `patients/${userId}/new-appointment/success?appointmentId=${newAppointment.id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Remove Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type !== "cancel" && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">New Appointment</h1>
              <p className="text-popover">
                Request a new appointment in seconds.
              </p>
            </section>
            <CustomFormField
              control={form.control}
              fieldType={"select"}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.image}
                      className="rounded-full border border-background"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType="datePicker"
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - HH:mm 'hs'"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={"textarea"}
                name="reason"
                label="Reason for appointment"
                placeholder="Write here why you need to make an appointment."
                icon={
                  <Stethoscope
                    height={20}
                    className="text-popover flex items-center justify-center h-full"
                  />
                }
              />
              <CustomFormField
                control={form.control}
                fieldType={"textarea"}
                name="note"
                label="Notes"
                placeholder="Write here any additional information or requirements you want to share."
                icon={
                  <NotepadText
                    height={20}
                    className="text-popover flex items-center justify-center h-full"
                  />
                }
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">Cancel Appointment</h1>
              <p className="text-popover">
                Here you can dismiss an appointment.
              </p>
            </section>
            <CustomFormField
              control={form.control}
              fieldType={"textarea"}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Why do you need to cancel this appointment?"
              icon={
                <CalendarX2
                  height={20}
                  className="text-popover flex items-center justify-center h-full"
                />
              }
            />
          </>
        )}
        <SubmitButton
          isLoading={isLoading}
          className={
            type === "cancel"
              ? "shad-danger-btn w-full"
              : "shad-primary-btn w-full"
          }
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
