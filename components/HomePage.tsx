"use client";

import { motion } from "framer-motion";
import { Calendar, ShoppingBag, MapPin, Clock, Star, ChefHat } from "lucide-react";
import type { PageType } from "@/app/page";

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const specials = [
    {
      name: "Truffle Risotto",
      description: "Creamy arborio rice with black truffle",
      price: "$28",
      image: "https://images.unsplash.com/photo-1476124369491-f6e5c4f3edd8?w=800&q=80",
    },
    {
      name: "Grilled Salmon",
      description: "Wild-caught with lemon butter sauce",
      price: "$32",
      image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&q=80",
    },
    {
      name: "Chocolate Soufflé",
      description: "Warm Belgian chocolate with vanilla ice cream",
      price: "$14",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Experience Fine Dining
            </h2>
            <p className="text-lg text-white/90 max-w-md mx-auto">
              World-class cuisine in the heart of downtown. Reserve your table today.
            </p>

            <div className="flex items-center justify-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">123 Main Street, Downtown</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("book")}
                className="flex-1 bg-primary text-white px-8 py-4 rounded-2xl font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("menu")}
                className="flex-1 bg-white text-neutral px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Pickup
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <Clock className="w-6 h-6 text-accent1 mx-auto mb-2" />
            <p className="text-xs font-medium text-neutral">Open Daily</p>
            <p className="text-xs text-gray-500">11AM - 10PM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <Star className="w-6 h-6 text-accent2 mx-auto mb-2 fill-accent2" />
            <p className="text-xs font-medium text-neutral">4.8 Rating</p>
            <p className="text-xs text-gray-500">320+ Reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <ChefHat className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium text-neutral">Award Winning</p>
            <p className="text-xs text-gray-500">Chef&apos;s Table</p>
          </motion.div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1 bg-accent2/10 text-accent2 text-sm font-medium rounded-full mb-3">
              Today&apos;s Specials
            </span>
            <h3 className="text-3xl font-bold text-neutral tracking-tight">
              Featured Dishes
            </h3>
            <p className="text-gray-600 mt-2">Handcrafted with the finest ingredients</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specials.map((special, index) => (
              <motion.div
                key={special.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-accent1 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {special.price}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-semibold text-neutral mb-2">
                    {special.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {special.description}
                  </p>
                  <button className="w-full bg-primary/5 text-primary py-2 rounded-xl font-medium hover:bg-primary/10 transition-colors">
                    Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Dine?</h3>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Book your table now or order for pickup. Experience the finest cuisine in town.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("book")}
              className="bg-white text-primary px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Reserve Table
            </button>
            <button
              onClick={() => onNavigate("menu")}
              className="bg-white/10 backdrop-blur text-white px-8 py-3 rounded-xl font-medium hover:bg-white/20 transition-all border border-white/30"
            >
              View Menu
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="text-sm text-gray-600">
            <strong>The Local Bistro</strong> • 123 Main Street, Downtown
          </p>
          <p className="text-sm text-gray-600">(555) 123-4567</p>
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent2 text-sm font-medium hover:underline"
          >
            Chat on WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
