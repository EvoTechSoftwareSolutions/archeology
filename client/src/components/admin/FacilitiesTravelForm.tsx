import React, { useState } from "react";
import FormField from "../common/FormField";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export interface FacilitiesTravelFormValue {
  nearbyHotels: string;
  nearbyHospitals: string;
  nearbyRestaurant: string;
  nearbyFuel: string;
  nearbyWashrooms: string;
  nearbyBusStops: string;
  nearbyParking: string;
  nearbyRailway: string;
  emergencyPolice: string;
  emergencyAmbulance: string;
  crowd: string;
  distance: string;
  drivingTime: string;
  walkingTime: string;
  recommendedDeparture: string;
  weather: string;
  temperature: string;
  photographyTime: string;
  openingHours: string;
  earlyMorningSlot: string;
  midDaySlot: string;
  lateAfternoonSlot: string;
  visitNote: string;
  contactAddress: string;
  contactAdminPhone: string;
  contactEmergencyPhone: string;
  contactWebsite: string;
  contactEmail: string;
  travelTips: string;
  dressCode: string;
  photographyRules: string;
  accessibility: string;
  dosText: string;
  dontsText: string;
  timelineJson: string;
}

interface FacilitiesTravelFormProps {
  value: FacilitiesTravelFormValue;
  onChange: <K extends keyof FacilitiesTravelFormValue>(
    field: K,
    val: FacilitiesTravelFormValue[K]
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

const FacilitiesTravelForm: React.FC<FacilitiesTravelFormProps> = ({
  value,
  onChange,
  onBack,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<
    "smart" | "essentials" | "hoursContact" | "timeline" | "etiquette"
  >("smart");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col h-full w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold font-serif text-gray-900 tracking-tight">
            Facilities, Travel & Dynamic Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure place-specific details for Smart Travel Assistant, Opening Hours, Contacts, Timeline, and Etiquette.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
        {[
          { id: "smart", label: "Smart Assistant" },
          { id: "essentials", label: "Essentials & Contacts" },
          { id: "hoursContact", label: "Opening Hours & Contact" },
          { id: "timeline", label: "Historical Timeline" },
          { id: "etiquette", label: "Tips & Etiquette" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1E604B] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 flex-1">
        {/* Tab 1: Smart Assistant */}
        {activeTab === "smart" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">
              Smart Travel Assistant Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Crowd Status
                </label>
                <input
                  type="text"
                  placeholder="e.g. Moderate Crowd"
                  value={value.crowd}
                  onChange={(e) => onChange("crowd", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Distance (from Colombo)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 170 KM"
                  value={value.distance}
                  onChange={(e) => onChange("distance", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Driving Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 HR 10 MIN"
                  value={value.drivingTime}
                  onChange={(e) => onChange("drivingTime", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Walking Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 35 HR"
                  value={value.walkingTime}
                  onChange={(e) => onChange("walkingTime", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Recommended Departure
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6:30 AM"
                  value={value.recommendedDeparture}
                  onChange={(e) => onChange("recommendedDeparture", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Weather
                </label>
                <input
                  type="text"
                  placeholder="e.g. SUNNY"
                  value={value.weather}
                  onChange={(e) => onChange("weather", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="text"
                  placeholder="e.g. 28°C"
                  value={value.temperature}
                  onChange={(e) => onChange("temperature", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Best Photography Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5:30 PM"
                  value={value.photographyTime}
                  onChange={(e) => onChange("photographyTime", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Essentials & Emergency Contacts */}
        {activeTab === "essentials" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">
              Nearby Essentials & Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Restaurants & Dining
                </label>
                <input
                  type="text"
                  placeholder="e.g. Local Cafes & Dining"
                  value={value.nearbyRestaurant}
                  onChange={(e) => onChange("nearbyRestaurant", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hotels & Rest Houses
                </label>
                <input
                  type="text"
                  placeholder="e.g. Heritage Rest Houses"
                  value={value.nearbyHotels}
                  onChange={(e) => onChange("nearbyHotels", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Fuel Stations
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Fuel Stations"
                  value={value.nearbyFuel}
                  onChange={(e) => onChange("nearbyFuel", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hospitals & Medical
                </label>
                <input
                  type="text"
                  placeholder="e.g. District General Hospital"
                  value={value.nearbyHospitals}
                  onChange={(e) => onChange("nearbyHospitals", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Washrooms & Facilities
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visitor Center Facilities"
                  value={value.nearbyWashrooms}
                  onChange={(e) => onChange("nearbyWashrooms", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Bus Stops
                </label>
                <input
                  type="text"
                  placeholder="e.g. Central Bus Stand"
                  value={value.nearbyBusStops}
                  onChange={(e) => onChange("nearbyBusStops", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Parking Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Public Visitor Parking"
                  value={value.nearbyParking}
                  onChange={(e) => onChange("nearbyParking", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Railway Station
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Railway Station"
                  value={value.nearbyRailway}
                  onChange={(e) => onChange("nearbyRailway", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Police Emergency Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. 119"
                  value={value.emergencyPolice}
                  onChange={(e) => onChange("emergencyPolice", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Ambulance Emergency Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1990"
                  value={value.emergencyAmbulance}
                  onChange={(e) => onChange("emergencyAmbulance", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Opening Hours & Contact Details */}
        {activeTab === "hoursContact" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">
              Opening Hours & Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g. Open Daily from 6.00AM to 6.00PM"
                  value={value.openingHours}
                  onChange={(e) => onChange("openingHours", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Early Morning Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6:00 AM – 8:30 AM"
                  value={value.earlyMorningSlot}
                  onChange={(e) => onChange("earlyMorningSlot", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mid-Day Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM – 1:00 PM"
                  value={value.midDaySlot}
                  onChange={(e) => onChange("midDaySlot", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Late Afternoon Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3:30 PM – 6:00 PM"
                  value={value.lateAfternoonSlot}
                  onChange={(e) => onChange("lateAfternoonSlot", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Visiting Note / Tour Info
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Special guided historical tours and light show displays are held during peak holiday seasons."
                value={value.visitNote}
                onChange={(e) => onChange("visitNote", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Galle, Southern, Sri Lanka"
                  value={value.contactAddress}
                  onChange={(e) => onChange("contactAddress", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Administration Division Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. +94 11 269 2840 (for prior appointments)"
                  value={value.contactAdminPhone}
                  onChange={(e) => onChange("contactAdminPhone", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. +94 70 156 4347"
                  value={value.contactEmergencyPhone}
                  onChange={(e) => onChange("contactEmergencyPhone", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Official Website
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.heritage.gov.lk"
                  value={value.contactWebsite}
                  onChange={(e) => onChange("contactWebsite", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Inquiries Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. info@heritage.gov.lk"
                  value={value.contactEmail}
                  onChange={(e) => onChange("contactEmail", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Timeline */}
        {activeTab === "timeline" && (() => {
          interface TimelineEventItem {
            year: string;
            title: string;
            text: string;
          }

          const events: TimelineEventItem[] = (() => {
            if (!value.timelineJson || !value.timelineJson.trim()) return [];
            try {
              const parsed = JSON.parse(value.timelineJson);
              if (Array.isArray(parsed)) {
                return parsed.map((item) => ({
                  year: String(item.year || ""),
                  title: String(item.title || ""),
                  text: String(item.text || ""),
                }));
              }
            } catch (e) {}
            return [];
          })();

          const handleUpdateEvents = (newEvents: TimelineEventItem[]) => {
            onChange("timelineJson", newEvents.length > 0 ? JSON.stringify(newEvents, null, 2) : "");
          };

          const handleAddEvent = () => {
            const updated = [...events, { year: "", title: "", text: "" }];
            handleUpdateEvents(updated);
          };

          const handleRemoveEvent = (index: number) => {
            const updated = events.filter((_, idx) => idx !== index);
            handleUpdateEvents(updated);
          };

          const handleFieldChange = (index: number, field: keyof TimelineEventItem, val: string) => {
            const updated = events.map((ev, idx) => {
              if (idx === index) {
                return { ...ev, [field]: val };
              }
              return ev;
            });
            handleUpdateEvents(updated);
          };

          const handleAddSamplePreset = () => {
            const preset: TimelineEventItem[] = [
              { year: "5th Century", title: "ANCIENT FOUNDATION", text: "Established during historic periods." },
              { year: "1687", title: "PRESERVED BY KINGDOMS", text: "Royal patrons contributed to site expansion." },
              { year: "1982", title: "UNESCO INSCRIPTION", text: "Recognized for global archaeological value." },
              { year: "TODAY", title: "CULTURAL LANDMARK", text: "Maintained as an active sanctuary and heritage monument." },
            ];
            handleUpdateEvents(preset);
          };

          return (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    Historical Timeline Events
                  </h3>
                  <p className="text-xs text-gray-500">
                    Add milestone events year-by-year using the input fields below.
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  {events.length === 0 && (
                    <button
                      type="button"
                      onClick={handleAddSamplePreset}
                      className="px-3 py-1.5 text-xs font-bold text-[#1E604B] border border-[#1E604B] rounded-md hover:bg-emerald-50 transition-colors whitespace-nowrap"
                    >
                      + Load Preset Events
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#1E604B] text-white rounded-md hover:bg-[#144b3a] transition-colors whitespace-nowrap"
                  >
                    <FiPlus size={14} /> Add Event
                  </button>
                </div>
              </div>

              {events.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-xs text-gray-500 mb-3">No timeline events added yet.</p>
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddSamplePreset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Load Sample Preset
                    </button>
                    <button
                      type="button"
                      onClick={handleAddEvent}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1E604B] border border-[#1E604B] rounded-md hover:bg-emerald-50 transition-colors"
                    >
                      <FiPlus size={14} /> Add First Event
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3 relative group"
                    >
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Milestone #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEvent(index)}
                          className="text-red-500 hover:text-red-700 p-1 text-xs flex items-center gap-1 font-semibold"
                          title="Delete Event"
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">
                            Year / Era
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 1687 or 5th Century"
                            value={event.year}
                            onChange={(e) => handleFieldChange(index, "year", e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">
                            Event Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. PRESERVED BY KINGDOMS"
                            value={event.title}
                            onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Royal patrons contributed to the site expansion and ongoing rituals."
                          value={event.text}
                          onChange={(e) => handleFieldChange(index, "text", e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* Tab 5: Travel Tips & Etiquette */}
        {activeTab === "etiquette" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">
              Travel Tips, Etiquette, Do's & Don'ts
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                General Travel Tips
              </label>
              <textarea
                rows={2}
                placeholder="Best time to visit, entry guidance..."
                value={value.travelTips}
                onChange={(e) => onChange("travelTips", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Dress Code
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Visitors are requested clothing should cover shoulders, arms, and knees when visiting sacred zones."
                value={value.dressCode}
                onChange={(e) => onChange("dressCode", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Photography Rules
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Photography allowed except inside designated inner sanctums or during sacred rituals."
                value={value.photographyRules}
                onChange={(e) => onChange("photographyRules", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Accessibility
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Ground-level monument grounds and walkways offer accessible routes."
                value={value.accessibility}
                onChange={(e) => onChange("accessibility", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Do's (One per line)
                </label>
                <textarea
                  rows={4}
                  placeholder={`Attend early morning hours for quiet surroundings\nVisit nearby site museums to understand history\nShoes must be removed at designated counters before entry`}
                  value={value.dosText}
                  onChange={(e) => onChange("dosText", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Don'ts (One per line)
                </label>
                <textarea
                  rows={4}
                  placeholder={`Do not wear shorts or sleeveless tops inside sacred grounds\nDo not pose with backs turned directly towards sacred statues`}
                  value={value.dontsText}
                  onChange={(e) => onChange("dontsText", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 sm:pt-8 mt-auto border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors py-2 sm:py-0 cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          Continue
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilitiesTravelForm;