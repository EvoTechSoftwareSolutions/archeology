import { MdCheck } from "react-icons/md";

interface AddNewPlaceSidebarProps {
  currentStep: number;
}

const AddNewPlaceSidebar = ({ currentStep }: AddNewPlaceSidebarProps) => {
  const steps = [
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Media" },
    { id: 3, label: "Facilities & Travel" },
    { id: 4, label: "SEO" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 w-full lg:w-[260px]">
      <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-1 px-1 pb-1 lg:pb-0 lg:mx-0 lg:px-0">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <li
              key={step.id}
              className={`flex items-center gap-2 sm:gap-4 p-2 rounded-full transition-colors shrink-0 whitespace-nowrap lg:whitespace-normal ${
                isActive ? "bg-[#e8efec]" : ""
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[12px] sm:text-[13px] font-bold shrink-0 ${
                  isActive
                    ? "bg-[#1E604B] text-white"
                    : isCompleted
                    ? "bg-[#1E604B] text-white"
                    : "bg-[#f4f4f4] text-gray-400"
                }`}
              >
                {isCompleted ? <MdCheck size={14} /> : step.id}
              </div>
              <span
                className={`text-[13px] sm:text-[14px] font-medium ${
                  isActive || isCompleted ? "text-[#1E604B]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddNewPlaceSidebar;