import React from 'react';
import { X, Check } from 'lucide-react';
import { UK_SIZE_GUIDE } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
              British Standard Bedding
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Sunshine Comforts UK Bedding Size Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-stone-600 leading-relaxed">
            All Sunshine Comforts bedding products are crafted strictly according to British Standard dimensions (BS 1377). Please use the sizing guide below to ensure your new duvet covers, fitted sheets, and mattress toppers fit your bed with bespoke perfection.
          </p>

          {/* Sizing Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-900 border-b border-stone-200">
                <tr>
                  <th className="p-3 font-bold">UK Bed Size</th>
                  <th className="p-3 font-semibold">Mattress Size</th>
                  <th className="p-3 font-semibold">Duvet Cover</th>
                  <th className="p-3 font-semibold">Fitted Sheet Wall</th>
                  <th className="p-3 font-semibold">Mattress Topper</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {UK_SIZE_GUIDE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                    <td className="p-3 font-bold text-stone-900">{row.type}</td>
                    <td className="p-3 font-mono">{row.mattress}</td>
                    <td className="p-3 font-mono">{row.duvet}</td>
                    <td className="p-3 font-mono">{row.fittedSheet}</td>
                    <td className="p-3 font-mono">{row.topper}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Helpful Fitting Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1.5">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-700" />
                Why 40cm Extra Deep Fitted Sheets?
              </h4>
              <p className="text-stone-600 leading-relaxed">
                Standard sheets only have a 25-30cm box depth. If you have a modern hybrid mattress or add our 10cm mattress topper, standard sheets pop off. Sunshine Comforts 40cm sheets tuck completely under, staying locked in place all night.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 space-y-1.5">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-stone-700" />
                Hotel Bedding Tip: Size Up for Drape
              </h4>
              <p className="text-stone-600 leading-relaxed">
                For that lavish five-star hotel look where the duvet gracefully waterfalls down the sides of the bed, our interior designers recommend sizing your duvet cover one size up (e.g. King duvet for a Double bed).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
