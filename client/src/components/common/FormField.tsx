import React from "react";
import FormLabel from "./FormLabel";

interface FormFieldProps {
  label: string;
  tooltipText?: string;
  required?: boolean;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  tooltipText,
  required,
  htmlFor,
  error,
  className = "",
  children,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* 1. Label Section */}
      <FormLabel
        label={label}
        tooltipText={tooltipText}
        required={required}
        htmlFor={htmlFor}
      />

      {/* 2. Input / Select / Textarea */}
      {children}

      {/* 3. Error Message (Always at the bottom of the input field) */}
      {error && (
        <span className="text-[12px] text-red-600 font-medium mt-1.5">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;