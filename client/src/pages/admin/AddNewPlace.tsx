import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import AddNewPlaceSidebar from "../../components/admin/AddNewPlaceSidebar";
import BasicInformationForm from "../../components/admin/BasicInformationForm";
import MediaForm from "../../components/admin/MediaForm";
import FacilitiesTravelForm from "../../components/admin/FacilitiesTravelForm";
import SEOForm from "../../components/admin/SEOForm";

const AddNewPlace = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col pt-4 min-h-[calc(100vh-100px)]">
      {/* Header section */}
      <div className="mb-10">
        <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
          <span>Home</span>
          <span>&gt;</span>
          <span>Historical places</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Add new</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-1 tracking-tight">Add New Place</h1>
            <p className="text-gray-500 text-[14px]">Create a new heritage site listing.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-50 font-bold text-[14px] transition-colors">
              Save Draft
              <MdOutlineFileDownload size={18} />
            </button>
            <button className="px-8 py-2.5 rounded-md bg-[#1E604B] text-white font-bold text-[14px] hover:bg-[#144b3a] transition-colors shadow-sm">
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 items-start pb-8">
        {/* Left Sidebar Steps */}
        <div className="shrink-0 w-full lg:w-[260px] sticky top-4">
          <AddNewPlaceSidebar currentStep={currentStep} />
        </div>
        
        {/* Right Form Content */}
        <div className="flex-1 w-full min-w-0 flex flex-col h-full">
          {currentStep === 1 && <BasicInformationForm onNext={handleNext} />}
          {currentStep === 2 && <MediaForm onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <FacilitiesTravelForm onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <SEOForm onNext={handleNext} onBack={handleBack} />}
        </div>
      </div>
    </div>
  );
};

export default AddNewPlace;
