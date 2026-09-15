import React, { useState } from 'react';
import { History, Calendar, ArrowUpDown, Layers, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { HISTORICAL_DAYS } from '../../data/demoEvents';

export const HistoricalEventsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7D' | '30D' | '1Y'>('7D');
  const [showCompareModal, setShowCompareModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ded4be]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813] flex items-center gap-2.5">
              <History className="w-6 h-6 text-[#c05928]" />
              HISTORICAL CONTEXT
            </h1>
            <p className="text-xs text-[#736551] mt-0.5">
              Multi-revisit longitudinal database establishing baseline recurrence patterns and thermal deviation envelopes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-3 py-2 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>COMPARE PERIOD</span>
            </button>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-2 pt-3">
          <button
            onClick={() => setSelectedPeriod('7D')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              selectedPeriod === '7D'
                ? 'bg-[#f7f2e5] border-[#c05928] text-[#c05928] shadow-2xs'
                : 'bg-[#ede4cf] border-[#d5cca5] text-[#544634]'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setSelectedPeriod('30D')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              selectedPeriod === '30D'
                ? 'bg-[#f7f2e5] border-[#c05928] text-[#c05928] shadow-2xs'
                : 'bg-[#ede4cf] border-[#d5cca5] text-[#544634]'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setSelectedPeriod('1Y')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              selectedPeriod === '1Y'
                ? 'bg-[#f7f2e5] border-[#c05928] text-[#c05928] shadow-2xs'
                : 'bg-[#ede4cf] border-[#d5cca5] text-[#544634]'
            }`}
          >
            Last 1 Year (Seasonal Cycle)
          </button>
        </div>
      </div>

      {/* Historical Records Table */}
      <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#ede4cf] border-b border-[#ded4be] text-[#544634] font-bold uppercase text-[11px]">
                <th className="py-3.5 px-4">DATE</th>
                <th className="py-3.5 px-4">THERMAL EVENTS</th>
                <th className="py-3.5 px-4">HIGH PRIORITY</th>
                <th className="py-3.5 px-4">CRITICAL</th>
                <th className="py-3.5 px-4">OPERATIONAL CONTEXT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ded4be]">
              {HISTORICAL_DAYS.map((row, i) => (
                <tr key={i} className="hover:bg-[#ede4cf] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1c1813]">
                    {row.date}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1c1813]">
                    {row.eventsCount} events
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fde8dc] text-[#c05928] border border-[#f5bba3]">
                      {row.highCount} high
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.criticalCount > 0
                          ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                          : 'bg-[#ede4cf] text-[#736551]'
                      }`}
                    >
                      {row.criticalCount} critical
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#544634]">
                    {row.statusSummary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compare Period Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ded4be] pb-3">
              <h3 className="text-xl font-bold text-[#1c1813]">
                Comparative Period Analysis
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-xs font-bold text-[#736551] hover:text-[#1c1813] cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#544634]">
              <p>
                Comparing <strong>Current Week (09-15 Sep)</strong> vs <strong>Prior Week (02-08 Sep)</strong>:
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#ede4cf] border border-[#ded4be]">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#736551]">Current Week</div>
                  <div className="text-2xl font-bold text-[#c05928]">75 Events</div>
                  <div className="text-[10.5px] text-[#544634]">Critical: 3 cases</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#736551]">Prior Week</div>
                  <div className="text-2xl font-bold text-[#736551]">68 Events</div>
                  <div className="text-[10.5px] text-[#544634]">Critical: 1 case</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] text-[11px]">
                <strong>Conclusion:</strong> Radiance surge (+10.2%) corresponds strictly with the blast furnace smelting cycle in Chota Nagpur and routine petrochemical flaring in Jamnagar, with zero uncontrolled wildfires.
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 rounded-xl bg-[#c05928] text-white text-xs font-bold cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
