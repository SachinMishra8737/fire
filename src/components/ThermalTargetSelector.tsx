import React from 'react';
import { ThermalEvent } from '../types';
import { Crosshair, ChevronRight } from 'lucide-react';

interface ThermalTargetSelectorProps {
  events: ThermalEvent[];
  selectedEventId: string;
  onSelectEvent: (event: ThermalEvent) => void;
  filterPriority: string | null;
  onClearFilter?: () => void;
}

export const ThermalTargetSelector: React.FC<ThermalTargetSelectorProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  filterPriority,
  onClearFilter,
}) => {
  return (
    <section className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-sm">
      {/* Header with Title & Filter indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#ded4be]">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-[#c05928]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3d3326] font-sans-clean">
            Select Thermal Target
          </h2>
          <span className="text-[11px] text-[#786b57]">
            (Choose a satellite hotspot to inspect)
          </span>
        </div>

        {filterPriority && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6d604c]">Filtered by: <strong className="text-[#c05928]">{filterPriority}</strong></span>
            {onClearFilter && (
              <button
                onClick={onClearFilter}
                className="text-xs text-[#c05928] hover:underline font-semibold cursor-pointer"
              >
                Reset filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid of 7 Targets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {events.map((e) => {
          const isSelected = selectedEventId === e.id;
          const isUnknown = e.likelySource === 'UNKNOWN' || e.investigationPriority === 'UNKNOWN';

          // Color accents according to priority
          let badgeClass = 'bg-[#f0e7d3] text-[#71644f] border-[#d8ccb2]';
          let indicatorDot = 'bg-[#8c7e68]';
          if (e.investigationPriority === 'HIGH') {
            badgeClass = 'bg-[#fbe8e8] text-[#991b1b] border-[#f5c6c6]';
            indicatorDot = 'bg-[#dc2626]';
          } else if (e.investigationPriority === 'MEDIUM') {
            badgeClass = 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
            indicatorDot = 'bg-[#d97706]';
          } else if (e.investigationPriority === 'LOW') {
            badgeClass = 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]';
            indicatorDot = 'bg-[#16a34a]';
          }

          return (
            <button
              key={e.id}
              id={`target-card-${e.id}`}
              onClick={() => onSelectEvent(e)}
              className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ffffff] border-[#c05928] ring-2 ring-[#c05928]/30 shadow-md transform -translate-y-0.5'
                  : 'bg-[#faf6ed] border-[#dbd0b7] hover:border-[#c4b699] hover:bg-[#ffffff] text-[#332b21]'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#1f1912] font-sans-clean">
                  {e.id}
                </span>
                <span className={`w-2 h-2 rounded-full ${indicatorDot}`} />
              </div>

              <div className="mt-1">
                <p className="text-[11px] font-medium text-[#5c503e] truncate" title={e.facilityName || e.state}>
                  {e.facilityName || e.state}
                </p>
                <p className="text-[10px] text-[#857864] truncate">
                  {e.state}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#ede4cf] flex items-center justify-between text-[10px]">
                <span className={`px-1.5 py-0.5 rounded border text-[9.5px] font-semibold ${badgeClass}`}>
                  {isUnknown ? 'Unknown' : e.investigationPriority}
                </span>
                <span className="text-[#6b5f4c] font-medium font-mono text-[10px]">
                  {e.brightnessTempK}K
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
