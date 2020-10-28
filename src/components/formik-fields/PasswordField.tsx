import React from "react";
import cn from "classnames";
import { useField } from "formik";
import Input, { InputProps } from "../ui/Input";
import Label from "../ui/Label";
import IconButton from "../ui/IconButton";
import { useDisclosure } from "../../hooks/utils";

interface PasswordFieldProps extends InputProps {
  name: string;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    { name, label, className, inputClassName, labelClassName, ...rest },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure(false);
    const [field, meta] = useField(name);
    return (
      <div className={className}>
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}
          </Label>
        )}
        <Input
          id={name}
          hasError={Boolean(meta.error && meta.touched)}
          aria-invalid={Boolean(meta.error)}
          aria-describedby={meta.error ? `${name}-error` : undefined}
          {...rest}
          {...field}
          type={isOpen ? "text" : "password"}
          className={cn("mt-1", inputClassName)}
          rightElement={
            <IconButton
              icon={isOpen ? "EyeOff" : "Eye"}
              onClick={onToggle}
              type="button"
            />
          }
          ref={ref}
        />
        {meta.error && meta.touched && (
          <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {meta.error}
          </p>
        )}
      </div>
    );
  }
);

export default PasswordField;
