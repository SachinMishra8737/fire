import React from 'react';
import { Flame, Database, Cpu, ShieldCheck } from 'lucide-react';

interface WorkflowPipelineProps {
  currentStage: number;
  isAnalyzing: boolean;
}

export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  currentStage,
  isAnalyzing,
}) => {
  const stages = [
    {
      stepNumber: '01',
      title: '01 · Observe and construct',
      description:
        'NASA FIRMS VIIRS supplies location, time, FRP and confidence. Related observations are grouped by spatial and temporal relationships into a thermal event.',
      icon: Flame,
    },
    {
      stepNumber: '02',
      title: '02 · Build event context',
      description:
        'Local history, event behaviour and regional activity are combined with infrastructure, land cover and weather information.',
      icon: Database,
    },
    {
      stepNumber: '03',
      title: '03 · Engineer evidence',
      description:
        'The system converts FRP change, persistence, facility distance, nearby event count, land class, weather and available Sentinel evidence into structured features.',
      icon: Cpu,
    },
    {
      stepNumber: '04',
      title: '04 · Analyse and prioritise',
      description:
        'AI estimates abnormality and possible source association, checks uncertainty, and ranks events for human investigation without claiming causality.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Section Header matching Screenshot 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#ded4be]">
        <div>
          <h2 className="font-editorial text-xl sm:text-2xl font-normal text-[#1c1813] tracking-tight">
            From hotspot to investigation priority
          </h2>
          <p className="text-xs text-[#6e604c] mt-0.5 font-sans-clean">
            Contextual reasoning stages converting raw sensor detections into reliable attribution assessments.
          </p>
        </div>

        {isAnalyzing && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fde8dc] border border-[#f5bba3] text-xs text-[#c05928] font-semibold shrink-0 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-[#c05928] animate-ping" />
            <span>Analyzing Contextual Evidence...</span>
          </div>
        )}
      </div>

      {/* 4 Clean Cards matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isPassed = currentStage >= idx + 1;
          const isCurrent = currentStage === idx + 1 && isAnalyzing;

          return (
            <div
              key={stage.stepNumber}
              className={`flex flex-col justify-between rounded-xl p-4 border transition-all duration-200 ${
                isCurrent
                  ? 'bg-[#ffffff] border-[#c05928] ring-2 ring-[#c05928]/30 shadow-md transform -translate-y-0.5'
                  : isPassed
                  ? 'bg-[#ffffff] border-[#c9bea7]'
                  : 'bg-[#faf6ed] border-[#dbd0b7]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xs font-bold text-[#1f1912] tracking-wide font-sans-clean">
                    {stage.title}
                  </h3>
                  <div
                    className={`p-1.5 rounded-lg ${
                      isCurrent
                        ? 'bg-[#fbe8dc] text-[#c05928]'
                        : isPassed
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : 'bg-[#ebe3cf] text-[#7a6d59]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-[11.5px] text-[#594d3c] leading-relaxed font-sans-clean">
                  {stage.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-3 pt-2 border-t border-[#ded4be] flex items-center justify-between text-[11px]">
                {isPassed && !isCurrent ? (
                  <span className="text-[#166534] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                    Evidence Corroborated
                  </span>
                ) : isCurrent ? (
                  <span className="text-[#c05928] font-semibold animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c05928]" />
                    Evaluating...
                  </span>
                ) : (
                  <span className="text-[#8c7e68] font-medium">Pipeline Stage {idx + 1}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
