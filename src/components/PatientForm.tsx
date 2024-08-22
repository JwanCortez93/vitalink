"use client";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there! 👋</h1>
          <p className="text-popover">Schedule your first appointment.</p>
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
          label="Phone Number"
          placeholder="(555) 123-4567"
          icon={
            <Phone
              height={20}
              className="text-popover flex items-center justify-center h-full"
            />
          }
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
