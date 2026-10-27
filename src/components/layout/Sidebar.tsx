"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  ToggleLeft,
  Camera,
  Bell,
  Settings,
  X,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from 'next';
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Sensors", href: "/sensors", icon: Activity },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Control", href: "/control", icon: ToggleLeft },
  { name: "Camera", href: "/camera", icon: Camera },
  { name: "Events", href: "/events", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-agri-green" />
            <span className="text-lg font-semibold text-slate-900">SmartAgri</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href as Route}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-agri-green/10 text-agri-darkgreen"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">Demo Mode</p>
            <p className="mt-1">Configure credentials to connect to hardware</p>
          </div>
        </div>
      </div>
    </>
  );
}
