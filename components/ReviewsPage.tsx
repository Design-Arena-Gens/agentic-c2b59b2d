"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Camera, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  image?: string;
  helpful: number;
}

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely phenomenal! The truffle risotto was divine, and the service was impeccable. Can't wait to come back!",
    image: "https://images.unsplash.com/photo-1476124369491-f6e5c4f3edd8?w=400&q=80",
    helpful: 12,
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 5,
    date: "1 week ago",
    text: "Best dining experience in the city. The chef's attention to detail is remarkable. Every dish was a work of art.",
    helpful: 8,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    rating: 4,
    date: "2 weeks ago",
    text: "Great ambiance and delicious food. The salmon was perfectly cooked. Only minor issue was a slight wait, but worth it!",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80",
    helpful: 5,
  },
  {
    id: "4",
    name: "David Thompson",
    rating: 5,
    date: "3 weeks ago",
    text: "Celebrated our anniversary here. The staff went above and beyond to make it special. Highly recommend!",
    helpful: 15,
  },
  {
    id: "5",
    name: "Lisa Martinez",
    rating: 5,
    date: "1 month ago",
    text: "The chocolate soufflé is to die for! Entire meal was exceptional. Will be bringing all my friends here.",
    helpful: 6,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  const handleSubmitReview = () => {
    if (newRating > 0 && newReviewText.trim() && reviewerName.trim()) {
      const newReview: Review = {
        id: Date.now().toString(),
        name: reviewerName,
        rating: newRating,
        date: "Just now",
        text: newReviewText,
        helpful: 0,
      };
      setReviews([newReview, ...reviews]);
      setIsWritingReview(false);
      setNewRating(0);
      setNewReviewText("");
      setReviewerName("");
    }
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-background/30 to-transparent">
        <h2 className="text-3xl font-bold text-neutral mb-2 tracking-tight">Reviews</h2>
        <p className="text-gray-600">What our guests are saying</p>
      </div>

      {/* Rating Summary */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-5xl font-bold text-neutral mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? "fill-accent1 text-accent1"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>

            <button
              onClick={() => setIsWritingReview(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Write Review
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm w-3">{stars}</span>
                <Star className="w-4 h-4 fill-accent1 text-accent1" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent1"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-6 space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-neutral">{review.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-accent1 text-accent1"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.text}</p>

            {review.image && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <img
                  src={review.image}
                  alt="Review"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <button
              onClick={() => handleHelpful(review.id)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWritingReview(false)}
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
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral">Write a Review</h3>
                <button
                  onClick={() => setIsWritingReview(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral mb-3">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewRating(i + 1)}
                        onMouseEnter={() => setHoveredRating(i + 1)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            i < (hoveredRating || newRating)
                              ? "fill-accent1 text-accent1"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  disabled={!newRating || !newReviewText.trim() || !reviewerName.trim()}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
