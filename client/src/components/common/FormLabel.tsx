import React from "react";
import { MdOutlineHelpOutline } from "react-icons/md";

interface FormLabelProps {
  label: string;
  tooltipText?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  label,
  tooltipText,
  required = false,
  htmlFor,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-1.5 mb-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-[14px] font-bold text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {tooltipText && (
        <div className="relative flex items-center group cursor-pointer">
          <MdOutlineHelpOutline
            className="text-gray-400 hover:text-[#1E604B] transition-colors"
            size={16}
          />
          {/* Tooltip Popup */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex group-focus-within:flex flex-col w-64 p-2.5 bg-gray-900 text-white text-[12px] leading-snug rounded-lg shadow-xl z-30 pointer-events-none transition-opacity duration-200">
            <span>{tooltipText}</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormLabel;