"use client";

import { motion } from "framer-motion";
import { Home, UtensilsCrossed, Calendar, Image, Star, MessageCircle } from "lucide-react";
import type { PageType } from "@/app/page";

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home" as PageType, label: "Home", icon: Home },
    { id: "menu" as PageType, label: "Menu", icon: UtensilsCrossed },
    { id: "book" as PageType, label: "Book", icon: Calendar },
    { id: "gallery" as PageType, label: "Gallery", icon: Image },
    { id: "reviews" as PageType, label: "Reviews", icon: Star },
    { id: "contact" as PageType, label: "Contact", icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-gray-100 safe-area-pb">
      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors hover:bg-gray-50"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 mb-1 transition-colors relative z-10 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium relative z-10 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
