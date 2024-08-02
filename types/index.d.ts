import { ReactElement, ReactNode } from "react";
import { Control } from "react-hook-form";

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
