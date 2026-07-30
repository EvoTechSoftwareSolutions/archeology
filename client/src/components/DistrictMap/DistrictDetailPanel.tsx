import type { District } from "../../types/district";
import District3DView from "./District3DView";

interface Props {
  district: District | null;
  onClose: () => void;
}

const DistrictDetailPanel = ({ district, onClose }: Props) => {
  return (
    <div
      className={`flex w-[400px]  flex-shrink-0 flex-col items-center gap-3 px-2 transition-all duration-500 ease-out ${
        district
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-10 opacity-0"
      }`}
    >
      {district && (
        <>
          <div className="flex w-full items-center justify-between">
            <h2 className="font-serif text-2xl text-[#3B2F1E]">
              {district.name} District
            </h2>
            <button
              onClick={onClose}
              className="text-sm font-medium text-[#8A7550] hover:text-[#C1483F]"
            >
              ✕ Close
            </button>
          </div>

          <District3DView district={district} />
        </>
      )}
    </div>
  );
};

export default DistrictDetailPanel;