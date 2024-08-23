"use client";

import AppointmentForm from "@/app/(root)/patients/(components)/AppointmentForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { useState } from "react";
import { AppointmentModalProps } from "../../../../../types";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: AppointmentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={clsx("capitalize", {
            "text-green-500 bg-transparent hover:bg-green-900":
              type === "schedule",
            "text-red-500 bg-transparent hover:bg-red-900": type === "cancel",
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-600 text-white border-none sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription className="text-neutral-300">
            Fill in the following details to {type} the appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
