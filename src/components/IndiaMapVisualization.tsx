import React, { useState } from 'react';
import { ThermalEvent, PriorityLevel } from '../types';
import { Crosshair, Compass, Eye } from 'lucide-react';

interface IndiaMapVisualizationProps {
  events: ThermalEvent[];
  selectedEvent: ThermalEvent;
  onSelectEvent: (event: ThermalEvent) => void;
  isAnalyzing: boolean;
}

export const IndiaMapVisualization: React.FC<IndiaMapVisualizationProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  isAnalyzing,
}) => {
  const [showCorridors, setShowCorridors] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState<ThermalEvent | null>(null);

  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'HIGH':
        return {
          fill: '#c0392b',
          stroke: '#962d22',
          glow: 'rgba(192, 57, 43, 0.4)',
          bg: 'bg-[#fbe8e8]',
          text: 'text-[#991b1b]',
          border: 'border-[#f5c6c6]',
        };
      case 'MEDIUM':
        return {
          fill: '#d35400',
          stroke: '#a04000',
          glow: 'rgba(211, 84, 0, 0.4)',
          bg: 'bg-[#fef3c7]',
          text: 'text-[#92400e]',
          border: 'border-[#fde68a]',
        };
      case 'LOW':
        return {
          fill: '#27ae60',
          stroke: '#1e8449',
          glow: 'rgba(39, 174, 96, 0.4)',
          bg: 'bg-[#dcfce7]',
          text: 'text-[#166534]',
          border: 'border-[#bbf7d0]',
        };
      case 'UNKNOWN':
      default:
        return {
          fill: '#7f8c8d',
          stroke: '#5d6d7e',
          glow: 'rgba(127, 140, 141, 0.4)',
          bg: 'bg-[#f1f5f9]',
          text: 'text-[#475569]',
          border: 'border-[#cbd5e1]',
        };
    }
  };

  return (
    <div className="relative flex flex-col h-full bg-[#f7f2e5] rounded-2xl border border-[#d5cca5] overflow-hidden shadow-xs">
      {/* Panel Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#ede4cf] border-b border-[#ded4be] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f7f2e5] border border-[#d5cca5] text-xs font-semibold text-[#2f271d]">
            <Compass className="w-3.5 h-3.5 text-[#c05928]" />
            <span>Static India Geo-Visualization</span>
          </div>
          <span className="text-xs text-[#756752] hidden sm:inline">
            Non-GIS Proof-of-Concept Illustration
          </span>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-2">
          <button
            id="toggle-corridors"
            onClick={() => setShowCorridors(!showCorridors)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showCorridors
                ? 'bg-[#f7f2e5] border-[#c05928] text-[#c05928] font-semibold shadow-xs'
                : 'bg-[#ede4cf] border-[#d5cca5] text-[#756752] hover:text-[#2f271d]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${showCorridors ? 'bg-[#c05928]' : 'bg-[#a89b87]'}`} />
            Corridors
          </button>

          <button
            id="toggle-grid"
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showGrid
                ? 'bg-[#f7f2e5] border-[#8a7a65] text-[#3d3326] font-semibold shadow-xs'
                : 'bg-[#ede4cf] border-[#d5cca5] text-[#756752] hover:text-[#2f271d]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${showGrid ? 'bg-[#8a7a65]' : 'bg-[#a89b87]'}`} />
            Graticule Grid
          </button>
        </div>
      </div>

      {/* Main Map Frame: Authentic Antique Parchment Map from Screenshot 2 */}
      <div className="relative flex-1 p-3 sm:p-5 flex flex-col items-center justify-center bg-[#f4edd9] overflow-hidden">
        {/* Geographic Bounds Markings in delicate cartographic typography */}
        <div className="w-full flex justify-between text-[10px] text-[#8c7e68] mb-1.5 px-1 select-none">
          <span>37°05&apos;N / 68°07&apos;E</span>
          <span className="hidden sm:inline text-[#786b55]">Indian Subcontinent Historical Reference</span>
          <span>37°05&apos;N / 97°25&apos;E</span>
        </div>

        {/* Vintage Framed Map Area */}
        <div className="relative w-full max-w-[540px] aspect-[3/3.8] rounded-xl overflow-hidden border border-[#c4b699] bg-[#ebdcc2] shadow-inner flex items-center justify-center">
          {/* Authentic Antique India Map Image */}
          <img
            src="/india_antique_map.jpg"
            alt="Antique Historical Map of India"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter contrast-105"
            referrerPolicy="no-referrer"
          />

          {/* Graticule Grid Layer */}
          {showGrid && (
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#9e8a6a" strokeWidth="0.3" strokeDasharray="1.5 1.5" opacity="0.45">
                <line x1="0" y1="20" x2="100" y2="20" />
                <line x1="0" y1="40" x2="100" y2="40" />
                <line x1="0" y1="60" x2="100" y2="60" />
                <line x1="0" y1="80" x2="100" y2="80" />
                <line x1="20" y1="0" x2="20" y2="100" />
                <line x1="40" y1="0" x2="40" y2="100" />
                <line x1="60" y1="0" x2="60" y2="100" />
                <line x1="80" y1="0" x2="80" y2="100" />
              </g>
            </svg>
          )}

          {/* Key Industrial Corridors Layer */}
          {showCorridors && (
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gujarat Petrochem Corridor */}
              <circle cx="23" cy="46" r="4.5" fill="#c05928" fillOpacity="0.12" />
              <path
                d="M 18,48 C 22,46 25,48 28,52"
                stroke="#c05928"
                strokeWidth="0.6"
                strokeDasharray="1.2 0.8"
                strokeOpacity="0.75"
              />
              <text x="11" y="43" fill="#544330" fontSize="2" fontFamily="monospace" fontWeight="bold">
                GUJARAT PETROCHEM
              </text>

              {/* Singrauli Coal Basin */}
              <circle cx="55" cy="44" r="5" fill="#dc2626" fillOpacity="0.12" />
              <path
                d="M 50,44 L 60,45"
                stroke="#dc2626"
                strokeWidth="0.6"
                strokeDasharray="1.2 0.8"
                strokeOpacity="0.75"
              />
              <text x="46" y="41" fill="#544330" fontSize="2" fontFamily="monospace" fontWeight="bold">
                SINGRAULI BASIN
              </text>

              {/* Chota Nagpur Metallurgical Belt */}
              <circle cx="65" cy="46" r="4.5" fill="#d97706" fillOpacity="0.12" />
              <path
                d="M 62,45 L 68,48"
                stroke="#d97706"
                strokeWidth="0.6"
                strokeDasharray="1.2 0.8"
                strokeOpacity="0.75"
              />
              <text x="63" y="52" fill="#544330" fontSize="2" fontFamily="monospace" fontWeight="bold">
                CHOTA NAGPUR BELT
              </text>

              {/* Mumbai Industrial Terminal */}
              <circle cx="28" cy="58" r="4" fill="#d97706" fillOpacity="0.12" />
              <text x="17" y="63" fill="#544330" fontSize="2" fontFamily="monospace" fontWeight="bold">
                MUMBAI INDUSTRIAL
              </text>

              {/* Bellary Iron Zone */}
              <circle cx="39" cy="70" r="4" fill="#d97706" fillOpacity="0.12" />
              <text x="27" y="75" fill="#544330" fontSize="2" fontFamily="monospace" fontWeight="bold">
                BELLARY IRON ZONE
              </text>

              {/* Islands Typography */}
              <text x="21" y="86" fill="#695642" fontSize="2.2" fontFamily="sans-serif">
                Lakshadweep
              </text>
              <text x="80" y="86" fill="#695642" fontSize="2.2" fontFamily="sans-serif">
                A&amp;N Islands
              </text>
            </svg>
          )}

          {/* Interactive Thermal Hotspots Overlay */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {events.map((event) => {
              const cx = event.mapX;
              const cy = event.mapY;
              const isSelected = selectedEvent.id === event.id;
              const style = getPriorityColor(event.investigationPriority);

              return (
                <g
                  key={event.id}
                  id={`marker-${event.id}`}
                  className="cursor-pointer group"
                  onClick={() => onSelectEvent(event)}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {/* Static Steady Target Ring (no continuous animated circle) */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4.2"
                      fill="none"
                      stroke={style.fill}
                      strokeWidth="0.4"
                      opacity="0.65"
                    />
                  )}

                  {/* Concentric Halo */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? '2.8' : '1.8'}
                    fill={style.fill}
                    fillOpacity={isSelected ? 0.35 : 0.2}
                    stroke={style.fill}
                    strokeWidth="0.25"
                  />

                  {/* Core Target Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? '1.4' : '1.1'}
                    fill={style.fill}
                    stroke="#ede4cf"
                    strokeWidth="0.35"
                  />

                  {/* Reticle Crosshairs on Active Event */}
                  {isSelected && (
                    <g stroke="#ffffff" strokeWidth="0.3" opacity="0.95">
                      <line x1={cx - 3.8} y1={cy} x2={cx - 2.2} y2={cy} />
                      <line x1={cx + 2.2} y1={cy} x2={cx + 3.8} y2={cy} />
                      <line x1={cx} y1={cy - 3.8} x2={cx} y2={cy - 2.2} />
                      <line x1={cx} y1={cy + 2.2} x2={cx} y2={cy + 3.8} />
                      <circle cx={cx} cy={cy} r="3.8" fill="none" strokeDasharray="0.8 0.8" stroke="#ffffff" strokeWidth="0.25" />
                    </g>
                  )}

                  {/* Clean Paper Tag Label in matching cream */}
                  <g transform={`translate(${cx + 2}, ${cy - 1.8})`}>
                    <rect
                      x="0"
                      y="0"
                      width={event.id.length * 1.45 + 2.2}
                      height="3.8"
                      rx="0.8"
                      fill="#f7f2e5"
                      fillOpacity="0.95"
                      stroke={isSelected ? '#c05928' : '#a89a80'}
                      strokeWidth={isSelected ? '0.35' : '0.2'}
                    />
                    <text
                      x="1"
                      y="2.7"
                      fill={isSelected ? '#c05928' : '#261e15'}
                      fontSize="2"
                      fontFamily="sans-serif"
                      fontWeight={isSelected ? '700' : '600'}
                    >
                      {event.id}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip in Warm Parchment Style */}
          {hoveredEvent && (
            <div
              className="absolute z-30 pointer-events-none bg-[#f7f2e5] border border-[#c4b59b] rounded-xl p-3 shadow-md text-xs transition-opacity"
              style={{
                left: `${Math.min(Math.max(hoveredEvent.mapX, 18), 72)}%`,
                top: `${Math.max(hoveredEvent.mapY - 12, 10)}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#e5dcc7] pb-1 mb-1">
                <span className="font-bold text-[#1f1912]">{hoveredEvent.id}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    hoveredEvent.investigationPriority === 'HIGH'
                      ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                      : hoveredEvent.investigationPriority === 'MEDIUM'
                      ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                      : hoveredEvent.investigationPriority === 'LOW'
                      ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                      : 'bg-[#ede4cf] text-[#475569] border border-[#cbd5e1]'
                  }`}
                >
                  {hoveredEvent.investigationPriority} Priority
                </span>
              </div>
              <div className="text-[#362e24] text-xs font-semibold mb-1">
                {hoveredEvent.name}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#6e614e]">
                <div>FRP: <strong className="text-[#c05928]">{hoveredEvent.frpMw} MW</strong></div>
                <div>Temp: <strong className="text-[#241e17]">{hoveredEvent.brightnessTempK} K</strong></div>
                <div>Sensor: <span className="text-[#403629]">{hoveredEvent.sensor.split(' ')[0]}</span></div>
                <div>Conf: <strong className="text-[#166534]">{Math.round(hoveredEvent.confidence * 100)}%</strong></div>
              </div>
            </div>
          )}

          {/* Selected Event Quick Badge (Top-Right of Map) */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-[#f7f2e5] border border-[#d5cca5] rounded-lg px-2.5 py-1.5 text-xs shadow-xs hidden sm:block">
            <div className="text-[10px] text-[#736551] uppercase font-semibold">Active Target</div>
            <div className="text-xs font-bold text-[#c05928] flex items-center gap-1">
              <Crosshair className="w-3 h-3 text-[#dc2626]" />
              {selectedEvent.id}
            </div>
          </div>
        </div>

        {/* Caption underneath map */}
        <div className="w-full text-left pt-2.5 px-1 text-[11px] text-[#786b57]">
          Prototype reference sheet — event points are illustrative.
        </div>
      </div>
    </div>
  );
};
