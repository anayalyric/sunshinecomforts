import React from 'react';
import { Sparkles, ShieldCheck, RotateCcw, Truck, Award, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: '100% Long-Staple Egyptian Cotton',
      description: 'We exclusively source genuine combed long-staple cotton for unmatched softness, natural temperature regulation, and durability that lasts for decades.'
    },
    {
      icon: RotateCcw,
      title: '30-Night Risk-Free Sleep Trial',
      description: 'Sleep on your new Sunshine Comforts bedding for a full 30 nights. If it does not improve your sleep quality, we will collect it and issue a full refund.'
    },
    {
      icon: ShieldCheck,
      title: 'OEKO-TEX® Standard 100 Certified',
      description: 'Zero harsh dyes, heavy metals, or irritating formaldehyde. Tested against 350+ toxic substances to be 100% skin-safe for the whole family.'
    },
    {
      icon: Truck,
      title: 'Free UK Tracked Delivery Over £35',
      description: 'Orders placed before 2:00 PM are dispatched same-day with DPD / Royal Mail with live 1-hour delivery slot tracking direct to your mobile.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            The Sunshine Comforts Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Crafted for Unrivalled Sleep Quality
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            By eliminating expensive retail middlemen, we deliver prestigious five-star hotel bedding directly to British bedrooms at fair, honest prices.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-stone-50/70 p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-colors shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                  <span>British Heritage</span>
                  <span>·</span>
                  <span>London, UK</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
