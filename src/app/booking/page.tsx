'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Calendar, MapPin, Clock, CreditCard, CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import Image from 'next/image';

const steps = ['Details', 'Confirm', 'Payment'];

function BookingContent() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');

  const [currentStep, setCurrentStep] = React.useState(0);
  const [car, setCar] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    dropDate: '',
    dropTime: '10:00',
  });

  React.useEffect(() => {
    if (carId) {
      const fetchCar = async () => {
        try {
          const res = await fetch(`/api/cars`);
          const data = await res.json();
          const selectedCar = data.find((c: any) => c._id === carId);
          setCar(selectedCar);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCar();
    } else {
       setLoading(false);
    }
  }, [carId]);

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.dropDate) return 1;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.dropDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalPrice = car ? car.pricePerDay * calculateDays() : 0;

  const handlePayment = async () => {
    if (!car || !carId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId,
          carName: car.name,
          pricePerDay: car.pricePerDay,
          days: calculateDays(),
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation || formData.pickupLocation,
          pickupDate: formData.pickupDate,
          dropDate: formData.dropDate,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  if (loading) return <div className="min-h-screen bg-brand-charcoal flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-neon border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <main className="min-h-screen pt-32 pb-20 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <motion.div
                  animate={{ 
                    backgroundColor: idx <= currentStep ? '#7CFF00' : 'rgba(255,255,255,0.05)',
                    color: idx <= currentStep ? '#0F0F0F' : 'rgba(255,255,255,0.3)',
                    scale: idx === currentStep ? 1.2 : 1
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold border border-white/10"
                >
                  {idx < currentStep ? <CheckCircle size={24} /> : idx + 1}
                </motion.div>
                <span className={cn("text-xs font-bold uppercase tracking-widest", idx <= currentStep ? "text-brand-neon" : "text-white/20")}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-[2px] bg-white/5 -z-0">
             <motion.div 
               animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
               className="h-full bg-brand-neon shadow-lg shadow-brand-neon/50" 
             />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
             <AnimatePresence mode="wait">
               {currentStep === 0 && (
                 <motion.div
                   key="step0"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                 >
                   <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
                      <h2 className="text-3xl font-black text-white italic uppercase mb-8 tracking-tighter">Your <span className="text-brand-neon">Journey Details</span></h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <MapPin size={14} className="text-brand-neon" /> Pick-up Location
                           </label>
                           <input 
                             type="text" 
                             placeholder="Search city, airport, etc."
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-brand-neon transition-colors"
                             value={formData.pickupLocation}
                             onChange={e => setFormData({...formData, pickupLocation: e.target.value})}
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <MapPin size={14} className="text-brand-neon" /> Drop Location
                           </label>
                           <input 
                             type="text" 
                             placeholder="Same as pick-up"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-brand-neon transition-colors"
                             value={formData.dropLocation}
                             onChange={e => setFormData({...formData, dropLocation: e.target.value})}
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <Calendar size={14} className="text-brand-neon" /> Pick-up Date
                           </label>
                           <input 
                             type="date" 
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-brand-neon transition-colors"
                             value={formData.pickupDate}
                             onChange={e => setFormData({...formData, pickupDate: e.target.value})}
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <Calendar size={14} className="text-brand-neon" /> Drop Date
                           </label>
                           <input 
                             type="date" 
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-brand-neon transition-colors"
                             value={formData.dropDate}
                             onChange={e => setFormData({...formData, dropDate: e.target.value})}
                           />
                         </div>
                      </div>
                   </div>
                 </motion.div>
               )}

               {currentStep === 1 && (
                 <motion.div
                   key="step1"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                 >
                   <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
                      <h2 className="text-3xl font-black text-white italic uppercase mb-8 tracking-tighter">Review <span className="text-brand-neon">Booking</span></h2>
                      <div className="space-y-6">
                         <div className="flex justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Pickup</span>
                            <span className="text-white font-bold">{formData.pickupLocation} — {formData.pickupDate}</span>
                         </div>
                         <div className="flex justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Drop</span>
                            <span className="text-white font-bold">{formData.dropLocation || formData.pickupLocation} — {formData.dropDate}</span>
                         </div>
                         <div className="flex justify-between p-6 bg-brand-neon/10 rounded-3xl border border-brand-neon/20">
                            <span className="text-brand-neon font-bold uppercase tracking-widest text-xs">Total Duration</span>
                            <span className="text-brand-neon font-bold">{calculateDays()} Days</span>
                         </div>
                      </div>
                   </div>
                 </motion.div>
               )}

               {currentStep === 2 && (
                 <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl flex flex-col items-center justify-center text-center py-20"
                 >
                    <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mb-10 shadow-3xl shadow-brand-neon/40">
                       <CreditCard size={40} className="text-brand-charcoal" />
                    </div>
                    <h2 className="text-4xl font-black text-white italic uppercase mb-4 tracking-tighter">Ready to <span className="text-brand-neon">Payment</span></h2>
                    <p className="text-white/40 mb-12 max-w-sm">Secure checkout powered by Stripe. Your adventure starts in a few clicks.</p>
                    <button 
                      onClick={handlePayment}
                      disabled={loading}
                      className="bg-brand-neon text-brand-charcoal px-12 py-5 rounded-full font-black text-xl hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20 disabled:opacity-50"
                    >
                       {loading ? 'Processing...' : `Pay ${formatPrice(totalPrice)}`}
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* Navigation Buttons */}
             <div className="mt-12 flex justify-between">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 font-bold px-8 py-4 rounded-full border border-white/10 transition-all",
                    currentStep === 0 ? "opacity-0 invisible" : "text-white/40 hover:text-white"
                  )}
                >
                  <ChevronLeft size={20} /> Back
                </button>
                {currentStep < steps.length - 1 && (
                  <button 
                    onClick={handleNext}
                    className="bg-brand-neon text-brand-charcoal px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-brand-lime transition-all"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                )}
             </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
             <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl sticky top-32">
                <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Booking Summary</h3>
                
                {car ? (
                  <div className="space-y-8">
                     <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10">
                        <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                     </div>
                     <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">{car.brand}</p>
                        <h4 className="text-2xl font-black text-white">{car.name}</h4>
                     </div>
                     
                     <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-sm">
                           <span className="text-white/40">Daily Rate</span>
                           <span className="text-white font-bold">{formatPrice(car.pricePerDay)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-white/40">Duration</span>
                           <span className="text-white font-bold">{calculateDays()} Days</span>
                        </div>
                        <div className="flex justify-between text-2xl pt-6 border-t border-white/10">
                           <span className="font-black text-white italic">TOTAL</span>
                           <span className="font-black text-brand-neon">{formatPrice(totalPrice)}</span>
                        </div>
                     </div>
                  </div>
                ) : (
                  <p className="text-white/20 italic text-center py-20">No vehicle selected.<br/>Go back to fleet to pick one.</p>
                )}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-brand-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-neon animate-spin" />
      </div>
    }>
      <BookingContent />
    </React.Suspense>
  );
}

