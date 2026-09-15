import React from 'react';
import { ThermalEvent } from '../types';
import { Layers, CheckCircle2, ShieldAlert, HelpCircle } from 'lucide-react';

interface EventSummaryCardsProps {
  events: ThermalEvent[];
  filterPriority: string | null;
  onFilterChange: (priority: string | null) => void;
}

export const EventSummaryCards: React.FC<EventSummaryCardsProps> = ({
  events,
  filterPriority,
  onFilterChange,
}) => {
  const totalEvents = events.length;
  const highCount = events.filter((e) => e.investigationPriority === 'HIGH').length;
  const attributedCount = events.filter((e) => e.likelySource !== 'UNKNOWN' && e.investigationPriority !== 'UNKNOWN').length;
  const reviewCount = events.filter((e) => e.likelySource === 'UNKNOWN' || e.investigationPriority === 'UNKNOWN').length;

  return (
    <section className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#ded4be]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#c05928]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3d3326] font-sans-clean">
            Event Summary &amp; Classification Metrics
          </h2>
        </div>
        <p className="text-xs text-[#786b57]">
          Click any metric below to filter active observations
        </p>
      </div>

      {/* 4 Clean Metric Boxes matching Screenshot 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Thermal Events */}
        <button
          onClick={() => onFilterChange(null)}
          className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterPriority === null
              ? 'bg-[#ffffff] border-[#c05928] shadow-sm ring-1 ring-[#c05928]/30'
              : 'bg-[#faf6ed] border-[#dbd0b7] hover:border-[#c4b699] hover:bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#635541]">
              Thermal Events
            </span>
            <Layers className="w-4 h-4 text-[#786a55]" />
          </div>
          <div className="mt-2">
            <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#1f1912]">
              {totalEvents}
            </span>
            <p className="text-[11px] text-[#786b57] mt-0.5">
              NASA FIRMS VIIRS hotspots
            </p>
          </div>
        </button>

        {/* Metric 2: Source Attributed */}
        <button
          onClick={() => onFilterChange(filterPriority === 'LOW' ? null : 'LOW')}
          className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterPriority === 'LOW'
              ? 'bg-[#ffffff] border-[#166534] shadow-sm ring-1 ring-[#166534]/30'
              : 'bg-[#faf6ed] border-[#dbd0b7] hover:border-[#c4b699] hover:bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#635541]">
              Source Attributed
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
          </div>
          <div className="mt-2">
            <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#166534]">
              {attributedCount}
            </span>
            <p className="text-[11px] text-[#786b57] mt-0.5">
              Corroborated industrial context
            </p>
          </div>
        </button>

        {/* Metric 3: High Priority */}
        <button
          onClick={() => onFilterChange(filterPriority === 'HIGH' ? null : 'HIGH')}
          className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterPriority === 'HIGH'
              ? 'bg-[#ffffff] border-[#dc2626] shadow-sm ring-1 ring-[#dc2626]/30'
              : 'bg-[#faf6ed] border-[#dbd0b7] hover:border-[#c4b699] hover:bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#991b1b]">
              High Priority
            </span>
            <ShieldAlert className="w-4 h-4 text-[#dc2626]" />
          </div>
          <div className="mt-2">
            <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#991b1b]">
              {highCount}
            </span>
            <p className="text-[11px] text-[#991b1b]/80 mt-0.5">
              Requires immediate inspection
            </p>
          </div>
        </button>

        {/* Metric 4: Requires Review */}
        <button
          onClick={() => onFilterChange(filterPriority === 'UNKNOWN' ? null : 'UNKNOWN')}
          className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterPriority === 'UNKNOWN'
              ? 'bg-[#ffffff] border-[#475569] shadow-sm ring-1 ring-[#475569]/30'
              : 'bg-[#faf6ed] border-[#dbd0b7] hover:border-[#c4b699] hover:bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#635541]">
              Requires Review
            </span>
            <HelpCircle className="w-4 h-4 text-[#64748b]" />
          </div>
          <div className="mt-2">
            <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#475569]">
              {reviewCount}
            </span>
            <p className="text-[11px] text-[#786b57] mt-0.5">
              Low satellite evidence / unverified
            </p>
          </div>
        </button>
      </div>
    </section>
  );
};
