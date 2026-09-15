import React from 'react';
import {
  Flame,
  LayoutDashboard,
  Radio,
  ListFilter,
  Search,
  ShieldAlert,
  BarChart3,
  History,
  Settings,
  Database,
  Cpu,
  LogOut,
} from 'lucide-react';
import { AppPage } from '../types';

interface SidebarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
  openCasesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onLogout,
  openCasesCount,
}) => {
  const navItems: Array<{
    id: AppPage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-monitor', label: 'Live Monitor', icon: Radio },
    { id: 'events', label: 'Thermal Events', icon: Flame, badge: '128' },
    { id: 'analysis', label: 'Event Analysis', icon: Search },
    {
      id: 'investigation',
      label: 'Investigation',
      icon: ShieldAlert,
      badge: openCasesCount,
      badgeColor: 'bg-[#dc2626] text-white',
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
    { id: 'system', label: 'System', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#f4ecd9] border-r border-[#d5cca5] flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 sm:p-5 border-b border-[#ded4be] flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#c05928] text-white shadow-xs">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#1c1813] leading-tight flex items-center gap-1.5">
              <span>FIREWATCH AI</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#736551]">
              Agni Drishti · PS 162
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c05928] text-white shadow-xs font-bold'
                    : 'text-[#473a2a] hover:bg-[#ebdcc2] hover:text-[#1c1813]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#736551]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor || 'bg-[#ded4be] text-[#473a2a]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-4 border-t border-[#ded4be] bg-[#ede4cf] space-y-3">
        <div className="space-y-1.5 text-[11px] text-[#544634]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="font-semibold text-[#1c1813]">Data Pipeline Online</span>
          </div>
          <div className="flex items-center gap-2 text-[10.5px] text-[#6d5e4b] pl-4">
            <Cpu className="w-3 h-3 text-[#c05928]" />
            <span>AI Context Engine Ready</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#736551] hover:text-[#1c1813] hover:bg-[#ded4be] transition-colors border border-[#d5cca5] cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit to Login</span>
        </button>
      </div>
    </aside>
  );
};
