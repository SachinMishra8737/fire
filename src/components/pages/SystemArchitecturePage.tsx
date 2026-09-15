import React from 'react';
import {
  Settings,
  Cpu,
  Database,
  CloudSun,
  Flame,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Server,
  ArrowDown,
} from 'lucide-react';

export const SystemArchitecturePage: React.FC = () => {
  const architectureLayers = [
    {
      title: 'DATA SOURCES',
      items: ['NASA FIRMS (VIIRS / MODIS)', 'Sentinel-2 Level-2A Archive', 'GFS & ECMWF Weather Telemetry', 'Bhuvan / OpenStreetMap Industrial GIS'],
      icon: Flame,
    },
    {
      title: 'PREPROCESSING & INGESTION',
      items: ['Radiance Threshold Filtering', 'Cloud Cover & Smoke Masking', 'Sensor Coordinate Normalization'],
      icon: Database,
    },
    {
      title: 'EVENT CONSTRUCTION',
      items: ['Spatial Clustering (DBSCAN 1.5km)', 'Temporal Radiance Coalescence', 'Diurnal FRP Delta Tracking'],
      icon: Layers,
    },
    {
      title: 'CONTEXT ENGINE',
      items: ['5 km Facility Proximity Buffer', 'Corridor Zoning (Petrochem / Steel / Power)', '180-day Revisit Baseline Comparison'],
      icon: Cpu,
    },
    {
      title: 'AI / ML INFERENCE ENGINE',
      items: ['Statistical Abnormality Scoring', 'Gradient Boosted Source Classifier', 'Uncertainty & Unknown Trigger Guardrail'],
      icon: ShieldCheck,
    },
    {
      title: 'ATTRIBUTION & TRIAGE',
      items: ['Likely Source Association (Industrial vs Agro vs Wildfire)', 'Human Investigation Priority Ranking (0-100)'],
      icon: CheckCircle2,
    },
    {
      title: 'INVESTIGATION DASHBOARD',
      items: ['Real-time Dispatch Docket', 'Evidence Verification Audit Trail', 'Zonal Field Action Integration'],
      icon: Server,
    },
  ];

  const systemStatus = [
    { service: 'FIRMS VIIRS & MODIS Feed', status: 'ONLINE', ping: '12ms' },
    { service: 'Weather Telemetry Engine', status: 'ONLINE', ping: '18ms' },
    { service: 'Industrial GIS Proximity Store', status: 'ONLINE', ping: '8ms' },
    { service: 'Contextual AI Scoring Engine', status: 'READY', ping: '4ms' },
    { service: 'Investigation Database', status: 'ONLINE', ping: '15ms' },
    { service: 'SMS / Email Dispatch Gateway', status: 'ONLINE', ping: '24ms' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813] flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#c05928]" />
          SYSTEM ARCHITECTURE &amp; SPECIFICATION
        </h1>
        <p className="text-xs text-[#736551] mt-0.5">
          End-to-end technical topology of the SIH Problem Statement 162 contextual surveillance engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Architecture Cascade Flow */}
        <div className="lg:col-span-8 bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#ded4be]">
            <h2 className="text-xs font-bold uppercase text-[#3d3121]">
              SYSTEM ARCHITECTURE CASCADE
            </h2>
            <p className="text-xs text-[#736551] mt-0.5">
              Automated data flow from orbital observation to zonal officer docket.
            </p>
          </div>

          <div className="space-y-3">
            {architectureLayers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div key={idx} className="relative">
                  <div className="p-4 rounded-xl bg-[#ede4cf] border border-[#ded4be] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#f7f2e5] text-[#c05928] border border-[#d5cca5]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#c05928]">
                          LAYER 0{idx + 1}
                        </div>
                        <h3 className="text-xs font-bold text-[#1c1813]">
                          {layer.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:max-w-md justify-start sm:justify-end">
                      {layer.items.map((it, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#f7f2e5] border border-[#d5cca5] text-[#544634]"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>

                  {idx < architectureLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-[#c05928]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: System Status Health */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#ded4be]">
              <h2 className="text-xs font-bold uppercase text-[#3d3121]">
                SYSTEM STATUS
              </h2>
              <p className="text-xs text-[#736551] mt-0.5">
                Real-time microservices latency and health.
              </p>
            </div>

            <div className="space-y-2.5">
              {systemStatus.map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#ede4cf] border border-[#ded4be] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#1c1813]">{st.service}</div>
                    <div className="text-[10px] text-[#8c7e68]">Latency: {st.ping}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#dcfce7] border border-[#bbf7d0] text-[10px] font-bold text-[#166534]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                    <span>{st.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f5efe1] border border-[#d5cca5] shadow-xs text-xs text-[#544634] space-y-2">
            <div className="font-bold text-[#1c1813] uppercase text-[11px]">
              SIH Problem Statement 162 Compliance
            </div>
            <p className="leading-relaxed">
              Designed explicitly to address non-GIS proof-of-concept verification, ensuring NASA FIRMS satellite data is augmented with rich contextual intelligence to prevent premature conclusions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
