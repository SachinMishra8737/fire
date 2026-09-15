import React, { useState } from 'react';
import { Flame, ShieldCheck, ArrowRight, KeyRound, UserCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('officer.sen@firms.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#ede4cf] text-[#241e17] flex items-center justify-center p-4 sm:p-8 select-none">
      <div className="w-full max-w-4xl bg-[#f7f2e5] border border-[#d5cca5] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Brand Identity */}
        <div className="p-8 sm:p-12 bg-[#ede4cf] border-b md:border-b-0 md:border-r border-[#d5cca5] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#c05928] text-white shadow-md">
                <Flame className="w-7 h-7 fill-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-[#786b55]">
                  SIH PS 162
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1813] leading-none">
                  FIREWATCH AI
                </h1>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-[#2e261d] leading-snug mb-4">
              Contextual Industrial Fire Detection &amp; Attribution System
            </h2>

            <p className="text-xs sm:text-sm text-[#544634] leading-relaxed mb-6">
              Autonomous multi-sensor satellite surveillance synthesizing NASA FIRMS thermal radiance, geospatial infrastructure buffers, and historical behavior to triage industrial fires.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e3d8bf] border border-[#cfc3a7] text-xs font-semibold text-[#403525]">
              <ShieldCheck className="w-4 h-4 text-[#c05928]" />
              <span>Detect · Analyze · Attribute</span>
            </div>
          </div>

          <div className="pt-8 border-t border-[#ded4be] text-[11px] text-[#736551] flex items-center justify-between">
            <span>Ministry of Electronics &amp; IT</span>
            <span>Prototype v2.4</span>
          </div>
        </div>

        {/* Right Side: Simple System Login Box */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#f7f2e5]">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#1c1813]">
              SYSTEM LOGIN
            </h3>
            <p className="text-xs text-[#736551] mt-1">
              Authorized investigator access to SIH PS 162 command terminal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#473a2a] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter authorized username..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/50 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#473a2a] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#ede4cf] border border-[#d5cca5] text-xs text-[#1c1813] focus:outline-none focus:ring-2 focus:ring-[#c05928]/50 shadow-2xs"
              />
            </div>

            <button
              type="submit"
              id="btn-login-submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#c05928] hover:bg-[#a64b1f] text-white text-xs font-bold uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOGIN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Bypass Button */}
          <div className="mt-5 pt-4 border-t border-[#ded4be] text-center">
            <button
              type="button"
              id="btn-demo-access"
              onClick={onLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ede4cf] border border-[#d5cca5] hover:bg-[#e4d8be] text-xs font-semibold text-[#473a2a] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#16a34a]" />
              <span>Instant Demo Access (Skip Auth)</span>
            </button>
            <p className="text-[11px] text-[#8c7e68] mt-2">
              Judges can click Instant Demo Access to evaluate the dashboard immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
