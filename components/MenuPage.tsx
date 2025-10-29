"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Minus, Clock, Flame } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  prepTime: string;
  spiceLevel?: number;
  dietary?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Risotto",
    description: "Creamy arborio rice with black truffle shavings and parmesan",
    price: 28,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1476124369491-f6e5c4f3edd8?w=600&q=80",
    prepTime: "25 min",
    dietary: ["Vegetarian"],
  },
  {
    id: "2",
    name: "Grilled Salmon",
    description: "Wild-caught Atlantic salmon with lemon butter sauce and asparagus",
    price: 32,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600&q=80",
    prepTime: "20 min",
    dietary: ["Gluten-Free"],
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine, house-made croutons, parmesan, classic dressing",
    price: 14,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
    prepTime: "10 min",
  },
  {
    id: "4",
    name: "Beef Carpaccio",
    description: "Thinly sliced prime beef with arugula, capers, and truffle oil",
    price: 18,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    prepTime: "8 min",
  },
  {
    id: "5",
    name: "Spicy Ramen",
    description: "Traditional tonkotsu broth with pork belly, soft egg, and vegetables",
    price: 22,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    prepTime: "15 min",
    spiceLevel: 2,
  },
  {
    id: "6",
    name: "Margherita Pizza",
    description: "San Marzano tomatoes, fresh mozzarella, basil, extra virgin olive oil",
    price: 18,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    prepTime: "18 min",
    dietary: ["Vegetarian"],
  },
  {
    id: "7",
    name: "Chocolate Soufflé",
    description: "Warm Belgian chocolate soufflé with vanilla bean ice cream",
    price: 14,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
    prepTime: "20 min",
  },
  {
    id: "8",
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
    price: 12,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    prepTime: "5 min",
  },
];

const categories = ["All", "Starters", "Mains", "Desserts"];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (itemId: string, qty: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + qty,
    }));
    setSelectedItem(null);
    setQuantity(1);
  };

  const cartTotal = Object.entries(cart).reduce((total, [itemId, qty]) => {
    const item = menuItems.find((i) => i.id === itemId);
    return total + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-background/30 to-transparent">
        <h2 className="text-3xl font-bold text-neutral mb-2 tracking-tight">Our Menu</h2>
        <p className="text-gray-600">Handcrafted dishes made with passion</p>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="relative h-40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                ${item.price}
              </div>
              {cart[item.id] && (
                <div className="absolute top-3 left-3 bg-accent2 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {cart[item.id]}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-neutral text-lg">{item.name}</h3>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.prepTime}
                </div>
                {item.spiceLevel && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-3 h-3 text-accent1 fill-accent1" />
                    ))}
                  </div>
                )}
              </div>

              {item.dietary && (
                <div className="flex gap-2 mt-2">
                  {item.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-accent2/10 text-accent2 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral mb-1">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    ${selectedItem.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedItem.prepTime}
                  </div>
                  {selectedItem.spiceLevel && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: selectedItem.spiceLevel }).map((_, i) => (
                        <Flame key={i} className="w-4 h-4 text-accent1 fill-accent1" />
                      ))}
                      <span className="ml-1">Spicy</span>
                    </div>
                  )}
                </div>

                {selectedItem.dietary && (
                  <div className="flex gap-2 mb-6">
                    {selectedItem.dietary.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-accent2/10 text-accent2 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-neutral">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(selectedItem.id, quantity)}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-medium shadow-lg shadow-primary/30 hover:shadow-xl transition-all"
                >
                  Add to Order • ${(selectedItem.price * quantity).toFixed(2)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Summary */}
      {Object.keys(cart).length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-20 left-6 right-6 bg-neutral text-white p-4 rounded-2xl shadow-2xl z-40"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">
                {Object.values(cart).reduce((a, b) => a + b, 0)} items
              </p>
              <p className="text-xl font-bold">${cartTotal.toFixed(2)}</p>
            </div>
            <a
              href={`https://wa.me/15551234567?text=Hi! I'd like to order: ${Object.entries(cart)
                .map(([itemId, qty]) => {
                  const item = menuItems.find((i) => i.id === itemId);
                  return `${qty}x ${item?.name}`;
                })
                .join(", ")}. Total: $${cartTotal.toFixed(2)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent2 text-white px-6 py-3 rounded-xl font-medium hover:bg-accent2/90 transition-colors"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
