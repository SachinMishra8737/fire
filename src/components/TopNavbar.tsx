import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  ShieldCheck,
  ChevronDown,
  X,
  AlertTriangle,
  Menu,
} from 'lucide-react';
import { AppPage } from '../types';

interface TopNavbarProps {
  currentPage: AppPage;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
  onToggleMobileSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentPage,
  searchQuery,
  onSearchChange,
  onNavigate,
  onLogout,
  onToggleMobileSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'CRITICAL Radiance Alert: EVT-1040',
      time: '08:02 IST',
      desc: 'Singrauli Thermal Basin exceeded baseline by 34 MW',
      priority: 'CRITICAL',
    },
    {
      id: 2,
      title: 'New High Priority Case: EVT-1042',
      time: '08:16 IST',
      desc: 'Gujarat petrochemical unit scheduled flare requires review',
      priority: 'HIGH',
    },
    {
      id: 3,
      title: 'Satellite Ingestion Pass Complete',
      time: '08:10 IST',
      desc: 'VIIRS Suomi-NPP: 12 scenes processed with 0 ingest errors',
      priority: 'INFO',
    },
  ];

  return (
    <header className="h-16 bg-[#ede4cf] border-b border-[#ded4be] px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 relative z-30">
      {/* Left: Mobile menu button & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-1.5 rounded-lg text-[#544634] hover:bg-[#ded4be] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#736551]">
          <span className="font-bold text-[#1c1813] text-sm capitalize">
            {currentPage.replace('-', ' ')}
          </span>
          <span className="text-[#a89b85]">/</span>
          <span className="hidden sm:inline text-[11px]">
            PS 162 INDUSTRIAL SURVEILLANCE
          </span>
        </div>
      </div>

      {/* Center: Search Box */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a7b66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, locations, or facilities (e.g. EVT-1042, Gujarat)..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#f7f2e5] border border-[#d5cca5] text-xs text-[#1c1813] placeholder-[#8c7e68] focus:outline-none focus:ring-2 focus:ring-[#c05928]/40 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c7e68] hover:text-[#1c1813]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* System Online Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f7f2e5] border border-[#d5cca5] text-[11px] font-semibold text-[#241e17]">
          <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
          <span>SYSTEM ONLINE</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#f7f2e5] border border-[#d5cca5] text-[#473a2a] hover:bg-[#ede4cf] transition-colors cursor-pointer"
            title="Recent Alerts"
          >
            <Bell className="w-4 h-4 text-[#736551]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c05928] text-white text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#f7f2e5] border border-[#d5cca5] rounded-2xl p-3 shadow-xl z-50 text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#ded4be]">
                <span className="font-bold text-[#1c1813] uppercase tracking-wider text-[11px]">
                  System Notifications
                </span>
                <span className="text-[10px] text-[#736551]">3 unread alerts</span>
              </div>

              <div className="space-y-1.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('events');
                    }}
                    className="p-2.5 rounded-xl bg-[#ede4cf] hover:bg-[#e4d8be] border border-[#d5cca5] cursor-pointer transition-colors space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1c1813] text-[11px]">{n.title}</span>
                      <span className="text-[10px] text-[#8c7e68]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#5e513f] leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('investigation');
                  }}
                  className="text-xs text-[#c05928] hover:underline font-semibold"
                >
                  View Investigation Queue →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#f7f2e5] border border-[#d5cca5] hover:bg-[#ede4cf] text-xs font-semibold text-[#1c1813] cursor-pointer transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#c05928]/15 text-[#c05928] flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-bold text-[#1c1813]">Officer / Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#736551]" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#f7f2e5] border border-[#d5cca5] rounded-xl p-2 shadow-xl z-50 text-xs space-y-1">
              <div className="px-2.5 py-1.5 border-b border-[#ded4be]">
                <div className="font-bold text-[#1c1813]">Inspector Admin</div>
                <div className="text-[10px] text-[#736551]">admin@firms.gov.in</div>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('system');
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#ede4cf] text-[#3d3121] font-medium"
              >
                System Settings
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#fbe8e8] text-[#991b1b] font-semibold"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
