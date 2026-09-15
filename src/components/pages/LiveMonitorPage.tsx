import React from 'react';
import {
  Radio,
  Layers,
  Flame,
  CloudSun,
  Database,
  ArrowRight,
  RefreshCw,
  Cpu,
  Compass,
  ShieldAlert,
} from 'lucide-react';
import { ThermalEvent } from '../../types';
import { IndiaMapVisualization } from '../IndiaMapVisualization';

interface LiveMonitorPageProps {
  events: ThermalEvent[];
  selectedEvent: ThermalEvent;
  onSelectEvent: (event: ThermalEvent) => void;
  onAnalyzeEvent: (event: ThermalEvent) => void;
}

export const LiveMonitorPage: React.FC<LiveMonitorPageProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onAnalyzeEvent,
}) => {
  const dataSources = [
    { name: 'FIRMS Thermal Observations', status: 'ONLINE', latency: '4m ago', icon: Flame },
    { name: 'Weather Telemetry (GFS / ECMWF)', status: 'ONLINE', latency: '12m ago', icon: CloudSun },
    { name: 'Sentinel-2 Multispectral Archive', status: 'ONLINE', latency: '2h ago', icon: Layers },
    { name: 'GIS Infrastructure & Land Use', status: 'ONLINE', latency: 'Persistent', icon: Database },
  ];

  const pipelineStages = [
    { label: 'FIRMS', desc: 'Raw VIIRS 375m hotspot pixel' },
    { label: 'Event Construction', desc: 'Spatio-temporal clustering' },
    { label: 'Context Enrichment', desc: 'Buffer & land-cover fusion' },
    { label: 'AI Analysis', desc: 'Feature engineering & scoring' },
    { label: 'Attribution', desc: 'Industrial vs agricultural' },
    { label: 'Investigation Priority', desc: 'Triage queue ranking' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Status & Data Sources */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ded4be]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c05928] text-white">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1c1813] leading-none">
                LIVE MONITOR
              </h1>
              <p className="text-xs text-[#736551] mt-1">
                Incoming thermal observations &amp; automated ingestion pipeline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#736551]">
              Last Sensor Ingest: <strong className="text-[#1c1813]">08:16 IST</strong>
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dcfce7] border border-[#bbf7d0] text-[11px] font-bold text-[#166534]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
              <span>PASS COMPLETE</span>
            </div>
          </div>
        </div>

        {/* 4 Data Sources Status Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          {dataSources.map((ds, i) => {
            const Icon = ds.icon;
            return (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#f7f2e5] border border-[#ded4be] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#c05928]" />
                  <div>
                    <div className="font-semibold text-[#1c1813] text-[11px] leading-tight">
                      {ds.name}
                    </div>
                    <div className="text-[10px] text-[#8c7e68]">{ds.latency}</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" title="ONLINE" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Thermal Observations List & Right India Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Incoming Thermal Observations Feed */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#ded4be]">
            <h2 className="text-xs font-bold uppercase text-[#3d3121] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#c05928]" />
              THERMAL OBSERVATIONS
            </h2>
            <span className="text-xs text-[#736551] font-semibold">
              {events.length} scenes active
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {events.map((evt) => {
              const isSelected = selectedEvent.id === evt.id;

              return (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#f7f2e5] border-[#c05928] shadow-xs ring-1 ring-[#c05928]/30'
                      : 'bg-[#f7f2e5] border-[#d5cca5] hover:bg-[#ede4cf]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1c1813]">
                        {evt.id}
                      </span>
                      <span className="text-xs text-[#736551]">· {evt.state}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        evt.investigationPriority === 'CRITICAL'
                          ? 'bg-[#fbe8e8] text-[#991b1b]'
                          : evt.investigationPriority === 'HIGH'
                          ? 'bg-[#fde8dc] text-[#c05928]'
                          : evt.investigationPriority === 'MEDIUM'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-[#dcfce7] text-[#166534]'
                      }`}
                    >
                      {evt.investigationPriority}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#1c1813] mb-2">
                    {evt.name}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#544634] p-2.5 rounded-xl bg-[#ede4cf] border border-[#ded4be] mb-3">
                    <div>Lat: <span className="font-semibold text-[#1c1813]">{evt.lat.toFixed(2)}°N</span></div>
                    <div>Lon: <span className="font-semibold text-[#1c1813]">{evt.lng.toFixed(2)}°E</span></div>
                    <div>FRP: <strong className="text-[#c05928]">{evt.frpMw} MW</strong></div>
                    <div>Confidence: <strong className="text-[#166534]">{Math.round(evt.confidence * 100)}%</strong></div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAnalyzeEvent(evt);
                    }}
                    id={`btn-analyze-live-${evt.id}`}
                    className="w-full py-2 px-3 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ANALYZE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Map view */}
        <div className="lg:col-span-7">
          <IndiaMapVisualization
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={onSelectEvent}
            isAnalyzing={false}
          />
        </div>
      </div>

      {/* Bottom: Data Pipeline Sequential Flow */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#ded4be] mb-4">
          <h3 className="text-xs font-bold uppercase text-[#3d3121] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#c05928]" />
            DATA PIPELINE
          </h3>
          <span className="text-[11px] text-[#736551]">
            Automated reasoning architecture
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#f7f2e5] border border-[#d5cca5] flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold text-[#c05928] mb-1">
                  STAGE 0{idx + 1}
                </div>
                <div className="text-xs font-bold text-[#1c1813] leading-snug">
                  {stage.label}
                </div>
                <p className="text-[10.5px] text-[#736551] mt-1 leading-tight">
                  {stage.desc}
                </p>
              </div>
              <div className="mt-2.5 pt-1.5 border-t border-[#ded4be] flex items-center gap-1 text-[10px] text-[#166534] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                <span>Verified</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#ded4be] text-[11px] text-[#786b57] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p>
            <strong>Note on Latency:</strong> FIRMS provides scheduled satellite overpasses (VIIRS &amp; MODIS). This screen represents latest available observations rather than continuous streaming CCTV.
          </p>
          <span className="text-[#c05928] font-semibold shrink-0">
            Automated AI Triage
          </span>
        </div>
      </div>
    </div>
  );
};
