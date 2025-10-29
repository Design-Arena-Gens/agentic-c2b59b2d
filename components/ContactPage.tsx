"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-background/30 to-transparent">
        <h2 className="text-3xl font-bold text-neutral mb-2 tracking-tight">Contact Us</h2>
        <p className="text-gray-600">We&apos;d love to hear from you</p>
      </div>

      {/* Quick Contact Cards */}
      <div className="px-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="tel:+15551234567"
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral mb-1">Phone</h3>
            <p className="text-gray-600">(555) 123-4567</p>
            <p className="text-sm text-primary mt-1">Tap to call</p>
          </div>
        </a>

        <a
          href="https://wa.me/15551234567"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-accent2/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-accent2" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral mb-1">WhatsApp</h3>
            <p className="text-gray-600">Chat with us</p>
            <p className="text-sm text-accent2 mt-1">Available 24/7</p>
          </div>
        </a>

        <a
          href="mailto:info@localbistro.com"
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-accent1/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-accent1" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral mb-1">Email</h3>
            <p className="text-gray-600">info@localbistro.com</p>
            <p className="text-sm text-accent1 mt-1">We reply within 24hrs</p>
          </div>
        </a>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral mb-1">Address</h3>
            <p className="text-gray-600">123 Main Street</p>
            <p className="text-gray-600">Downtown, CA 90210</p>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent2/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent2" />
            </div>
            <h3 className="text-xl font-bold text-neutral">Opening Hours</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Monday - Thursday</span>
              <span className="font-semibold text-neutral">11:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Friday - Saturday</span>
              <span className="font-semibold text-neutral">11:00 AM - 11:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Sunday</span>
              <span className="font-semibold text-neutral">10:00 AM - 9:00 PM</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-accent2/5 rounded-xl">
            <p className="text-sm text-accent2 font-medium">
              🎉 Happy Hour: Mon-Fri 4-6 PM • 30% off appetizers & drinks
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-xl font-bold text-neutral">Find Us</h3>
          </div>
          <div className="relative h-64 bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8!2d-118.243683!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant location"
            />
          </div>
          <div className="p-4">
            <a
              href="https://maps.google.com/?q=123+Main+Street+Downtown+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Parking & Accessibility */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-neutral mb-4">Good to Know</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent2 rounded-full mt-1.5" />
              <p className="text-gray-700">Free valet parking available</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent2 rounded-full mt-1.5" />
              <p className="text-gray-700">Wheelchair accessible entrance and restrooms</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent2 rounded-full mt-1.5" />
              <p className="text-gray-700">Free WiFi for all guests</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent2 rounded-full mt-1.5" />
              <p className="text-gray-700">Private dining room available for events</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-3">Ready to Visit?</h3>
          <p className="text-white/90 mb-6">
            We&apos;re here to serve you. Chat with us on WhatsApp for instant assistance.
          </p>
          <a
            href="https://wa.me/15551234567?text=Hi! I have a question about..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
