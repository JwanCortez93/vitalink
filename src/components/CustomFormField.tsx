"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomFormFieldProps } from "../../types";
import { Input } from "./ui/input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  switch (props.fieldType) {
    case "input":
      return (
        <div className="flex rounded-md border border-muted bg-foreground">
          {props.icon && <div className="mx-2">{props.icon}</div>}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case "phoneInput":
      return (
        <div>
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        </div>
      );
    case "checkbox":
    case "textarea":
    case "datePicker":
    case "select":
    case "skeleton":
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label, icon, placeholder } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== "checkbox" && label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} props={props}></RenderField>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
