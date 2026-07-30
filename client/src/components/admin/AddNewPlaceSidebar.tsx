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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full lg:w-[260px]">
      <ul className="flex flex-col gap-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <li
              key={step.id}
              className={`flex items-center gap-4 p-2 rounded-full transition-colors ${
                isActive ? "bg-[#e8efec]" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${
                  isActive
                    ? "bg-[#1E604B] text-white"
                    : isCompleted
                    ? "bg-[#1E604B] text-white"
                    : "bg-[#f4f4f4] text-gray-400"
                }`}
              >
                {isCompleted ? <MdCheck size={16} /> : step.id}
              </div>
              <span
                className={`text-[14px] font-medium ${
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
