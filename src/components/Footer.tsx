import React, { useState } from 'react';
import { Sparkles, Mail, Check, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      
      {/* 1. VIP Club Newsletter Strip */}
      <div className="border-b border-stone-800 bg-stone-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Join The Sunshine Club
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Enjoy 10% Off Your First Order
            </h3>
            <p className="text-xs text-stone-400">
              Plus receive exclusive VIP access to seasonal clearance events and sleep wellness tips.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className={`px-6 py-3 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                subscribed 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              {subscribed ? 'Discount Sent!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Navigation & Company Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                SUNSHINE <span className="font-normal italic text-amber-400">COMFORTS</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              Sunshine Comforts is a proudly British home textile brand committed to crafting five-star hotel comfort for every home. From pure 1000-thread Egyptian cotton to cloud-soft 10cm mattress toppers, your perfect night’s sleep starts here.
            </p>

            <div className="space-y-1.5 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>UK Freephone: <strong className="text-white">0800 321 8920</strong> (Mon-Fri 9-5)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email: support@sunshinecomforts.co.uk</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Sunshine Comforts Ltd, London, United Kingdom</span>
              </p>
            </div>
          </div>

          {/* Customer Service Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors cursor-pointer text-left">
                  UK Bedding Size Guide
                </button>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Delivery & Shipping (DPD)
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  30-Night Sleep Trial
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Shop Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Popular Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => { onSelectCategory('bedding'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Egyptian Cotton Duvet Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('toppers'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  10cm Baffle Box Toppers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('pillows'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bounce-Back Hotel Pillows
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('sheets'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  40cm Extra Deep Sheets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('curtains'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Thermal Velvet Curtains
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('bath'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  700 GSM Towel Bales
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Accreditations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Peace of Mind
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-emerald-400 font-bold block">★ Trustpilot 4.9 / 5</span>
                <p className="text-[11px] text-stone-400">Based on 12,400+ verified British customer reviews</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-amber-400 font-bold block">OEKO-TEX® Standard 100</span>
                <p className="text-[11px] text-stone-400">Tested and certified free of toxic chemicals</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Accepted Payment Badges Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-stone-500 mr-2">Accepted Payment Methods:</span>
            {['VISA', 'Mastercard', 'Maestro', 'PayPal', 'Klarna', 'ClearPay', 'Apple Pay', 'Google Pay'].map((pm) => (
              <span 
                key={pm}
                className="px-2.5 py-1 bg-stone-800 text-stone-300 rounded text-[10px] font-bold tracking-wider border border-stone-700 shadow-2xs"
              >
                {pm}
              </span>
            ))}
          </div>

          <div className="text-xs text-stone-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Secured Encryption</span>
          </div>
        </div>

        {/* 4. Bottom Legal Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 Sunshine Comforts UK Ltd. Company No. 09842109. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-stone-300">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-stone-300">Terms & Conditions</a>
            <span>·</span>
            <a href="#terms" className="hover:text-stone-300">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
