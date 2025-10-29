"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, UtensilsCrossed, Calendar, Image, Star, MessageCircle } from "lucide-react";
import type { PageType } from "@/app/page";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function MobileDrawer({ isOpen, onClose, currentPage, onNavigate }: MobileDrawerProps) {
  const menuItems = [
    { id: "home" as PageType, label: "Home", icon: Home },
    { id: "menu" as PageType, label: "Menu", icon: UtensilsCrossed },
    { id: "book" as PageType, label: "Book a Table", icon: Calendar },
    { id: "gallery" as PageType, label: "Gallery", icon: Image },
    { id: "reviews" as PageType, label: "Reviews", icon: Star },
    { id: "contact" as PageType, label: "Contact", icon: MessageCircle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-neutral tracking-tight">
                  The Local Bistro
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Downtown • Fine Dining</p>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "hover:bg-gray-50 text-neutral"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-background/30">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-accent2 text-white py-4 rounded-xl font-medium hover:bg-accent2/90 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <p className="text-center text-xs text-gray-600 mt-4">
                (555) 123-4567 • Open Daily 11AM-10PM
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
