import React from 'react';
import {
  ThermalEvent,
  AnalysisResponse,
  PriorityLevel,
  AbnormalityLevel,
} from '../types';
import {
  History,
  Activity,
  Factory,
  CloudSun,
  ShieldAlert,
  Flame,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface EventDetailPanelProps {
  event: ThermalEvent;
  analysisResult: AnalysisResponse | null;
  isAnalyzing: boolean;
  analysisStep: string;
  onRunAnalysis: (eventId: string) => void;
  onResetAnalysis: () => void;
}

export const EventDetailPanel: React.FC<EventDetailPanelProps> = ({
  event,
  analysisResult,
  isAnalyzing,
  analysisStep,
  onRunAnalysis,
  onResetAnalysis,
}) => {
  const getPriorityStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case 'HIGH':
        return {
          bg: 'bg-[#fbe8e8]',
          text: 'text-[#991b1b]',
          border: 'border-[#f5c6c6]',
          badge: 'bg-[#dc2626] text-white',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-[#fef3c7]',
          text: 'text-[#92400e]',
          border: 'border-[#fde68a]',
          badge: 'bg-[#d97706] text-white',
        };
      case 'LOW':
        return {
          bg: 'bg-[#dcfce7]',
          text: 'text-[#166534]',
          border: 'border-[#bbf7d0]',
          badge: 'bg-[#16a34a] text-white',
        };
      case 'UNKNOWN':
      default:
        return {
          bg: 'bg-[#f1f5f9]',
          text: 'text-[#475569]',
          border: 'border-[#cbd5e1]',
          badge: 'bg-[#64748b] text-white',
        };
    }
  };

  const getAbnormalityBadge = (level: AbnormalityLevel | string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6] font-semibold';
      case 'MEDIUM':
        return 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-semibold';
      case 'LOW':
        return 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] font-semibold';
      default:
        return 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] font-semibold';
    }
  };

  const priorityStyle = getPriorityStyle(event.investigationPriority);

  return (
    <div className="flex flex-col h-full bg-[#f6efe0] rounded-2xl border border-[#d5cca5] overflow-hidden shadow-sm">
      {/* Panel Top Bar */}
      <div className="px-5 py-3.5 bg-[#ede4cf] border-b border-[#ded4be] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c05928]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#241e17] font-sans-clean">
            Thermal Event Inspector
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#ffffff] text-[#241e17] font-bold border border-[#d5cca5]">
            {event.id}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#166534] font-semibold border border-[#bbf7d0]">
            Target Active
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-[#241e17]">
        {/* Section: Event Identification & Primary Metadata */}
        <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-4 space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#80725e] uppercase tracking-wide">
                Event Identification
              </span>
              <div className="text-xl font-bold text-[#1a140d] mt-0.5 font-sans-clean">
                {event.id}
              </div>
              <div className="text-sm font-semibold text-[#c05928]">
                {event.name}
              </div>
              <div className="text-xs text-[#6e604d] mt-1">
                Region: <strong className="text-[#2b2216]">{event.region}</strong> ({event.state})
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold tracking-wide ${priorityStyle.badge}`}
              >
                {event.investigationPriority} Priority
              </span>
              <div className="text-xs text-[#7a6d59] mt-1.5">
                Confidence: <strong className="text-[#1a140d]">{Math.round(event.confidence * 100)}%</strong>
              </div>
            </div>
          </div>

          {/* Core At-A-Glance Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-[#ded4be]">
            <div className="bg-[#ffffff] p-2.5 rounded-lg border border-[#ded4be]">
              <div className="text-[11px] text-[#7a6d59] font-medium">
                Abnormality
              </div>
              <div className="mt-1">
                <span className={`px-2 py-0.5 rounded text-[11px] inline-block ${getAbnormalityBadge(event.abnormality)}`}>
                  {event.abnormality}
                </span>
              </div>
            </div>

            <div className="bg-[#ffffff] p-2.5 rounded-lg border border-[#ded4be]">
              <div className="text-[11px] text-[#7a6d59] font-medium">
                Likely Source
              </div>
              <div className="text-xs font-semibold text-[#241e17] mt-1 truncate" title={event.likelySource}>
                {event.likelySource}
              </div>
            </div>

            <div className="bg-[#ffffff] p-2.5 rounded-lg border border-[#ded4be]">
              <div className="text-[11px] text-[#7a6d59] font-medium">
                Investigation
              </div>
              <div className={`text-xs font-bold mt-1 ${priorityStyle.text}`}>
                {event.investigationPriority}
              </div>
            </div>

            <div className="bg-[#ffffff] p-2.5 rounded-lg border border-[#ded4be]">
              <div className="text-[11px] text-[#7a6d59] font-medium">
                Confidence
              </div>
              <div className="text-xs font-bold text-[#166534] mt-1">
                {Math.round(event.confidence * 100)}%
              </div>
            </div>
          </div>

          {/* Sensor Telemetry Strip */}
          <div className="flex items-center justify-between text-xs text-[#635543] bg-[#ffffff] px-3 py-2 rounded-lg border border-[#ded4be] flex-wrap gap-2">
            <span>Sensor: <strong className="text-[#241e17] font-semibold">{event.sensor}</strong></span>
            <span>FRP: <strong className="text-[#c05928] font-bold">{event.frpMw} MW</strong></span>
            <span>Temp: <strong className="text-[#241e17] font-semibold">{event.brightnessTempK} K</strong></span>
          </div>
        </div>

        {/* Section: Context Evidence (Four Evidence Dimension Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3d3326] flex items-center gap-1.5 font-sans-clean">
              <Sparkles className="w-3.5 h-3.5 text-[#c05928]" />
              Context Evidence Layers
            </h3>
            <span className="text-[11px] text-[#7d705c]">
              4 Analytical Layers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Card 1: Local History */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2b2217]">
                  <History className="w-3.5 h-3.5 text-[#c05928]" />
                  <span>Local History</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    event.contextCards.localHistory.status === 'verified'
                      ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      : event.contextCards.localHistory.status === 'caution'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]'
                  }`}
                >
                  {event.contextCards.localHistory.tag}
                </span>
              </div>
              <p className="text-[11px] text-[#241e17] font-semibold">
                &ldquo;Historical Activity&rdquo;
              </p>
              <p className="text-[11px] text-[#695c4a] leading-relaxed">
                {event.contextCards.localHistory.description}
              </p>
            </div>

            {/* Card 2: Event Behaviour */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2b2217]">
                  <Activity className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Event Behaviour</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    event.contextCards.eventBehaviour.status === 'verified'
                      ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      : event.contextCards.eventBehaviour.status === 'caution'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]'
                  }`}
                >
                  {event.contextCards.eventBehaviour.tag}
                </span>
              </div>
              <p className="text-[11px] text-[#241e17] font-semibold">
                &ldquo;Spatial-Temporal Rules&rdquo;
              </p>
              <p className="text-[11px] text-[#695c4a] leading-relaxed">
                {event.contextCards.eventBehaviour.description}
              </p>
            </div>

            {/* Card 3: Infrastructure & Land-use */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2b2217]">
                  <Factory className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Infrastructure &amp; Land-use</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    event.contextCards.infrastructure.status === 'verified'
                      ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      : event.contextCards.infrastructure.status === 'caution'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]'
                  }`}
                >
                  {event.contextCards.infrastructure.tag}
                </span>
              </div>
              <p className="text-[11px] text-[#241e17] font-semibold">
                &ldquo;Facility Proximity&rdquo;
              </p>
              <p className="text-[11px] text-[#695c4a] leading-relaxed">
                {event.contextCards.infrastructure.description}
              </p>
            </div>

            {/* Card 4: Regional Context */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2b2217]">
                  <CloudSun className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>Regional Context</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    event.contextCards.regionalContext.status === 'verified'
                      ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      : event.contextCards.regionalContext.status === 'caution'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]'
                  }`}
                >
                  {event.contextCards.regionalContext.tag}
                </span>
              </div>
              <p className="text-[11px] text-[#241e17] font-semibold">
                &ldquo;Regional Meteorology&rdquo;
              </p>
              <p className="text-[11px] text-[#695c4a] leading-relaxed">
                {event.contextCards.regionalContext.description}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Prominent ANALYZE BUTTON */}
        <div className="pt-2">
          {!analysisResult && !isAnalyzing ? (
            <button
              id="btn-analyze-thermal-event"
              onClick={() => onRunAnalysis(event.id)}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-[#c05928] hover:bg-[#b04f20] text-white shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer font-sans-clean"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Analyze Thermal Event</span>
            </button>
          ) : isAnalyzing ? (
            <div className="bg-[#faf6ed] border border-[#c05928]/50 rounded-xl p-4 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-2 text-[#c05928] font-bold text-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-[#c05928]" />
                <span>Running Contextual Inference Engine</span>
              </div>

              <div className="py-1 px-3 rounded-lg bg-[#ffffff] border border-[#d5cca5] inline-block text-xs text-[#241e17] font-semibold">
                &ldquo;{analysisStep}&rdquo;
              </div>

              <div className="w-full bg-[#ede4cf] h-2 rounded-full overflow-hidden">
                <div className="bg-[#c05928] h-full w-3/4 animate-pulse rounded-full" />
              </div>
              <div className="text-[11px] text-[#736652]">
                Executing inference pipeline: POST /analyze-event
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                id="btn-reanalyze-event"
                onClick={() => onRunAnalysis(event.id)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#c05928] hover:bg-[#b04f20] text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-white" />
                Re-Analyze {event.id}
              </button>
              <button
                id="btn-clear-analysis"
                onClick={onResetAnalysis}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#4f4231] hover:text-[#1c1813] bg-[#faf6ed] hover:bg-[#ffffff] border border-[#dbd0b7] transition-colors cursor-pointer"
              >
                Reset Output
              </button>
            </div>
          )}
        </div>

        {/* Section: OUTPUT SECTION */}
        {analysisResult && (
          <div className="space-y-3 pt-3 border-t border-[#ded4be]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#16a34a]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#241e17] font-sans-clean">
                  Attribution &amp; Analysis Output
                </h3>
              </div>
              <span className="text-xs text-[#6e604d]">
                Convergence: <strong className="text-[#16a34a] font-bold">{Math.round(analysisResult.confidence * 100)}%</strong>
              </span>
            </div>

            {/* Unknown Case Alert Box */}
            {analysisResult.insufficient_evidence && (
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#92400e] uppercase tracking-wide">
                      Safety Safeguard Active
                    </div>
                    <div className="text-xs font-bold text-[#78350f] mt-0.5">
                      &ldquo;Evidence insufficient for reliable attribution.&rdquo;
                    </div>
                    <p className="text-[11px] text-[#92400e] mt-1 leading-relaxed">
                      The contextual AI safety threshold requires multi-layer convergence before asserting industrial vs wildfire attribution. Sensor cloud shadow and zero infrastructure proximity prevent forced categorization.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Three Main Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Card 1: ABNORMALITY */}
              <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 text-center flex flex-col justify-between">
                <div className="text-[11px] font-bold text-[#7a6d59] uppercase">
                  Abnormality
                </div>
                <div className="py-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${getAbnormalityBadge(
                      analysisResult.abnormality
                    )}`}
                  >
                    {analysisResult.abnormality}
                  </span>
                </div>
                <div className="text-[10px] text-[#7a6d59]">
                  Thermal divergence
                </div>
              </div>

              {/* Card 2: SOURCE ATTRIBUTION */}
              <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 text-center flex flex-col justify-between">
                <div className="text-[11px] font-bold text-[#7a6d59] uppercase">
                  Attributed Source
                </div>
                <div className="py-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                      analysisResult.source === 'UNKNOWN'
                        ? 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]'
                        : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                    }`}
                  >
                    {analysisResult.source}
                  </span>
                </div>
                <div className="text-[10px] text-[#7a6d59]">
                  Classified origin
                </div>
              </div>

              {/* Card 3: INVESTIGATION PRIORITY */}
              <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 text-center flex flex-col justify-between">
                <div className="text-[11px] font-bold text-[#7a6d59] uppercase">
                  Priority Tier
                </div>
                <div className="py-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                      analysisResult.priority === 'HIGH'
                        ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                        : analysisResult.priority === 'MEDIUM'
                        ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                        : 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                    }`}
                  >
                    {analysisResult.priority}
                  </span>
                </div>
                <div className="text-[10px] text-[#7a6d59]">
                  Triage decision
                </div>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#695c4a] font-medium">Convergence Score:</span>
                <span className="font-bold text-[#166534]">{Math.round(analysisResult.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-[#ede4cf] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#16a34a] transition-all duration-500"
                  style={{ width: `${Math.round(analysisResult.confidence * 100)}%` }}
                />
              </div>
            </div>

            {/* Evidence Checklist */}
            <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-3.5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#241e17] font-sans-clean">
                Verified Contextual Evidence:
              </div>

              <div className="space-y-1.5">
                {[
                  'Historical activity',
                  'Event behaviour',
                  'Infrastructure proximity',
                  'Land-use context',
                  'Weather context',
                ].map((item) => {
                  const isPresent = analysisResult.evidence.includes(item);

                  return (
                    <div
                      key={item}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs ${
                        isPresent
                          ? 'bg-[#ffffff] border border-[#bbf7d0] text-[#166534]'
                          : 'bg-[#ede4cf]/50 border border-[#dbd0b7] text-[#8a7c66] line-through'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isPresent
                              ? 'bg-[#dcfce7] text-[#166534]'
                              : 'bg-[#d5cca5] text-[#695c4a]'
                          }`}
                        >
                          {isPresent ? '✓' : '×'}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-[11px] font-semibold">
                        {isPresent ? 'Corroborated' : 'Insufficient'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
