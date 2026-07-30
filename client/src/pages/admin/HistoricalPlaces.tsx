import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiDownload,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { getHistoricalPlaces } from "../../services/historicalPlace.service";
import dalada from "../../assets/Admin/daladamaligawa.png";
import sigiriya from "../../assets/Admin/LoginImage.png";

interface Place {
  id: number;
  name: string;
  district: string;
  province: string;
  era: string;
  status: string;
  date: string;
  image: string;
}



const ITEMS_PER_PAGE = 7;

const HistoricalPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("All Provinces");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Action menu
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    province: "Central",
    era: "",
    status: "Draft",
  });

  // View detail modal
  const [viewingPlace, setViewingPlace] = useState<Place | null>(null);

  // ─── Derived data ────────────────────────────────────────────────────

  //from db
  const loadHistoricalPlaces = async () => {
    try {
      setLoading(true);

      const response = await getHistoricalPlaces();

      const mappedPlaces = response.items.map((place: any) => ({
        id: place.id,

        name: place.name,

        district: place.district?.name ?? "Unknown",

        province: place.district?.province?.name ?? "Unknown",

        era: place.century ?? "-",

        status: place.statusFlag,

        date: new Date(place.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        image: place.image ?? sigiriya,
      }));

      setPlaces(mappedPlaces);
    } catch (error) {
      console.error("Failed to fetch places", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoricalPlaces();
  }, []);

  const provinces = useMemo(() => {
    const set = new Set(places.map((p) => p.province));
    return ["All Provinces", ...Array.from(set).sort()];
  }, [places]);

  const statuses = ["All Status", "Published", "In Review", "Draft"];

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvince =
        provinceFilter === "All Provinces" || p.province === provinceFilter;
      const matchesStatus =
        statusFilter === "All Status" || p.status === statusFilter;
      return matchesSearch && matchesProvince && matchesStatus;
    });
  }, [places, searchTerm, provinceFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };
  const handleProvinceChange = (val: string) => {
    setProvinceFilter(val);
    setCurrentPage(1);
  };
  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  // ─── Selection ───────────────────────────────────────────────────────

  const allPageSelected =
    paged.length > 0 && paged.every((p) => selectedIds.has(p.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        paged.forEach((p) => next.delete(p.id));
      } else {
        paged.forEach((p) => next.add(p.id));
      }
      return next;
    });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── Actions ─────────────────────────────────────────────────────────

  const handleOpenModal = (place: Place | null = null) => {
    setOpenMenuId(null);
    if (place) {
      setEditingPlace(place);
      setFormData({
        name: place.name,
        district: place.district,
        province: place.province,
        era: place.era,
        status: place.status,
      });
    } else {
      setEditingPlace(null);
      setFormData({
        name: "",
        district: "",
        province: "Central",
        era: "",
        status: "Draft",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlace(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlace) {
      setPlaces(
        places.map((p) =>
          p.id === editingPlace.id ? { ...p, ...formData } : p,
        ),
      );
    } else {
      const newId = Math.max(0, ...places.map((p) => p.id)) + 1;
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setPlaces([
        ...places,
        { id: newId, ...formData, date: dateStr, image: sigiriya },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setOpenMenuId(null);
    if (window.confirm("Are you sure you want to delete this place?")) {
      setPlaces(places.filter((p) => p.id !== id));
      setSelectedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Delete ${selectedIds.size} selected place(s)?`)) {
      setPlaces(places.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
    }
  };

  const handleView = (place: Place) => {
    setOpenMenuId(null);
    setViewingPlace(place);
  };

  // ─── CSV Export ──────────────────────────────────────────────────────

  const handleExportCSV = () => {
    const rows = [
      ["Name", "District", "Province", "Era", "Status", "Date"],
      ...filtered.map((p) => [
        p.name,
        p.district,
        p.province,
        p.era,
        p.status,
        p.date,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historical_places.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Status Badge ───────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
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

  // ─── Render ─────────────────────────────────────────────────────────

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
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiTrash2 size={14} /> Delete ({selectedIds.size})
            </button>
          )}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            Export CSV <FiDownload />
          </button>
          <Link
            to="/admin/add-place" // Replace with your actual route path
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#275949] rounded-lg text-sm font-semibold text-white hover:bg-[#1E4538] transition-colors shadow-sm"
          >
            <FiPlus size={16} /> Add New Place
          </Link>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search places, districts..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#275949] focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter']"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-44">
              <select
                value={provinceFilter}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer"
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <FiChevronDown />
              </div>
            </div>

            <div className="relative w-full sm:w-36">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
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
                  {selectedIds.size > 0
                    ? `${selectedIds.size} selected`
                    : "Select all places"}
                </th>
                <th className="py-4 px-4 font-bold text-gray-900">Province</th>
                <th className="py-4 px-4 font-bold text-gray-900">Era</th>
                <th className="py-4 px-4 font-bold text-gray-900">Status</th>
                <th className="py-4 px-4 font-bold text-gray-900">Date</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {
loading ? (

<tr>
<td colSpan={7}
className="text-center py-10">
Loading...
</td>
</tr>

):(

paged.map((place)=>(
                <tr
                  key={place.id}
                  className={`hover:bg-gray-50 transition-colors ${selectedIds.has(place.id) ? "bg-[#275949]/[0.03]" : "bg-white"}`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(place.id)}
                      onChange={() => toggleSelect(place.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#275949] focus:ring-[#275949] cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px]">
                          {place.name}
                        </h3>
                        <p className="text-gray-500 text-[13px]">
                          {place.district}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {place.province}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {place.era}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(place.status)}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {place.date}
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === place.id ? null : place.id)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiMoreHorizontal size={20} />
                    </button>

                    {openMenuId === place.id && (
                      <div className="absolute right-6 top-12 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1 overflow-hidden">
                        <button
                          onClick={() => handleView(place)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiEye size={14} /> View
                        </button>
                        <button
                          onClick={() => handleOpenModal(place)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiEdit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(place.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )))}

              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
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
            Showing{" "}
            {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length}
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(safePage - 1)}
              className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                safePage <= 1
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 bg-[#F3F4F6] hover:bg-gray-200"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${
                  page === safePage
                    ? "bg-[#275949] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(safePage + 1)}
              className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                safePage >= totalPages
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 bg-white hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#2a2a2a]">
                {editingPlace ? "Edit Place" : "Add New Place"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
                    placeholder="e.g. Sigiriya Rock Fortress"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
                    placeholder="e.g. Matale District"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800 appearance-none cursor-pointer"
                    >
                      <option>Central</option>
                      <option>North Central</option>
                      <option>Southern</option>
                      <option>Western</option>
                      <option>North Western</option>
                      <option>Uva</option>
                      <option>Sabaragamuwa</option>
                      <option>Eastern</option>
                      <option>Northern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Era
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.era}
                      onChange={(e) =>
                        setFormData({ ...formData, era: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
                      placeholder="e.g. Anuradhapura"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800 appearance-none cursor-pointer"
                  >
                    <option>Draft</option>
                    <option>In Review</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex gap-3 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#275949] hover:bg-[#1E4538] text-white font-medium shadow-sm transition-colors text-sm"
                >
                  {editingPlace ? "Save Changes" : "Add Place"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── View Detail Modal ─────────────────────────────────────────── */}
      {viewingPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={() => setViewingPlace(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={viewingPlace.image}
                alt={viewingPlace.name}
                className="w-full h-full object-cover"
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
                {viewingPlace.district}
              </p>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Province</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {viewingPlace.province}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Era</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {viewingPlace.era}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Status</span>
                  <div className="mt-1">
                    {getStatusBadge(viewingPlace.status)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Date Added</span>
                  <p className="text-gray-800 font-semibold mt-0.5">
                    {viewingPlace.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalPlaces;
