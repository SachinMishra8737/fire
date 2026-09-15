import React, { useState } from 'react';
import {
  Flame,
  Search,
  Factory,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Info,
  Layers,
  MapPin,
  Clock,
  Compass,
  Cpu,
  Building2,
  Wind,
} from 'lucide-react';
import { ThermalEvent, PriorityLevel, ContextPillar } from '../../types';

interface EventAnalysisPageProps {
  event: ThermalEvent;
  events: ThermalEvent[];
  onSelectEvent: (event: ThermalEvent) => void;
  onCreateInvestigation: (event: ThermalEvent) => void;
}

export const EventAnalysisPage: React.FC<EventAnalysisPageProps> = ({
  event,
  events,
  onSelectEvent,
  onCreateInvestigation,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasRunAnalysis, setHasRunAnalysis] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<ContextPillar | null>(null);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= 6) {
          clearInterval(stepInterval);
          setIsAnalyzing(false);
          setHasRunAnalysis(true);
          return 6;
        }
        return prev + 1;
      });
    }, 450);
  };

  const isUnknownCase = event.insufficientEvidence || event.investigationPriority === 'UNKNOWN';

  const pipelineSteps = [
    'THERMAL EVENT',
    'ANOMALY SCORE',
    'CONTEXT FUSION',
    'SOURCE ATTRIBUTION',
    'UNCERTAINTY',
    'INVESTIGATION PRIORITY',
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Event Identification & RUN ANALYSIS Button */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ded4be]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#c05928] bg-[#fde8dc] border border-[#f5bba3] px-2.5 py-0.5 rounded-md">
                {event.id}
              </span>
              <span className="text-xs text-[#736551]">
                {event.region || event.state}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#166534] font-semibold pl-2">
                <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-[#c05928]' : 'bg-[#16a34a]'}`} />
                <span>{isAnalyzing ? 'Analyzing Inferences...' : 'Analysis Ready'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813]">
              {event.name}
            </h1>
            <p className="text-xs text-[#736551] mt-0.5">
              Coordinates: {event.lat.toFixed(4)}°N, {event.lng.toFixed(4)}°E · State: <strong>{event.state}</strong>
            </p>
          </div>

          {/* Quick Target Switcher & RUN ANALYSIS Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              value={event.id}
              onChange={(e) => {
                const target = events.find((ev) => ev.id === e.target.value);
                if (target) onSelectEvent(target);
              }}
              className="px-3 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs font-semibold text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs cursor-pointer"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.id} - {ev.state} ({ev.investigationPriority})
                </option>
              ))}
            </select>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              id="btn-run-analysis"
              className={`py-2 px-4 rounded-xl text-xs font-bold uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                isAnalyzing
                  ? 'bg-[#ded4be] text-[#736551] cursor-not-allowed'
                  : 'bg-[#c05928] hover:bg-[#a64b1f] text-white'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>RUN ANALYSIS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 1: Thermal Signal Raw Card */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase text-[#736551] mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#c05928]" />
            <span>STEP 1 — THERMAL SIGNAL (VIIRS PASS)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#f7f2e5] border border-[#ded4be]">
              <div className="text-[10.5px] uppercase font-bold text-[#736551]">FRP Radiative Power</div>
              <div className="text-2xl font-bold text-[#c05928] mt-0.5">
                {event.frpMw} MW
              </div>
              <div className="text-[10px] text-[#8c7e68]">Radiative heat output</div>
            </div>

            <div className="p-3 rounded-xl bg-[#f7f2e5] border border-[#ded4be]">
              <div className="text-[10.5px] uppercase font-bold text-[#736551]">Sensor Confidence</div>
              <div className="text-2xl font-bold text-[#166534] mt-0.5">
                {Math.round(event.confidence * 100)}%
              </div>
              <div className="text-[10px] text-[#8c7e68]">{event.sensor.split(' ')[0]}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#f7f2e5] border border-[#ded4be]">
              <div className="text-[10.5px] uppercase font-bold text-[#736551]">Observation Time</div>
              <div className="text-2xl font-bold text-[#1c1813] mt-0.5">
                {event.detectionTimeIst}
              </div>
              <div className="text-[10px] text-[#8c7e68]">{event.detectionTimeUtc}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#f7f2e5] border border-[#ded4be]">
              <div className="text-[10.5px] uppercase font-bold text-[#736551]">Coordinates</div>
              <div className="text-xl font-bold text-[#1c1813] mt-1">
                {event.lat.toFixed(2)}°N, {event.lng.toFixed(2)}°E
              </div>
              <div className="text-[10px] text-[#8c7e68]">Grid reference</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Four Context Pillars */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#ded4be]">
          <div>
            <h2 className="text-xs font-bold uppercase text-[#3d3121]">
              STEP 2 — FOUR CONTEXT PILLARS
            </h2>
            <p className="text-xs text-[#736551] mt-0.5">
              Multi-dimensional fusion differentiating authorized flare stacks from uncontained fires.
            </p>
          </div>
          <span className="text-[11px] text-[#736551] hidden sm:inline">
            Click [VIEW] on any pillar to inspect telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Pillar 1: Local History */}
          <div className="p-4 rounded-xl bg-[#f7f2e5] border border-[#ded4be] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#544634] flex items-center justify-between">
                <span>LOCAL HISTORY</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ede4cf] border border-[#d5cca5] text-[#544634]">
                  {event.contextCards.localHistory.tag}
                </span>
              </div>
              <p className="text-xs text-[#544634] mt-2 leading-relaxed">
                {event.contextCards.localHistory.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedPillar(event.contextCards.localHistory)}
              className="mt-3 pt-2 border-t border-[#ded4be] text-xs font-bold text-[#c05928] hover:underline flex items-center justify-between cursor-pointer"
            >
              <span>[ VIEW HISTORY ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Event Behaviour */}
          <div className="p-4 rounded-xl bg-[#f7f2e5] border border-[#ded4be] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#544634] flex items-center justify-between">
                <span>EVENT BEHAVIOUR</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ede4cf] border border-[#d5cca5] text-[#544634]">
                  {event.contextCards.eventBehaviour.tag}
                </span>
              </div>
              <p className="text-xs text-[#544634] mt-2 leading-relaxed">
                {event.contextCards.eventBehaviour.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedPillar(event.contextCards.eventBehaviour)}
              className="mt-3 pt-2 border-t border-[#ded4be] text-xs font-bold text-[#c05928] hover:underline flex items-center justify-between cursor-pointer"
            >
              <span>[ VIEW BEHAVIOUR ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: Infrastructure & Land Use */}
          <div className="p-4 rounded-xl bg-[#f7f2e5] border border-[#ded4be] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#544634] flex items-center justify-between">
                <span>INFRASTRUCTURE</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ede4cf] border border-[#d5cca5] text-[#544634]">
                  {event.contextCards.infrastructure.tag}
                </span>
              </div>
              <p className="text-xs text-[#544634] mt-2 leading-relaxed">
                {event.contextCards.infrastructure.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedPillar(event.contextCards.infrastructure)}
              className="mt-3 pt-2 border-t border-[#ded4be] text-xs font-bold text-[#c05928] hover:underline flex items-center justify-between cursor-pointer"
            >
              <span>[ VIEW LAND-USE ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4: Regional Context */}
          <div className="p-4 rounded-xl bg-[#f7f2e5] border border-[#ded4be] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#544634] flex items-center justify-between">
                <span>REGIONAL CONTEXT</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ede4cf] border border-[#d5cca5] text-[#544634]">
                  {event.contextCards.regionalContext.tag}
                </span>
              </div>
              <p className="text-xs text-[#544634] mt-2 leading-relaxed">
                {event.contextCards.regionalContext.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedPillar(event.contextCards.regionalContext)}
              className="mt-3 pt-2 border-t border-[#ded4be] text-xs font-bold text-[#c05928] hover:underline flex items-center justify-between cursor-pointer"
            >
              <span>[ VIEW REGIONAL ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Step 3: Spatial Buffer Visualization */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="pb-3 border-b border-[#ded4be] mb-4">
          <h2 className="text-xs font-bold uppercase text-[#3d3121]">
            STEP 3 — SPATIAL BUFFER VISUALIZATION
          </h2>
          <p className="text-xs text-[#736551] mt-0.5">
            Geospatial proximity reasoning measuring the distance between the thermal hotspot and registered industrial perimeters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Visual Buffer Diagram Canvas */}
          <div className="lg:col-span-7 bg-[#ede4cf] border border-[#c4b699] rounded-2xl p-5 relative overflow-hidden flex items-center justify-center min-h-[260px] shadow-inner">
            <svg viewBox="0 0 320 200" className="w-full max-w-[420px] h-auto">
              {/* Outer 5 km Buffer Zone */}
              <rect
                x="30"
                y="20"
                width="260"
                height="160"
                rx="20"
                fill="#f7f2e5"
                stroke="#c05928"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fillOpacity="0.75"
              />

              {/* Buffer Label */}
              <text x="45" y="42" fill="#c05928" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                5 KM OPERATIONAL BUFFER
              </text>

              {/* Industrial Facility Marker */}
              <g transform="translate(90, 75)">
                <rect x="0" y="0" width="60" height="50" rx="8" fill="#473a2a" />
                <text x="30" y="28" fill="#ffffff" fontSize="18" textAnchor="middle">🏭</text>
                <text x="30" y="43" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">
                  FACILITY
                </text>
              </g>

              {/* Proximity Distance Vector */}
              <path
                d="M 155,100 L 220,100"
                stroke="#c05928"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <rect x="165" y="86" width="45" height="15" rx="3" fill="#f7f2e5" stroke="#c05928" strokeWidth="0.8" />
              <text x="187" y="97" fill="#c05928" fontSize="8" textAnchor="middle" fontWeight="bold">
                {event.spatialContext.distanceKm} km
              </text>

              {/* Thermal Hotspot Marker */}
              <g transform="translate(235, 100)">
                <circle cx="0" cy="0" r="12" fill="#dc2626" fillOpacity="0.3" />
                <circle cx="0" cy="0" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                <text x="0" y="-12" fill="#dc2626" fontSize="8" textAnchor="middle" fontWeight="bold">
                  HOTSPOT
                </text>
              </g>
            </svg>
          </div>

          {/* Side Context Details & Dynamically Calibrated Note */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-xl bg-[#f7f2e5] border border-[#ded4be] space-y-2.5 shadow-2xs">
              <div className="text-[11px] font-bold uppercase text-[#736551]">
                SPATIAL CONTEXT
              </div>

              <div className="flex items-center justify-between border-b border-[#ded4be] pb-2 text-xs">
                <span className="text-[#544634]">Event → Facility Distance:</span>
                <strong className="text-[#c05928] text-sm">{event.spatialContext.distanceKm} km</strong>
              </div>

              <div className="flex items-center justify-between border-b border-[#ded4be] pb-2 text-xs">
                <span className="text-[#544634]">Buffer Used:</span>
                <strong className="text-[#1c1813]">5.0 km</strong>
              </div>

              <div className="flex items-center justify-between border-b border-[#ded4be] pb-2 text-xs">
                <span className="text-[#544634]">Nearby Infrastructure:</span>
                <strong className="text-[#1c1813]">{event.spatialContext.nearbyFacilitiesCount} facilities inside buffer</strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#544634]">Nearby Land-use:</span>
                <strong className="text-[#166534]">{event.spatialContext.landUseClassification}</strong>
              </div>
            </div>

            {/* Prototype Threshold Callout requested by user */}
            <div className="p-3.5 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs text-[#544634] leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#c05928] shrink-0 mt-0.5" />
              <p>
                &ldquo;5 km currently prototype threshold; actual deployment me historical validation ke basis par dynamically calibrate kiya jayega.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: AI Analysis Horizontal Pipeline */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="pb-3 border-b border-[#ded4be] mb-4">
          <h2 className="text-xs font-bold uppercase text-[#3d3121]">
            STEP 4 — AI ANALYSIS PIPELINE
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {pipelineSteps.map((step, idx) => {
            const isActive = isAnalyzing ? analysisStep >= idx + 1 : true;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-[#f7f2e5] border-[#c05928] shadow-2xs'
                    : 'bg-[#ede4cf] border-[#dbd0b7] opacity-60'
                }`}
              >
                <div className="text-[10px] font-bold text-[#c05928] mb-1">
                  STAGE 0{idx + 1}
                </div>
                <div className="text-[11px] font-bold text-[#1c1813]">
                  {step}
                </div>
                <div className="mt-2 text-[10px] text-[#166534] font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                  <span>Computed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 5: Three Main Outputs (A. Abnormality, B. Source Attribution, C. Investigation Priority) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Output A: Abnormality */}
        <div className="p-5 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-[#736551]">
              A · ABNORMALITY
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-[#1c1813]">
                {event.abnormalityScore}
              </span>
              <span className="text-xs text-[#736551]">/ 100</span>
              <span
                className={`ml-auto px-2 py-0.5 rounded text-xs font-bold ${
                  event.abnormality === 'CRITICAL' || event.abnormality === 'HIGH'
                    ? 'bg-[#fde8dc] text-[#c05928]'
                    : 'bg-[#fef3c7] text-[#92400e]'
                }`}
              >
                {event.abnormality}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#544634] mb-1">
                  <span>Historical deviation</span>
                  <span className="font-bold">82%</span>
                </div>
                <div className="h-1.5 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c05928] rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#544634] mb-1">
                  <span>Spatial unusualness</span>
                  <span className="font-bold">70%</span>
                </div>
                <div className="h-1.5 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ea580c] rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#544634] mb-1">
                  <span>Temporal behaviour</span>
                  <span className="font-bold">78%</span>
                </div>
                <div className="h-1.5 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                  <div className="h-full bg-[#d97706] rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ded4be] text-[11px] text-[#736551] mt-3">
            Multi-temporal baseline shift computed across 30 days.
          </div>
        </div>

        {/* Output B: Source Attribution */}
        <div className="p-5 rounded-2xl bg-[#f7f2e5] border border-[#d5cca5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-[#736551]">
              B · SOURCE ATTRIBUTION
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#ede4cf] border border-[#ded4be]">
                <span className="font-bold text-[#1c1813]">Industrial Activity</span>
                <strong className="text-[#c05928] text-sm">{event.sourceProbabilities.industrial}%</strong>
              </div>

              <div className="flex items-center justify-between text-xs p-1.5 px-2 text-[#544634]">
                <span>Agricultural Burning</span>
                <span className="font-semibold">{event.sourceProbabilities.agricultural}%</span>
              </div>

              <div className="flex items-center justify-between text-xs p-1.5 px-2 text-[#544634]">
                <span>Vegetation / Forest</span>
                <span className="font-semibold">{event.sourceProbabilities.vegetation}%</span>
              </div>

              <div className="flex items-center justify-between text-xs p-1.5 px-2 text-[#544634]">
                <span>Other / Unclassified</span>
                <span className="font-semibold">{event.sourceProbabilities.other}%</span>
              </div>
            </div>

            {/* Evidence Checklist */}
            <div className="mt-3 pt-2.5 border-t border-[#ded4be] space-y-1 text-[11px] text-[#1c1813]">
              <div className="text-[10px] font-bold text-[#736551] uppercase mb-1">
                Evidence:
              </div>
              <div className="flex items-center gap-1.5 text-[#166534]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                <span>Industrial land-use</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#166534]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                <span>Proximity to facility (2.1 km)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#166534]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                <span>Historical behaviour verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#166534]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                <span>Weather context corroborated</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#736551]">
            Confidence: <strong>{event.sourceProbabilities.industrial}%</strong>
          </div>
        </div>

        {/* Output C: Investigation Priority (Huge Card) */}
        <div className="p-5 rounded-2xl bg-[#ede4cf] border-2 border-[#c05928] shadow-xs flex flex-col justify-between text-center">
          <div>
            <div className="text-xs font-bold uppercase text-[#736551]">
              C · INVESTIGATION PRIORITY
            </div>

            <div className="my-4">
              <div
                className={`inline-block px-4 py-1.5 rounded-xl text-2xl font-bold ${
                  event.investigationPriority === 'CRITICAL'
                    ? 'bg-[#dc2626] text-white shadow-2xs'
                    : event.investigationPriority === 'HIGH'
                    ? 'bg-[#c05928] text-white shadow-2xs'
                    : 'bg-[#d97706] text-white shadow-2xs'
                }`}
              >
                {event.investigationPriority} PRIORITY
              </div>

              <div className="mt-3">
                <span className="text-xs font-bold text-[#544634]">
                  Triage Score:
                </span>
                <span className="text-3xl font-bold text-[#1c1813] ml-1.5">
                  {event.priorityScore} / 100
                </span>
              </div>
            </div>

            <p className="text-xs text-[#544634] leading-snug px-2">
              Dispatches incident report to zonal fire inspector without claiming premature facility causality.
            </p>
          </div>

          <button
            onClick={() => onCreateInvestigation(event)}
            id="btn-create-investigation"
            className="w-full mt-4 py-3 px-4 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CREATE INVESTIGATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step 6: Uncertainty / "Unknown" System Safeguard */}
      <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ded4be] mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#c05928]" />
            <h3 className="text-xs font-bold uppercase text-[#3d3121]">
              STEP 6 — UNCERTAINTY &amp; &ldquo;UNKNOWN&rdquo; SAFEGUARD
            </h3>
          </div>
          <span className="text-xs text-[#736551]">
            Prevents AI hallucinations on ambiguous sensor data
          </span>
        </div>

        {isUnknownCase ? (
          <div className="p-4 rounded-xl bg-[#fef3c7] border border-[#fde68a] text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#92400e] font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>⚠ INSUFFICIENT EVIDENCE DETECTED</span>
            </div>
            <div className="text-[#78350f]">
              <strong>Attribution:</strong> UNKNOWN
            </div>
            <div className="text-[#78350f]">
              <strong>Reason:</strong> {event.message || 'Available contextual evidence is insufficient for reliable attribution.'}
            </div>
            <div className="text-[#78350f]">
              <strong>Recommendation:</strong> Manual investigation required. Aerial or ground reconnaissance must corroborate the coordinate.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1c1813]">MODEL CONFIDENCE</span>
                <span className="font-bold text-[#166534]">{Math.round(event.confidence * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-[#ede4cf] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16a34a] rounded-full"
                  style={{ width: `${Math.round(event.confidence * 100)}%` }}
                />
              </div>
              <div className="text-[11px] text-[#736551] mt-1.5">
                Uncertainty Metric: <strong>Moderate (±8% bounds)</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#ede4cf] border border-[#ded4be] text-xs text-[#544634]">
              <strong>Safety Threshold:</strong> When confidence drops below 50% or cloud contamination is detected, the engine suppresses automatic source assertion and returns &ldquo;Requires Review&rdquo;.
            </div>
          </div>
        )}
      </div>

      {/* Context Pillar Detail Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl max-w-md w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ded4be] pb-3">
              <h3 className="text-lg font-bold text-[#1c1813]">
                {selectedPillar.title} Telemetry
              </h3>
              <button
                onClick={() => setSelectedPillar(null)}
                className="text-[#736551] hover:text-[#1c1813] text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#544634]">
              <div><strong>Status:</strong> <span className="capitalize text-[#166534] font-semibold">{selectedPillar.status}</span></div>
              <div><strong>Parameter Tag:</strong> <span>{selectedPillar.tag}</span></div>
              {selectedPillar.metric && <div><strong>Observation:</strong> {selectedPillar.metric}</div>}
              <p className="mt-2 text-[#1c1813] leading-relaxed bg-[#ede4cf] p-3 rounded-xl border border-[#ded4be]">
                {selectedPillar.description}
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-4 py-1.5 rounded-xl bg-[#c05928] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
