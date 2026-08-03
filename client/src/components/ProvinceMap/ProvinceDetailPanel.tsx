import type { Province } from "../../types/province";
import Province3DView from "./Province3DView";

interface Props {
  province: Province | null;
  onClose: () => void;
}

const ProvinceDetailPanel = ({ province, onClose }: Props) => {
  return (
    <div
      className={`flex w-1/3 flex-shrink-0 flex-col items-center gap-3 px-4 transition-all duration-500 ease-out ${
        province
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-10 opacity-0"
      }`}
    >
      {province && (
        <>
          <div className="flex w-full items-center justify-between">
            <h2 className="font-serif text-2xl text-[#3B2F1E]">
              {province.name} Province
            </h2>
            <button
              onClick={onClose}
              className="text-sm font-medium text-[#8A7550] hover:text-[#C1483F]"
            >
              ✕ Close
            </button>
          </div>

          <Province3DView province={province} />
        </>
      )}
    </div>
  );
};

export default ProvinceDetailPanel;
