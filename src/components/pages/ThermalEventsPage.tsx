import React, { useState } from 'react';
import {
  Flame,
  Search,
  Filter,
  Eye,
  ArrowUpDown,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { ThermalEvent, PriorityLevel } from '../../types';

interface ThermalEventsPageProps {
  events: ThermalEvent[];
  onViewEvent: (event: ThermalEvent) => void;
}

export const ThermalEventsPage: React.FC<ThermalEventsPageProps> = ({
  events,
  onViewEvent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('TODAY');

  const uniqueStates = Array.from(new Set(events.map((e) => e.state)));

  const filteredEvents = events.filter((e) => {
    if (
      searchTerm &&
      !e.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !e.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !e.state.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (stateFilter !== 'ALL' && e.state !== stateFilter) return false;
    if (severityFilter !== 'ALL' && e.investigationPriority !== severityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#ded4be]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813]">
              THERMAL EVENTS DATABASE
            </h1>
            <p className="text-xs text-[#736551] mt-0.5">
              Filterable index of NASA FIRMS VIIRS &amp; MODIS satellite-observed hotspots across India.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#c05928] bg-[#ede4cf] border border-[#d5cca5] px-3 py-1.5 rounded-xl shadow-2xs">
              Showing {filteredEvents.length} of {events.length} events
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a7b66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Event ID or facility..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs"
            />
          </div>

          {/* State Filter */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs font-medium text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs cursor-pointer"
            >
              <option value="ALL">All States (India)</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs font-medium text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
              <option value="UNKNOWN">Requires Review</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs font-medium text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs cursor-pointer"
            >
              <option value="TODAY">15 Sep 2026 (Today)</option>
              <option value="YESTERDAY">14 Sep 2026</option>
              <option value="WEEK">Last 7 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Events Table */}
      <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#ede4cf] border-b border-[#ded4be] text-[#544634] font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Location / Facility</th>
                <th className="py-3 px-4">Obs. Date</th>
                <th className="py-3 px-4">FRP</th>
                <th className="py-3 px-4">Sensor Conf</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ded4be]">
              {filteredEvents.map((evt) => (
                <tr
                  key={evt.id}
                  className="hover:bg-[#ede4cf]/50 transition-colors group cursor-pointer"
                  onClick={() => onViewEvent(evt)}
                >
                  <td className="py-3 px-4 font-bold text-[#1c1813]">
                    {evt.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#1c1813]">{evt.name}</div>
                    <div className="text-[11px] text-[#736551]">
                      {evt.state} · ({evt.lat.toFixed(2)}°N, {evt.lng.toFixed(2)}°E)
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#544634] whitespace-nowrap">
                    15 Sep 2026 <span className="text-[10px] text-[#8c7e68] block">{evt.detectionTimeIst}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#c05928]">{evt.frpMw} MW</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#166534]">
                        {Math.round(evt.confidence * 100)}%
                      </span>
                      <span className="text-[10px] text-[#8c7e68]">({evt.sensor.split(' ')[0]})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        evt.investigationPriority === 'CRITICAL'
                          ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                          : evt.investigationPriority === 'HIGH'
                          ? 'bg-[#fde8dc] text-[#c05928] border border-[#f5bba3]'
                          : evt.investigationPriority === 'MEDIUM'
                          ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                          : evt.investigationPriority === 'LOW'
                          ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                          : 'bg-[#ede4cf] text-[#475569] border border-[#cbd5e1]'
                      }`}
                    >
                      {evt.investigationPriority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewEvent(evt);
                      }}
                      id={`btn-table-view-${evt.id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
