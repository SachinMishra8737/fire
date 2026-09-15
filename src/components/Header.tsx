import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenArchitecture?: () => void;
  activeSensorFeed: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenArchitecture,
  activeSensorFeed,
}) => {
  return (
    <header className="w-full border-b border-[#d8cfb8] bg-[#ede4cf] text-[#241e17]">
      {/* Top Bar: Minimalist title strip matching Screenshot 2 */}
      <div className="border-b border-[#ded5be] px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#5e5343]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenArchitecture}
              className="p-1 -ml-1 text-[#3b3226] hover:text-[#1c1813] transition-colors cursor-pointer"
              title="View Architecture Specification"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#241e17] tracking-tight">
                Agni Drishti
              </span>
              <span className="text-[#a39680]">/</span>
              <span className="text-[11px] font-medium tracking-wide text-[#736652]">
                SIH PS 162 · WORKING PROTOTYPE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#736652]">
            <span>last pass: <strong className="text-[#3b3226] font-semibold">{activeSensorFeed}</strong></span>
            <span>•</span>
            <span>12 scenes</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Section matching Screenshot 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-5">
        {/* Rust / Terracotta Problem Statement Tag */}
        <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#c05928] mb-2 font-sans-clean">
          PROBLEM STATEMENT 162
        </div>

        {/* Big Editorial Serif Heading */}
        <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-tight text-[#1c1813] tracking-tight max-w-4xl">
          Contextual intelligence for satellite-observed thermal events.
        </h1>

        {/* Narrative Description matching Screenshot 2 */}
        <p className="mt-3 text-sm sm:text-base text-[#4f4435] leading-relaxed max-w-3xl font-sans-clean">
          The system begins with NASA FIRMS VIIRS observations, then studies related hotspots as meaningful thermal events. It combines history, behaviour, regional activity, land, infrastructure, weather and available satellite evidence to support early industrial fire investigation—not merely report that a hotspot exists.
        </p>
      </div>
    </header>
  );
};
