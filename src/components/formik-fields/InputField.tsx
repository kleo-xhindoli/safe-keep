import React from "react";
import cn from "classnames";
import { useField } from "formik";
import Input, { InputProps } from "../ui/Input";
import Label from "../ui/Label";

interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { name, label, className, inputClassName, labelClassName, ...rest },
    ref
  ) => {
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
          type="text"
          hasError={Boolean(meta.error && meta.touched)}
          aria-invalid={Boolean(meta.error)}
          aria-describedby={meta.error ? `${name}-error` : undefined}
          {...rest}
          {...field}
          className={cn("mt-1", inputClassName)}
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

export default InputField;
