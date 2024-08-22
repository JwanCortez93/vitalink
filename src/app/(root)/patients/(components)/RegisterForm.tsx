"use client";

import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Ambulance,
  Baby,
  BriefcaseBusiness,
  CircleUserRound,
  Hash,
  HeartPulse,
  Hospital,
  Mail,
  MapPinHouse,
  Pill,
  ShieldQuestion,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "../../../../../constants";
import { User } from "../../../../../types";
import FileUploader from "./FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blob", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      const patient = await registerPatient(patientData);
      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome!</h1>
          <p className="text-popover">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={"input"}
          name="name"
          label="Full name"
          placeholder="John Doe"
          icon={
            <CircleUserRound
              height={20}
              className="text-popover flex items-center justify-center h-full"
            />
          }
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            icon={
              <Mail
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"phoneInput"}
            name="phone"
            label="Phone number"
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"datePicker"}
            name="birthDate"
            label="Date of Birth"
            icon={
              <Mail
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"skeleton"}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem
                        value={option.toLowerCase()}
                        id={option.toLowerCase()}
                      />
                      <Label
                        htmlFor={option.toLowerCase()}
                        className="cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="address"
            label="Address"
            placeholder="123 Fake St."
            icon={
              <MapPinHouse
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            icon={
              <BriefcaseBusiness
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="emergencyContactName"
            label="Emergency contact's name"
            placeholder="Guardian's name"
            icon={
              <Ambulance
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"phoneInput"}
            name="emergencyContactNumber"
            label="Emergency contact's number"
            placeholder="(555) 123-4567"
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={"select"}
          name="primaryPhysician"
          label="Primary physician"
          placeholder="Select a physician"
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
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="BlueCross BlueShield"
            icon={
              <Hospital
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"input"}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
            icon={
              <Hash
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"textarea"}
            name="allergies"
            label="Allergies (if any)"
            placeholder="i.e. Penicilin"
            icon={
              <ShieldQuestion
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"textarea"}
            name="currentMedication"
            label="Current Medication"
            placeholder="i.e. Ibuprofen 200mg"
            icon={
              <Pill
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={"textarea"}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Is there a disease you think could run in your family? i.e. Diabetes, Cancer"
            icon={
              <Baby
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
          <CustomFormField
            control={form.control}
            fieldType={"textarea"}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Any information you think is relevant about previous appointments."
            icon={
              <HeartPulse
                height={20}
                className="text-popover flex items-center justify-center h-full"
              />
            }
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={"select"}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{type}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={"input"}
          name="identificationNumber"
          label="Identification number"
          placeholder="123456789"
          icon={
            <Hash
              height={20}
              className="text-popover flex items-center justify-center h-full"
            />
          }
        />
        <CustomFormField
          control={form.control}
          fieldType={"skeleton"}
          name="identificationDocument"
          label="Add a photo of your document below"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType="checkbox"
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition"
        />
        <CustomFormField
          fieldType="checkbox"
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health information for treatment purposes."
        />
        <CustomFormField
          fieldType="checkbox"
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
