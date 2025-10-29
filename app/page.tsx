"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Star, Clock, ChefHat, UtensilsCrossed, Calendar, Image as ImageIcon, MessageCircle } from "lucide-react";
import HomePage from "@/components/HomePage";
import MenuPage from "@/components/MenuPage";
import BookPage from "@/components/BookPage";
import GalleryPage from "@/components/GalleryPage";
import ReviewsPage from "@/components/ReviewsPage";
import ContactPage from "@/components/ContactPage";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileDrawer from "@/components/MobileDrawer";

export type PageType = "home" | "menu" | "book" | "gallery" | "reviews" | "contact";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "menu":
        return <MenuPage />;
      case "book":
        return <BookPage />;
      case "gallery":
        return <GalleryPage />;
      case "reviews":
        return <ReviewsPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Top Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-neutral" />
          </button>

          <button onClick={() => setCurrentPage("home")} className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-neutral tracking-tight">
              The Local Bistro
            </h1>
            <p className="text-xs text-gray-500">Downtown • Fine Dining</p>
          </button>

          <a
            href="tel:+1234567890"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Call us"
          >
            <Phone className="w-6 h-6 text-primary" />
          </a>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsDrawerOpen(false);
        }}
      />

      {/* Page Content */}
      <div className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* WhatsApp Float Button */}
      <WhatsAppButton />
    </main>
  );
}
