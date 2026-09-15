import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Plus,
  Send,
  User,
  Clock,
  MapPin,
  Flame,
  Check,
  FileText,
} from 'lucide-react';
import { InvestigationCase, PriorityLevel } from '../../types';

interface InvestigationPageProps {
  cases: InvestigationCase[];
  selectedCaseId: string | null;
  onSelectCase: (caseId: string) => void;
  onUpdateCaseStatus: (caseId: string, newStatus: InvestigationCase['status']) => void;
  onAddCaseNote: (caseId: string, noteText: string) => void;
}

export const InvestigationPage: React.FC<InvestigationPageProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  onUpdateCaseStatus,
  onAddCaseNote,
}) => {
  const [newNote, setNewNote] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const activeCase = cases.find((c) => c.caseId === selectedCaseId) || cases[0];

  const handleAction = (status: InvestigationCase['status'], label: string) => {
    if (!activeCase) return;
    onUpdateCaseStatus(activeCase.caseId, status);
    setActionFeedback(label);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !activeCase) return;
    onAddCaseNote(activeCase.caseId, newNote.trim());
    setNewNote('');
    setActionFeedback('Note logged to case record.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#f5efe1] border border-[#d6cbb0] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ded4be]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1813] flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-[#c05928]" />
              INVESTIGATION QUEUE
            </h1>
            <p className="text-xs text-[#736551] mt-0.5">
              Triage docket for industrial incidents requiring human investigator verification.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-[#ede4cf] border border-[#d5cca5] font-bold text-[#c05928] shadow-2xs">
              {cases.length} Open Inquiries
            </span>
          </div>
        </div>

        {/* Action Feedback Flash */}
        {actionFeedback && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#dcfce7] border border-[#bbf7d0] text-xs font-semibold text-[#166534] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionFeedback}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Investigation Cases List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase text-[#3d3121] pb-2 border-b border-[#ded4be]">
            CASES IN DOCKET
          </h2>

          <div className="space-y-3">
            {cases.map((c) => {
              const isSelected = activeCase?.caseId === c.caseId;

              return (
                <div
                  key={c.caseId}
                  onClick={() => onSelectCase(c.caseId)}
                  className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#f7f2e5] border-[#c05928] shadow-md ring-1 ring-[#c05928]/30'
                      : 'bg-[#f7f2e5] border-[#d5cca5] hover:bg-[#ede4cf]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#c05928]">
                      {c.caseId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.priority === 'CRITICAL'
                          ? 'bg-[#fbe8e8] text-[#991b1b]'
                          : c.priority === 'HIGH'
                          ? 'bg-[#fde8dc] text-[#c05928]'
                          : 'bg-[#fef3c7] text-[#92400e]'
                      }`}
                    >
                      {c.priority}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#1c1813] leading-snug">
                    {c.eventName}
                  </h3>
                  <div className="text-[11px] text-[#736551] mt-0.5">
                    Event: <span className="font-semibold">{c.eventId}</span> · {c.state}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#ded4be] flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#544634]">Score: {c.score}/100</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ede4cf] text-[10px] font-bold text-[#544634] uppercase">
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCase(c.caseId);
                    }}
                    className="w-full mt-3 py-1.5 px-3 rounded-lg bg-[#ede4cf] hover:bg-[#c05928] hover:text-white border border-[#d5cca5] text-xs font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>OPEN CASE</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Case Detailed View */}
        {activeCase ? (
          <div className="lg:col-span-8 bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-5 shadow-xs space-y-5">
            {/* Case Header */}
            <div className="pb-4 border-b border-[#ded4be] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-[#c05928]">
                    {activeCase.caseId}
                  </span>
                  <span className="text-xs text-[#736551]">· Created {activeCase.createdAt}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1c1813]">
                  {activeCase.eventName}
                </h2>
                <div className="text-xs text-[#736551] mt-0.5">
                  Associated Observation: <strong>{activeCase.eventId}</strong> · Location: <strong>{activeCase.location}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    activeCase.priority === 'CRITICAL'
                      ? 'bg-[#fbe8e8] text-[#991b1b] border border-[#f5c6c6]'
                      : 'bg-[#fde8dc] text-[#c05928] border border-[#f5bba3]'
                  }`}
                >
                  {activeCase.priority} PRIORITY ({activeCase.score}/100)
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#ede4cf] text-xs font-bold text-[#473a2a] border border-[#d5cca5]">
                  {activeCase.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Evidence Panel matching user specs */}
            <div>
              <h3 className="text-xs font-bold uppercase text-[#3d3121] mb-2.5">
                EVIDENCE PANEL
              </h3>

              <div className="p-4 rounded-xl bg-[#ede4cf] border border-[#ded4be] space-y-2 text-xs">
                {activeCase.evidence.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#1c1813]">
                    <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-[#b45309] font-medium pt-1 border-t border-[#ded4be]">
                  <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <span>⚠ Satellite high-resolution optical confirmation pending next revisit pass</span>
                </div>
              </div>
            </div>

            {/* Investigator Actions Bar */}
            <div>
              <h3 className="text-xs font-bold uppercase text-[#3d3121] mb-2.5">
                INVESTIGATOR ACTIONS
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleAction('INVESTIGATING', 'Case marked as Under Investigation')}
                  className="p-2.5 rounded-xl bg-[#ede4cf] hover:bg-[#e4d8be] border border-[#d5cca5] text-xs font-bold text-[#1c1813] transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <FileText className="w-3.5 h-3.5 text-[#c05928]" />
                  <span>MARK INVESTIGATING</span>
                </button>

                <button
                  onClick={() => handleAction('FIELD_REQUESTED', 'Field verification dispatched to zonal team')}
                  className="p-2.5 rounded-xl bg-[#ede4cf] hover:bg-[#e4d8be] border border-[#d5cca5] text-xs font-bold text-[#1c1813] transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c05928]" />
                  <span>REQUEST VERIFICATION</span>
                </button>

                <button
                  onClick={() => {
                    const noteElem = document.getElementById('case-note-input');
                    if (noteElem) noteElem.focus();
                  }}
                  className="p-2.5 rounded-xl bg-[#ede4cf] hover:bg-[#e4d8be] border border-[#d5cca5] text-xs font-bold text-[#1c1813] transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Plus className="w-3.5 h-3.5 text-[#166534]" />
                  <span>ADD NOTE</span>
                </button>

                <button
                  onClick={() => handleAction('RESOLVED', 'Case closed and archived.')}
                  className="p-2.5 rounded-xl bg-[#dcfce7] hover:bg-[#bbf7d0] border border-[#86efac] text-xs font-bold text-[#166534] transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Check className="w-3.5 h-3.5 text-[#166534]" />
                  <span>CLOSE CASE</span>
                </button>
              </div>
            </div>

            {/* Case Log / Notes Section */}
            <div>
              <h3 className="text-xs font-bold uppercase text-[#3d3121] mb-2.5">
                INVESTIGATION LOG &amp; FIELD NOTES
              </h3>

              <div className="space-y-2 mb-3">
                {activeCase.notes.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-[#ede4cf] border border-[#ded4be] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[#736551]">
                      <span className="font-bold text-[#1c1813] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#c05928]" />
                        {n.author}
                      </span>
                      <span className="text-[11px]">{n.timestamp}</span>
                    </div>
                    <p className="text-[#382f23] leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                <input
                  id="case-note-input"
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type an observation or investigator remark..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
