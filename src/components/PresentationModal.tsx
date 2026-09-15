import React from 'react';
import { X, Layers, Flame, CheckCircle, ShieldCheck, Database, Cpu, Compass } from 'lucide-react';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241e17]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#ded4be] flex items-center justify-between bg-[#ede4cf]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#ffffff] text-[#c05928] border border-[#d5cca5]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-editorial font-bold text-[#1c1813] tracking-tight">
                Contextual Attribution Research Architecture
              </h2>
              <p className="text-xs text-[#6e604d] font-sans-clean">
                Context-driven differentiation between industrial flare stacks and uncontained fires
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6e604d] hover:text-[#1c1813] hover:bg-[#ded4be] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#3b3226]">
          {/* Section 1: Problem Statement */}
          <div className="bg-[#faf6ed] border border-[#dbd0b7] rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#c05928] flex items-center gap-1.5 font-sans-clean">
              <Flame className="w-4 h-4 text-[#c05928]" />
              1. The Core Problem in Industrial Fire Surveillance
            </div>
            <p className="text-[#3b3226] leading-relaxed font-sans-clean text-xs">
              Raw satellite thermal sensors (such as NASA FIRMS, MODIS, and VIIRS) detect high thermal radiance (FRP) indiscriminately. They frequently flag planned industrial flare stacks, blast furnaces, and legal incinerators as emergency wildfires or accidental fires, overwhelming response teams. Conversely, uncontained industrial accidents in dense industrial parks get lost in the noise.
            </p>
          </div>

          {/* Section 2: The Workflow */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1c1813] font-sans-clean">
              2. The Contextual Attribution Workflow
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#ffffff] border border-[#ded4be] p-3 rounded-lg space-y-1">
                <div className="font-bold text-[#1c1813] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#c05928]" />
                  <span>Stage 1: Satellite Ingestion</span>
                </div>
                <p className="text-[#695c4a] text-[11px] leading-relaxed">
                  Pulls active fire pixels (FRP, brightness temperature, confidence) from VIIRS/MODIS feeds.
                </p>
              </div>

              <div className="bg-[#ffffff] border border-[#ded4be] p-3 rounded-lg space-y-1">
                <div className="font-bold text-[#1c1813] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Stage 2: Geospatial Intersection</span>
                </div>
                <p className="text-[#695c4a] text-[11px] leading-relaxed">
                  Buffers thermal pixel against registered industrial facility polygons, flare stack databases, and land-use rasters.
                </p>
              </div>

              <div className="bg-[#ffffff] border border-[#ded4be] p-3 rounded-lg space-y-1">
                <div className="font-bold text-[#1c1813] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Stage 3: Behavioural &amp; History Analysis</span>
                </div>
                <p className="text-[#695c4a] text-[11px] leading-relaxed">
                  Evaluates historical recurrence baselines, diurnal cycles, and spatial dispersion vs stationary flare signatures.
                </p>
              </div>

              <div className="bg-[#ffffff] border border-[#ded4be] p-3 rounded-lg space-y-1">
                <div className="font-bold text-[#1c1813] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>Stage 4: Safe Attribution Decision</span>
                </div>
                <p className="text-[#695c4a] text-[11px] leading-relaxed">
                  Outputs verified attribution tier. When evidence conflicts or data is sparse, safely returns &ldquo;Requires Review&rdquo;.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Safe Attribution */}
          <div className="bg-[#ffffff] border border-[#ded4be] rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1c1813] flex items-center gap-1.5 font-sans-clean">
              <CheckCircle className="w-4 h-4 text-[#16a34a]" />
              3. Safety-First AI Safeguards
            </div>
            <p className="text-[#594d3c] leading-relaxed font-sans-clean text-xs">
              Unlike uncalibrated classification models that force an arbitrary label, this system enforces strict contextual convergence. If a hotspot has zero facility history and cloud shadow prevents corroboration, the system flags it as an Unknown Investigation Case rather than generating false confidence.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#ded4be] flex items-center justify-between bg-[#ede4cf]">
          <span className="text-[11px] text-[#736551] font-serif italic">
            Research prototype architecture specification
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#c05928] hover:bg-[#b04f20] text-white transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
