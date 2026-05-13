"use client";

import { Menu, Search, Bell } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export function AdminTopbar({ title, subtitle, onMenuToggle }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="font-heading font-bold text-gray-900 text-lg leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 w-64 focus-within:border-brand-primary/30 focus-within:bg-white transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={19} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-secondary rounded-full" />
          </button>

          {/* Avatar */}
          <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white text-sm font-bold shadow-sm">
              A
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Admin</span>
              <span className="text-[10px] text-gray-400">Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
