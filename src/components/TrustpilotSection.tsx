import React, { useState } from 'react';
import { Star, CheckCircle2, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const TrustpilotSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'topper' | 'duvet' | 'pillow'>('all');

  const filteredReviews = REVIEWS.filter(r => {
    if (filter === 'topper') return r.productName.toLowerCase().includes('topper');
    if (filter === 'duvet') return r.productName.toLowerCase().includes('duvet');
    if (filter === 'pillow') return r.productName.toLowerCase().includes('pillow');
    return true;
  });

  return (
    <section className="py-14 sm:py-20 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trustpilot Brand Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="text-center md:text-left space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="text-emerald-700 font-bold tracking-tight text-xl sm:text-2xl flex items-center gap-1.5">
                ★ Trustpilot
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                Excellent 4.9 / 5
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Loved by Over 120,000 British Homes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Real reviews from real UK customers who upgraded their sleep with Sunshine Comforts.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('topper')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'topper' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mattress Toppers
            </button>
            <button
              onClick={() => setFilter('duvet')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'duvet' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Egyptian Duvets
            </button>
            <button
              onClick={() => setFilter('pillow')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'pillow' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hotel Pillows
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* Star rating banner in Trustpilot green */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="w-5 h-5 bg-[#00B67A] text-white flex items-center justify-center text-xs font-bold rounded-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                  "{rev.title}"
                </h4>

                {/* Review Body */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-3 border-t border-stone-100 flex flex-col space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{rev.author}</span>
                  <span className="text-[10px] text-stone-400">{rev.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified UK Buyer</span>
                </div>

                <p className="text-[10px] text-stone-400 truncate pt-0.5">
                  Item: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
