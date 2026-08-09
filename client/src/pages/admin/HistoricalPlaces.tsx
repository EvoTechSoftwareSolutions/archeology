import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiDownload,
  FiMoreHorizontal,
  FiEdit2,
  FiEye,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import sigiriya from "../../assets/Admin/LoginImage.png";
import { resolveImageUrl } from "../../utils/imageUtils";
import { districts as staticDistricts } from "../../data/districts";
import useHistoricalPlacesList from "../../hooks/useHistoricalPlacesList";
import { useSearchContext } from "../../contexts/SearchContext";
import type { HistoricalPlaceRecord } from "../../types/historicalPlace.types";

const HistoricalPlaces = () => {
  const {
    items,
    page,
    totalPages,
    setPage,
    search,
    setSearch,
    districtId,
    setDistrictId,
    statusFlag,
    setStatusFlag,
    isActive,
    setIsActive,
    selectedIds,
    toggleSelected,
    toggleSelectAll,
    isLoading,
    error,
    refresh,
    removeSelected,
    toggleActive,
    exportCsv,
  } = useHistoricalPlacesList();

  const { searchTerm, setSearchTerm } = useSearchContext();

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm, setSearch]);

  // Modal
  useState<HistoricalPlaceRecord | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    era: "",
    status: "Draft",
    image: "",
    latitude: 7.8731,
    longitude: 80.7718,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // View detail modal
  const [viewingPlace, setViewingPlace] =
    useState<HistoricalPlaceRecord | null>(null);

  const statuses = ["All Status", "Published", "In Review", "Draft"];

  // Helper to fetch district name
  const getDistrictName = (place: HistoricalPlaceRecord): string => {
    if (place.district?.name) return place.district.name;
    // Use Number() to prevent string vs number comparison error
    const found = staticDistricts.find(
      (d) => Number(d.id) === Number(place.districtId),
    );
    return found ? found.name : "Unknown District";
  };

  const handleToggleActive = async (id: number) => {
    await toggleActive(id);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} selected place(s)?`)) {
      await removeSelected();
    }
  };

  const handleView = (place: HistoricalPlaceRecord) => {
    setViewingPlace(place);
  };

  const allPageSelected =
    items.length > 0 && items.every((p) => selectedIds.includes(p.id));

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Published":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50/50 text-[11px] font-semibold text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
            Published
          </span>
        );
      case "In Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50/50 text-[11px] font-semibold text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>In
            Review
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50/50 text-[11px] font-semibold text-red-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-['Inter'] pb-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/admin" className="hover:text-gray-900">
          Home
        </Link>{" "}
        &gt; Historical places
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">
            Historical Places
          </h1>
          <p className="text-gray-500 text-sm">
            Manage catalogued heritage sites across Sri Lanka.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete ({selectedIds.length})
            </button>
          )}
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            Export CSV <FiDownload />
          </button>
          <Link
            to="/admin/add-place"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#275949] rounded-lg text-sm font-semibold text-white hover:bg-[#1E4538] transition-colors shadow-sm"
          >
            <FiPlus size={16} /> Add New Place
          </Link>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading && (
          <div className="p-6 text-sm text-gray-500">
            Loading heritage places from the database…
          </div>
        )}

        {error && (
          <div className="p-6 text-sm text-red-600 border-b border-red-100 bg-red-50">
            {error}
          </div>
        )}

        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search places, districts..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#275949] focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter']"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-44">
              <select
                value={districtId ?? ""}
                onChange={(e) =>
                  setDistrictId(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer"
              >
                <option value="">All Districts</option>

                {staticDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <FiChevronDown />
              </div>
            </div>

            <div className="relative w-full sm:w-40">
              <select
                value={isActive === null ? "" : isActive ? "true" : "false"}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setIsActive(null);
                  } else {
                    setIsActive(e.target.value === "true");
                  }
                }}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer"
              >
                <option value="">All Active Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-700 font-semibold bg-white">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#275949] focus:ring-[#275949] cursor-pointer"
                  />
                </th>
                <th className="py-4 px-2 whitespace-nowrap text-gray-500 font-medium">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : "Select all places"}
                </th>
                <th className="py-4 px-4 font-bold text-gray-900">District</th>
                <th className="py-4 px-4 font-bold text-gray-900">Era</th>
                <th className="py-4 px-4 font-bold text-gray-900">Status</th>
                <th className="py-4 px-4 font-bold text-gray-900">Date</th>
                <th className="py-4 px-4 font-bold text-gray-900">Active</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((place) => (
                <tr
                  key={place.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedIds.includes(place.id)
                      ? "bg-[#275949]/[0.03]"
                      : "bg-white"
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(place.id)}
                      onChange={() => toggleSelected(place.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#275949] focus:ring-[#275949] cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img
                          src={resolveImageUrl(place.image, sigiriya)}
                          alt={place.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = sigiriya;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px]">
                          {place.name}
                        </h3>
                        <p className="text-gray-500 text-[13px]">
                          {getDistrictName(place)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {getDistrictName(place)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {place.century ?? "Unknown"}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(place.statusFlag)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {place.createdAt
                      ? new Date(place.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    {/* Active / Inactive toggle */}
                    <button
                      onClick={() => handleToggleActive(place.id)}
                      role="switch"
                      aria-checked={place.isActive}
                      title={
                        place.isActive
                          ? "Active — click to deactivate"
                          : "Inactive — click to activate"
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        place.isActive ? "bg-[#275949]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          place.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/places/${place.id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                        title="View Public Details Page"
                      >
                        <FiExternalLink size={12} />
                      </Link>

                      <button
                        onClick={() => handleView(place)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                        title="Quick View Modal"
                      >
                        <FiEye size={12} />
                      </button>

                      <Link
                        to={`/admin/edit-place/${place.id}`}
                        className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition"
                        title="Edit"
                      >
                        <FiEdit2 size={12} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {items.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-16 text-gray-400 text-sm"
                  >
                    No places found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <div className="text-sm text-gray-500 font-medium">
            Page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                page <= 1
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 bg-[#F3F4F6] hover:bg-gray-200"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${
                  p === page
                    ? "bg-[#275949] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                page >= totalPages
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 bg-white hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={() => setViewingPlace(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={resolveImageUrl(viewingPlace.image, sigiriya)}
                alt={viewingPlace.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = sigiriya;
                }}
              />
              <button
                onClick={() => setViewingPlace(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#2a2a2a] mb-1">
                {viewingPlace.name}
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                {getDistrictName(viewingPlace)}
              </p>
              <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
                <div>
                  <span className="text-gray-400 font-medium">District</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {getDistrictName(viewingPlace)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Era</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {viewingPlace.century ?? "Unknown"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Status</span>
                  <div className="mt-1">
                    {getStatusBadge(viewingPlace.statusFlag)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Date Added</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {viewingPlace.createdAt
                      ? new Date(viewingPlace.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              <Link
                to={`/places/${viewingPlace.id}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#275949] text-white font-bold text-sm rounded-xl hover:bg-[#1E4538] transition-colors"
              >
                Open View Details Page <FiExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalPlaces;