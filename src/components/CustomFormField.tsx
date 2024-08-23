"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CustomFormFieldProps } from "../../types";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
              className="flex rounded-md border border-muted bg-foreground shad-input px-2"
            />
          </FormControl>
        </div>
      );
    case "datePicker":
      return (
        <div className="flex rounded-md border border-muted bg-foreground">
          <div className="flex flex-col justify-center items-center">
            <CalendarDays
              height={20}
              className="text-popover flex items-center justify-center h-full ml-2"
            />
          </div>
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case "skeleton":
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case "select":
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case "textarea":
      return (
        <div className="flex rounded-md border border-muted bg-foreground">
          {props.icon && <div className="mx-2">{props.icon}</div>}
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className="shad-textArea"
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );
    case "checkbox":
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name}>{props.label}</Label>
          </div>
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props;

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
