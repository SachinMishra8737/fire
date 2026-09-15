import React from 'react';
import { BarChart3, TrendingUp, PieChart, Layers, Flame, ShieldAlert } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const timeData = [
    { day: 'Mon', count: 14, height: '45%' },
    { day: 'Tue', count: 19, height: '62%' },
    { day: 'Wed', count: 11, height: '38%' },
    { day: 'Thu', count: 24, height: '80%' },
    { day: 'Fri', count: 16, height: '52%' },
    { day: 'Sat', count: 28, height: '95%' },
    { day: 'Sun', count: 16, height: '54%' },
  ];

  const sourceData = [
    { label: 'Industrial Activity', percentage: 52, color: 'bg-[#c05928]' },
    { label: 'Agricultural Residue', percentage: 21, color: 'bg-[#d97706]' },
    { label: 'Vegetation / Forest', percentage: 14, color: 'bg-[#16a34a]' },
    { label: 'Other / Low Confidence', percentage: 13, color: 'bg-[#64748b]' },
  ];

  const priorityData = [
    { label: 'Critical', count: 7, percentage: 5.5, color: 'bg-[#dc2626]' },
    { label: 'High', count: 22, percentage: 17.2, color: 'bg-[#ea580c]' },
    { label: 'Medium', count: 48, percentage: 37.5, color: 'bg-[#d97706]' },
    { label: 'Low', count: 51, percentage: 39.8, color: 'bg-[#16a34a]' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813] flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-[#c05928]" />
          MACRO ANALYTICS &amp; ATTRIBUTION METRICS
        </h1>
        <p className="text-xs text-[#736551] mt-0.5">
          Longitudinal performance, cluster distribution, and triage effectiveness across all monitored industrial basins.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs">
          <div className="text-xs font-bold uppercase text-[#736551]">
            TOTAL EVENTS
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#1c1813] mt-1">
            128
          </div>
          <div className="text-[11px] text-[#786b57] mt-1">NASA FIRMS observed in 30d</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs">
          <div className="text-xs font-bold uppercase text-[#736551]">
            HIGH PRIORITY
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#dc2626] mt-1">
            07
          </div>
          <div className="text-[11px] text-[#dc2626] font-semibold mt-1">Requiring immediate field review</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs">
          <div className="text-xs font-bold uppercase text-[#736551]">
            ATTRIBUTED
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#166534] mt-1">
            91%
          </div>
          <div className="text-[11px] text-[#166534] font-semibold mt-1">Consistent multi-pillar assertion</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs">
          <div className="text-xs font-bold uppercase text-[#736551]">
            UNKNOWN / REVIEW
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#475569] mt-1">
            9%
          </div>
          <div className="text-[11px] text-[#64748b] mt-1">Safeguard triage activated</div>
        </div>
      </div>

      {/* Graph 1: Events Over Time */}
      <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#ded4be]">
          <div>
            <h2 className="text-xs font-bold uppercase text-[#3d3121]">
              GRAPH 1 — EVENTS OVER TIME
            </h2>
            <p className="text-xs text-[#736551] mt-0.5">
              Daily satellite thermal detections aggregated over the past 7 days.
            </p>
          </div>
          <span className="text-xs font-bold text-[#c05928] bg-[#ede4cf] border border-[#d5cca5] px-2.5 py-1 rounded-lg">
            Peak: Sat (28 events)
          </span>
        </div>

        {/* Custom Bar Graph */}
        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 sm:px-6">
          {timeData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="text-[11px] font-bold text-[#736551] opacity-0 group-hover:opacity-100 transition-opacity">
                {d.count}
              </div>
              <div
                className="w-full max-w-[42px] bg-[#c05928] rounded-t-lg transition-all"
                style={{ height: d.height }}
              />
              <span className="text-xs font-bold text-[#473a2a]">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Graph 2 (Source Distribution) & Graph 3 (Priority Distribution) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Graph 2: Source Distribution */}
        <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#ded4be]">
            <h2 className="text-xs font-bold uppercase text-[#3d3121]">
              GRAPH 2 — SOURCE DISTRIBUTION
            </h2>
            <p className="text-xs text-[#736551] mt-0.5">
              Breakdown of inferred thermal anomaly sources across all processed scenes.
            </p>
          </div>

          <div className="space-y-3">
            {sourceData.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1c1813]">{s.label}</span>
                  <span className="font-bold text-[#1c1813]">{s.percentage}%</span>
                </div>
                <div className="h-2.5 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full transition-all`}
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graph 3: Priority Distribution */}
        <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#ded4be]">
            <h2 className="text-xs font-bold uppercase text-[#3d3121]">
              GRAPH 3 — PRIORITY DISTRIBUTION
            </h2>
            <p className="text-xs text-[#736551] mt-0.5">
              Operational triage volume categorized by urgency level.
            </p>
          </div>

          <div className="space-y-3">
            {priorityData.map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1c1813]">{p.label}</span>
                  <span className="font-bold text-[#1c1813]">
                    {p.count} events ({p.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${p.color} rounded-full transition-all`}
                    style={{ width: `${p.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
