"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, MapPin, MessageCircle, Check } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks } from "date-fns";

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [seating, setSeating] = useState<"indoor" | "outdoor">("indoor");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  };

  const availableTimes = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "5:00 PM",
    "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
  ];

  const handleBooking = () => {
    const id = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setBookingId(id);
    setStep(3);

    // Open WhatsApp with booking details
    const message = encodeURIComponent(
      `Hi! I'd like to make a reservation:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Date: ${selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}\n` +
      `Time: ${selectedTime}\n` +
      `Party Size: ${partySize}\n` +
      `Seating: ${seating}\n` +
      `Notes: ${notes || "None"}\n\n` +
      `Booking ID: ${id}`
    );
    window.open(`https://wa.me/15551234567?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-background/30 to-transparent">
        <h2 className="text-3xl font-bold text-neutral mb-2 tracking-tight">Book a Table</h2>
        <p className="text-gray-600">Reserve your dining experience</p>
      </div>

      {/* Progress Indicator */}
      {step < 3 && (
        <div className="px-6 mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? "w-12 bg-primary" : s < step ? "w-2 bg-primary" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="px-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-neutral mb-3">
              Select Date
            </label>
            <div className="grid grid-cols-7 gap-2">
              {generateDates().map((date) => {
                const isSelected = selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                return (
                  <button
                    key={date.toString()}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center transition-all ${
                      isSelected
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white border border-gray-200 hover:border-primary"
                    }`}
                  >
                    <span className="text-xs">{format(date, "EEE")}</span>
                    <span className="text-lg font-semibold">{format(date, "d")}</span>
                    {isToday && !isSelected && (
                      <span className="text-xs text-accent2">Today</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-3">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    selectedTime === time
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white border border-gray-200 hover:border-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-3">
              Party Size
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPartySize(Math.max(1, partySize - 1))}
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-xl">−</span>
              </button>
              <div className="flex-1 text-center">
                <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
                <span className="text-2xl font-bold">{partySize}</span>
              </div>
              <button
                onClick={() => setPartySize(partySize + 1)}
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-3">
              Seating Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSeating("indoor")}
                className={`py-4 rounded-xl font-medium transition-all ${
                  seating === "indoor"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:border-primary"
                }`}
              >
                Indoor
              </button>
              <button
                onClick={() => setSeating("outdoor")}
                className={`py-4 rounded-xl font-medium transition-all ${
                  seating === "outdoor"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:border-primary"
                }`}
              >
                Outdoor
              </button>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-primary text-white py-4 rounded-2xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
          >
            Continue
          </button>
        </motion.div>
      )}

      {/* Step 2: Contact Info */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="px-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, dietary restrictions, special occasions..."
              rows={4}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Booking Summary */}
          <div className="bg-background/50 rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold text-neutral mb-4">Booking Summary</h3>
            <div className="flex items-center gap-3 text-sm">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-5 h-5 text-primary" />
              <span>{partySize} {partySize === 1 ? "person" : "people"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{seating === "indoor" ? "Indoor" : "Outdoor"} seating</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-100 text-neutral py-4 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleBooking}
              disabled={!name || !phone}
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-accent2 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-neutral mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ve received your reservation request
            </p>

            <div className="bg-background/50 rounded-2xl p-6 mb-6 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-semibold">{bookingId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-semibold">
                  {selectedDate ? format(selectedDate, "MMM d") : ""} at {selectedTime}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Party Size</span>
                <span className="font-semibold">{partySize} guests</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/15551234567?text=Booking ID: ${bookingId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent2 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-accent2/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                View on WhatsApp
              </a>

              <button
                onClick={() => {
                  setStep(1);
                  setName("");
                  setPhone("");
                  setSelectedDate(null);
                  setSelectedTime("");
                  setPartySize(2);
                  setSeating("indoor");
                  setNotes("");
                  setBookingId("");
                }}
                className="w-full bg-primary text-white py-4 rounded-2xl font-medium hover:bg-primary/90 transition-colors"
              >
                Make Another Booking
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              You&apos;ll receive a confirmation via WhatsApp shortly
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
