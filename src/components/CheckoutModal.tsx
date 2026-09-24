import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  Package, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: 'client.demo@sunshinecomforts.co.uk',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    address: '14 Richmond Green',
    city: 'London',
    postcode: 'TW9 1QT',
    phone: '07700 900123',
    paymentMethod: 'card'
  });

  const [orderNumber, setOrderNumber] = useState('SC-84291');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate real bank/gateway processing
    setTimeout(() => {
      const generatedOrder = `SC-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep('success');
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-700" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              {step === 'details' ? 'Sunshine Comforts UK Secure Checkout' : 'Order Placed Successfully!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Quick Express Checkout options */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 text-center">
                Express Checkout
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: 'applepay' });
                  }}
                  className="py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: 'klarna' });
                  }}
                  className="py-2.5 bg-[#FFB3C7] hover:bg-[#ff9eb6] text-stone-950 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Klarna. (Pay in 3)</span>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-stone-400 uppercase font-semibold">Or continue with UK standard delivery</span>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                1. Delivery & Contact Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Email for Dispatch Updates</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">UK Mobile (For DPD 1-hr slot)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">UK Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Town / City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">UK Postcode</label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600 uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Payment Method
              </h3>
              
              <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    Credit / Debit Card
                  </span>
                  <div className="flex gap-1 text-[10px] font-bold text-stone-600">
                    <span className="bg-white px-1.5 py-0.5 rounded border border-stone-200">VISA</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-stone-200">MC</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-stone-200">AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1">Card Number (Demo sandbox enabled)</label>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    readOnly
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">Expires</label>
                    <input
                      type="text"
                      defaultValue="09/28"
                      readOnly
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">CVC</label>
                    <input
                      type="text"
                      defaultValue="982"
                      readOnly
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order total & submit */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-stone-700">Total Charged</span>
                <span className="font-bold text-lg text-stone-900 tabular-nums">£{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Securing Order with Bank...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Confirm & Pay £{total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-stone-400">
                By placing an order, you agree to Sunshine Comforts UK Terms & 30-Day Sleep Guarantee.
              </p>
            </div>

          </form>
        ) : (
          /* Order Confirmation Celebration */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                Thank You For Your Order
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Your Sleep Sanctuary Is On Its Way
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto pt-1">
                We've sent a full receipt and tracking notification to <strong className="text-stone-800">{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Estimated UK Delivery:</span>
                <span className="font-semibold text-emerald-800">Tomorrow via DPD Tracked</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-800">{formData.address}, {formData.postcode}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500">Total Paid:</span>
                <span className="font-bold text-stone-900 tabular-nums">£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-full shadow-md transition-colors cursor-pointer"
              >
                Back to Sunshine Comforts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
