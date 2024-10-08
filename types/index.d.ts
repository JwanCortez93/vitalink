import { ReactElement, ReactNode } from "react";
import { Control } from "react-hook-form";
import { Appointment } from "./appwrite.types";

declare type FormFieldType =
  | "input"
  | "checkbox"
  | "textarea"
  | "phoneInput"
  | "datePicker"
  | "select"
  | "skeleton";

declare type CustomFormFieldProps = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  fieldType: FormFieldType;
  icon?: ReactElement;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: ReactNode;
  renderSkeleton?: (field: any) => ReactNode;
};

declare type ButtonProps = {
  isLoading: boolean;
  className?: string;
  children: ReactNode;
};

/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: FormData;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

declare type AppointmentFormProps = {
  userId: string;
  patientId: string;
  patientPhysician: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setIsOpen: (open: boolean) => void;
};

declare type StatCardProps = {
  icon: ReactElement;
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
};

declare type AppointmentModalProps = {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
};
