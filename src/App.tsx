import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { LiveMonitorPage } from './components/pages/LiveMonitorPage';
import { ThermalEventsPage } from './components/pages/ThermalEventsPage';
import { EventAnalysisPage } from './components/pages/EventAnalysisPage';
import { InvestigationPage } from './components/pages/InvestigationPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { HistoricalEventsPage } from './components/pages/HistoricalEventsPage';
import { SystemArchitecturePage } from './components/pages/SystemArchitecturePage';
import { DEMO_THERMAL_EVENTS, INITIAL_INVESTIGATION_CASES } from './data/demoEvents';
import { ThermalEvent, InvestigationCase, AppPage } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [events] = useState<ThermalEvent[]>(DEMO_THERMAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<ThermalEvent>(DEMO_THERMAL_EVENTS[0]);
  const [cases, setCases] = useState<InvestigationCase[]>(INITIAL_INVESTIGATION_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(INITIAL_INVESTIGATION_CASES[0].caseId);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  // View event details -> jumps to Event Analysis page
  const handleViewEventDetails = (event: ThermalEvent) => {
    setSelectedEvent(event);
    setCurrentPage('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create investigation from Event Analysis -> jumps to Investigation page
  const handleCreateInvestigation = (event: ThermalEvent) => {
    const existingCase = cases.find((c) => c.eventId === event.id);

    if (existingCase) {
      setSelectedCaseId(existingCase.caseId);
    } else {
      const newCaseId = `INV-2026-${event.id.replace('EVT-', '')}`;
      const newCase: InvestigationCase = {
        caseId: newCaseId,
        eventId: event.id,
        eventName: event.name,
        location: `${event.region}, ${event.state}`,
        state: event.state,
        priority: event.investigationPriority,
        score: event.priorityScore,
        status: 'QUEUED',
        assignedOfficer: 'Officer / Zonal Triage Command',
        createdAt: '15 Sep 2026, Just Now',
        evidence: event.evidence,
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'AI Triage Engine',
            timestamp: 'Just now',
            text: `Automated case docket opened for ${event.id} with ${event.investigationPriority} priority triage (score ${event.priorityScore}/100).`,
          },
        ],
      };
      setCases([newCase, ...cases]);
      setSelectedCaseId(newCaseId);
    }

    setCurrentPage('investigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update case status handler
  const handleUpdateCaseStatus = (caseId: string, newStatus: InvestigationCase['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.caseId === caseId ? { ...c, status: newStatus } : c))
    );
  };

  // Add note to case handler
  const handleAddCaseNote = (caseId: string, noteText: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.caseId === caseId) {
          return {
            ...c,
            notes: [
              ...c.notes,
              {
                id: `note-${Date.now()}`,
                author: 'Officer Sen (Hazmat Command)',
                timestamp: 'Just now',
                text: noteText,
              },
            ],
          };
        }
        return c;
      })
    );
  };

  // Filter events when global search is active
  const filteredEvents = searchQuery
    ? events.filter(
        (e) =>
          e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : events;

  // If user is on login page, render Login View directly
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#ede4cf] text-[#241e17] flex font-sans-clean antialiased selection:bg-[#c05928]/20 selection:text-[#c05928]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          openCasesCount={cases.filter((c) => c.status !== 'RESOLVED').length}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 h-full">
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              openCasesCount={cases.filter((c) => c.status !== 'RESOLVED').length}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar
          currentPage={currentPage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <DashboardPage
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
              onNavigate={handleNavigate}
              onViewEventDetails={handleViewEventDetails}
            />
          )}

          {currentPage === 'live-monitor' && (
            <LiveMonitorPage
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
              onAnalyzeEvent={handleViewEventDetails}
            />
          )}

          {currentPage === 'events' && (
            <ThermalEventsPage
              events={filteredEvents}
              onViewEvent={handleViewEventDetails}
            />
          )}

          {currentPage === 'analysis' && (
            <EventAnalysisPage
              event={selectedEvent}
              events={events}
              onSelectEvent={setSelectedEvent}
              onCreateInvestigation={handleCreateInvestigation}
            />
          )}

          {currentPage === 'investigation' && (
            <InvestigationPage
              cases={cases}
              selectedCaseId={selectedCaseId}
              onSelectCase={setSelectedCaseId}
              onUpdateCaseStatus={handleUpdateCaseStatus}
              onAddCaseNote={handleAddCaseNote}
            />
          )}

          {currentPage === 'analytics' && <AnalyticsPage />}

          {currentPage === 'history' && <HistoricalEventsPage />}

          {currentPage === 'system' && <SystemArchitecturePage />}
        </main>
      </div>
    </div>
  );
}
