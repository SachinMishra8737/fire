import React, { useState } from 'react';
import {
  Flame,
  AlertTriangle,
  CheckCircle2,
  Database,
  ArrowRight,
  Filter,
  Eye,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ThermalEvent, PriorityLevel, AppPage } from '../../types';
import { IndiaMapVisualization } from '../IndiaMapVisualization';

interface DashboardPageProps {
  events: ThermalEvent[];
  selectedEvent: ThermalEvent;
  onSelectEvent: (event: ThermalEvent) => void;
  onNavigate: (page: AppPage) => void;
  onViewEventDetails: (event: ThermalEvent) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onNavigate,
  onViewEventDetails,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterTimeframe, setFilterTimeframe] = useState<string>('24H');
  const [filterState, setFilterState] = useState<string>('ALL');

  // Filter events according to dropdown selections
  const filteredEvents = events.filter((e) => {
    if (filterSeverity !== 'ALL' && e.investigationPriority !== filterSeverity) return false;
    if (filterState !== 'ALL' && e.state !== filterState) return false;
    return true;
  });

  const uniqueStates = Array.from(new Set(events.map((e) => e.state)));

  const timelineSteps = [
    { time: '08:10 IST', label: 'Thermal anomaly detected', detail: 'VIIRS Suomi-NPP 375m I-Band pass' },
    { time: '08:12 IST', label: 'Spatial event constructed', detail: 'Cluster radius calculated, FRP aggregated' },
    { time: '08:14 IST', label: 'Context enrichment completed', detail: 'Land-use & 5 km facility buffer fused' },
    { time: '08:15 IST', label: 'Attribution generated', detail: 'Industrial vs agricultural probability ranked' },
    { time: '08:16 IST', label: 'Investigation priority assigned', detail: 'Triage score: 84/100 (HIGH priority)' },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Top Metric Cards from User Specification */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Thermal Events */}
        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs">
          <div className="flex items-center justify-between text-[#736551]">
            <span className="text-xs font-bold uppercase">
              THERMAL EVENTS
            </span>
            <Flame className="w-4 h-4 text-[#c05928]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#1c1813]">
              128
            </span>
            <span className="text-xs font-semibold text-[#16a34a]">+12 today</span>
          </div>
          <p className="text-[11px] text-[#786b57] mt-1">
            NASA FIRMS VIIRS &amp; MODIS observations
          </p>
        </div>

        {/* Card 2: High Priority */}
        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs">
          <div className="flex items-center justify-between text-[#736551]">
            <span className="text-xs font-bold uppercase">
              HIGH PRIORITY
            </span>
            <AlertTriangle className="w-4 h-4 text-[#dc2626]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#dc2626]">
              07
            </span>
            <span className="text-xs font-semibold text-[#b91c1c] bg-[#fbe8e8] px-2 py-0.5 rounded-full">
              ⚠ Attention Required
            </span>
          </div>
          <p className="text-[11px] text-[#786b57] mt-1">
            Industrial buffer or radiance breach
          </p>
        </div>

        {/* Card 3: Attributed */}
        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs">
          <div className="flex items-center justify-between text-[#736551]">
            <span className="text-xs font-bold uppercase">
              ATTRIBUTED
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#1c1813]">
              91%
            </span>
            <span className="text-xs font-semibold text-[#166534]">High Confidence</span>
          </div>
          <p className="text-[11px] text-[#786b57] mt-1">
            Contextual fusion source asserted
          </p>
        </div>

        {/* Card 4: Data Sources */}
        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs">
          <div className="flex items-center justify-between text-[#736551]">
            <span className="text-xs font-bold uppercase">
              DATA SOURCES
            </span>
            <Database className="w-4 h-4 text-[#473a2a]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#1c1813]">
              04
            </span>
            <span className="text-xs font-semibold text-[#16a34a]">Operational</span>
          </div>
          <p className="text-[11px] text-[#786b57] mt-1">
            FIRMS, Weather, GIS, Sentinel-2
          </p>
        </div>
      </div>

      {/* Center Section: India Map with Top Filters & Side Severity */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Map Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#ded4be]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1c1813]">
              Satellite-Observed Thermal Events
            </h2>
            <p className="text-xs text-[#6e604c] mt-0.5">
              Select any hotspot marker on the historical India reference sheet to review its contextual evidence.
            </p>
          </div>

          {/* Interactive Filters matching prompt */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs">
              <Filter className="w-3.5 h-3.5 text-[#736551]" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#1c1813] focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs">
              <select
                value={filterTimeframe}
                onChange={(e) => setFilterTimeframe(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#1c1813] focus:outline-none cursor-pointer"
              >
                <option value="24H">Last 24 Hours</option>
                <option value="48H">Last 48 Hours</option>
                <option value="7D">Last 7 Days</option>
              </select>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#1c1813] focus:outline-none cursor-pointer"
              >
                <option value="ALL">All States</option>
                {uniqueStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map Grid & Side Severity Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main India Map */}
          <div className="lg:col-span-8 min-h-[460px]">
            <IndiaMapVisualization
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onSelectEvent={onSelectEvent}
              isAnalyzing={false}
            />
          </div>

          {/* Right Side: Event Severity Legend & Quick Target Inspector */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            {/* Severity Legend */}
            <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs">
              <h3 className="text-xs font-bold uppercase text-[#3d3121] mb-3 pb-2 border-b border-[#ded4be]">
                EVENT SEVERITY
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#dc2626]" />
                    <span className="font-semibold text-[#1c1813]">Critical</span>
                  </div>
                  <span className="text-[#dc2626] font-bold">1 event (EVT-1040)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ea580c]" />
                    <span className="font-semibold text-[#1c1813]">High Priority</span>
                  </div>
                  <span className="text-[#c05928] font-bold">2 events (EVT-1042)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#d97706]" />
                    <span className="font-semibold text-[#1c1813]">Medium</span>
                  </div>
                  <span className="text-[#92400e] font-bold">2 events</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#16a34a]" />
                    <span className="font-semibold text-[#1c1813]">Low / Controlled</span>
                  </div>
                  <span className="text-[#166534] font-bold">1 event</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#64748b]" />
                    <span className="font-semibold text-[#1c1813]">Requires Review</span>
                  </div>
                  <span className="text-[#475569] font-bold">1 event (EVT-1044)</span>
                </div>
              </div>
            </div>

            {/* Active Selected Card Preview */}
            <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-2xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#736551]">
                    Selected On Map
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedEvent.investigationPriority === 'CRITICAL'
                        ? 'bg-[#fbe8e8] text-[#991b1b]'
                        : selectedEvent.investigationPriority === 'HIGH'
                        ? 'bg-[#fde8dc] text-[#c05928]'
                        : 'bg-[#fef3c7] text-[#92400e]'
                    }`}
                  >
                    {selectedEvent.investigationPriority} PRIORITY
                  </span>
                </div>

                <h4 className="text-lg font-bold text-[#1c1813]">
                  {selectedEvent.name}
                </h4>
                <div className="text-xs text-[#736551] mt-0.5">
                  ID: {selectedEvent.id} · {selectedEvent.state}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#544634] p-2.5 rounded-xl bg-[#ede4cf] border border-[#ded4be]">
                  <div>FRP: <strong className="text-[#c05928]">{selectedEvent.frpMw} MW</strong></div>
                  <div>Temp: <strong className="text-[#1c1813]">{selectedEvent.brightnessTempK} K</strong></div>
                  <div>Facility: <span className="font-medium">{selectedEvent.spatialContext.distanceKm} km</span></div>
                  <div>Confidence: <strong className="text-[#166534]">{Math.round(selectedEvent.confidence * 100)}%</strong></div>
                </div>
              </div>

              <button
                onClick={() => onViewEventDetails(selectedEvent)}
                id="btn-inspect-selected"
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN EVENT ANALYSIS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Bottom Section: Event Timeline (Left) & Recent Events (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Event Timeline */}
        <div className="lg:col-span-5 bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-[#ded4be]">
            <Clock className="w-4 h-4 text-[#c05928]" />
            <h3 className="text-xs font-bold uppercase text-[#3d3121]">
              EVENT TIMELINE
            </h3>
          </div>

          <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#d5cca5]">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-[#ede4cf] border-2 border-[#c05928]" />
                <div className="text-[11px] font-bold text-[#c05928]">
                  {step.time}
                </div>
                <div className="text-xs font-bold text-[#1c1813] mt-0.5">
                  {step.label}
                </div>
                <div className="text-[11px] text-[#736551] mt-0.5">
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Events Table */}
        <div className="lg:col-span-7 bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#ded4be]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c05928]" />
                <h3 className="text-xs font-bold uppercase text-[#3d3121]">
                  RECENT EVENTS
                </h3>
              </div>
              <button
                onClick={() => onNavigate('events')}
                className="text-xs text-[#c05928] hover:underline font-semibold cursor-pointer"
              >
                View Database ({events.length}) →
              </button>
            </div>

            <div className="divide-y divide-[#ded4be]">
              {events.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#ede4cf]/50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#1c1813]">
                      {evt.id}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#1c1813]">
                        {evt.name}
                      </div>
                      <div className="text-[11px] text-[#736551]">
                        {evt.state} · FRP: <strong className="text-[#c05928]">{evt.frpMw} MW</strong> · Conf: {Math.round(evt.confidence * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        evt.investigationPriority === 'CRITICAL'
                          ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                          : evt.investigationPriority === 'HIGH'
                          ? 'bg-[#fde8dc] text-[#c05928] border border-[#f5bba3]'
                          : evt.investigationPriority === 'MEDIUM'
                          ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                          : 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      }`}
                    >
                      {evt.investigationPriority}
                    </span>

                    <button
                      onClick={() => onViewEventDetails(evt)}
                      id={`btn-view-${evt.id}`}
                      className="px-2.5 py-1 rounded-lg bg-[#ede4cf] hover:bg-[#c05928] hover:text-white border border-[#d5cca5] text-xs font-semibold text-[#473a2a] transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>VIEW</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#ded4be] flex items-center justify-between text-[11px] text-[#786b57]">
            <span>Last pass: VIIRS Suomi-NPP at 08:10 IST</span>
            <button
              onClick={() => onNavigate('live-monitor')}
              className="text-[#c05928] hover:underline font-semibold"
            >
              Open Live Monitor →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
