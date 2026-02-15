import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2,
  ArrowRight,
  Send,
  Loader2,
  Bus, Plane, UserCheck, Map as MapIcon, Hotel, GraduationCap, Users, Calendar,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SERVICES, FLEET, WHY_CHOOSE_US, INDUSTRIES } from './constants.tsx';
import { getAIQuoteAdvice } from './geminiService.ts';

const IconMap: Record<string, any> = {
  Plane, UserCheck, Map: MapIcon, Bus, Users, GraduationCap, Hotel, Calendar
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const advice = await getAIQuoteAdvice(aiInput);
    setAiResponse(advice || '');
    setIsAiLoading(false);
  };

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Contact', href: '#contact' },
  ];

  const COMPANY_NAME = "Axis Passenger Transport";
  const LOCATION_NAME = "Dubai, UAE";
  const CONTACT_PHONE = "+44 7882 414162";
  const CONTACT_EMAIL = "info@axis-transport.ae";
  const waPhone = CONTACT_PHONE.replace(/[^\d]/g, '');

  return (
    <div className="min-h-screen font-sans flex flex-col overflow-x-hidden antialiased selection:bg-gold selection:text-navy">
      <div className="bg-navy text-white text-[10px] md:text-xs py-2 px-4 md:px-12 flex justify-between items-center border-b border-white/10 relative z-[60]">
        <div className="flex gap-4 md:gap-6">
          <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 hover:text-gold transition-colors font-bold">
            <Phone size={12} /> <span>{CONTACT_PHONE}</span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors font-bold">
            <Mail size={12} /> <span>{CONTACT_EMAIL}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline opacity-60 uppercase tracking-widest font-black">{LOCATION_NAME}</span>
          <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-green-700 transition-colors font-black text-[9px] uppercase tracking-tighter shadow-lg shadow-green-900/20">
            <MessageCircle size={12} /> WhatsApp Support
          </a>
        </div>
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white shadow-2xl py-3 mt-0 border-b border-slate-100' 
          : 'bg-transparent py-6 mt-10'
      }`}>
        {!scrolled && <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent -z-10 h-32 pointer-events-none" />}
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${scrolled ? 'bg-navy text-gold shadow-lg shadow-navy/10' : 'bg-gold text-navy shadow-xl shadow-gold/20'}`}>
              <Bus size={28} />
            </div>
            <div>
              <h1 className={`font-black text-xl md:text-2xl leading-none tracking-tighter transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>{COMPANY_NAME}</h1>
              <p className={`text-[9px] font-black tracking-[0.3em] transition-colors duration-300 mt-1 uppercase ${scrolled ? 'text-slate-500' : 'text-gold'}`}>PREMIUM TRANSPORT SOLUTIONS</p>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`font-black text-[11px] tracking-widest uppercase transition-all duration-300 relative group ${
                  scrolled ? 'text-navy hover:text-gold' : 'text-white hover:text-gold'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all duration-300 ${
                scrolled 
                  ? 'bg-navy text-white hover:bg-gold hover:text-navy shadow-lg' 
                  : 'bg-gold text-navy hover:bg-white shadow-2xl'
              }`}
            >
              GET A QUOTE
            </motion.a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`lg:hidden p-3 rounded-xl transition-colors duration-300 ${scrolled ? 'text-navy bg-slate-100' : 'text-white bg-white/10'}`}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden flex flex-col p-8 gap-5 overflow-hidden border-t border-slate-100 rounded-b-[2rem]"
            >
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-navy font-black text-xl border-b border-slate-50 pb-4 hover:text-gold transition-colors flex justify-between items-center"
                >
                  {item.name}
                  <ChevronRight size={20} className="text-slate-300" />
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="bg-navy text-white text-center py-5 rounded-[1.5rem] font-black text-lg hover:bg-gold hover:text-navy transition-all shadow-xl active:scale-95 uppercase tracking-widest mt-4"
              >
                REQUEST A QUOTE
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header id="home" ref={heroRef} className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=90&w=1920" 
            alt="Professional Transport" 
            className="w-full h-full object-cover scale-110 brightness-50"
          />
          <div className="absolute inset-0 bg-navy/40"></div>
        </motion.div>

        <motion.div 
          style={{ y: contentY }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full pt-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl text-white"
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest mb-10 uppercase">
              <ShieldCheck size={14} className="text-gold" /> PROFESSIONAL CARRIER
            </div>
            
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] drop-shadow-xl">
              Smart Bus Rentals <br />
              <span className="text-gold">for Modern Business</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-medium max-w-2xl opacity-90 border-l-4 border-gold pl-6">
              Reliable, safe, and luxury passenger transport solutions across the UAE. We set the standard for corporate and group travel in Dubai.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#fleet" 
                className="bg-gold text-navy px-10 py-5 rounded-2xl font-black text-center text-base md:text-lg hover:bg-white transition-all shadow-xl uppercase tracking-widest"
              >
                EXPLORE FLEET
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-black text-center text-base md:text-lg hover:border-white transition-all shadow-xl uppercase tracking-widest"
              >
                CONTACT US
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold tracking-widest uppercase">Scroll Down</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent rounded-full" />
        </motion.div>
      </header>

      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="text-gold font-black tracking-[0.3em] text-xs mb-6 uppercase">OUR EXPERTISE</h2>
            <h3 className="text-navy font-heading text-4xl md:text-5xl mb-8">Professional Services</h3>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {SERVICES.map((service) => {
              const IconComp = IconMap[service.icon];
              return (
                <motion.div 
                  key={service.id}
                  variants={fadeInUp}
                  className="group p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-navy hover:border-navy transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                    <IconComp size={100} className="text-navy group-hover:text-gold" />
                  </div>
                  <div className="bg-white group-hover:bg-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-md transition-all duration-500 border border-slate-100 group-hover:border-gold">
                    <IconComp className="text-navy transition-all duration-500 group-hover:scale-110" size={32} />
                  </div>
                  <h4 className="font-bold text-xl mb-4 leading-tight text-navy group-hover:text-white transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed mb-8 flex-grow transition-colors">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-gold font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 group-hover:text-gold">
                    Get Details 
                    <div className="ml-2 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="fleet" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-gold font-black tracking-[0.3em] text-xs mb-6 uppercase">OUR PREMIUM FLEET</h2>
            <h3 className="text-navy font-heading text-4xl md:text-5xl mb-8">Modern Fleet</h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium opacity-80">Highly maintained vehicles ensuring comfort and safety for every passenger.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {FLEET.map((vehicle, idx) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-1/2 relative min-h-[280px] overflow-hidden bg-slate-200">
                  <img 
                    src={vehicle.imageUrl} 
                    alt={vehicle.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                    }}
                  />
                  <div className="absolute top-6 left-6 bg-navy/90 text-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/10">
                    {vehicle.capacity}
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors tracking-tight">{vehicle.name}</h4>
                    <ul className="space-y-3 mb-8">
                      {vehicle.features.slice(0, 4).map(f => (
                        <li key={f} className="text-slate-600 text-sm flex items-center gap-3 font-medium">
                          <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Quality Verified</span>
                      <span className="text-[9px] font-black text-navy bg-gold/20 px-3 py-1 rounded-full uppercase">Certified 2025</span>
                    </div>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="#contact"
                      className="block w-full text-center bg-navy text-white py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-lg"
                    >
                      BOOK NOW
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 bg-navy rounded-[3rem] p-10 md:p-20 text-white overflow-hidden relative shadow-2xl"
          >
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-3 bg-gold/20 text-gold px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-10 uppercase border border-gold/30">
                  <Loader2 className={isAiLoading ? "animate-spin" : ""} size={16} /> SMART ASSISTANT
                </div>
                <h3 className="text-4xl md:text-5xl font-heading mb-10 leading-none">Not sure <br />which vehicle?</h3>
                <p className="text-slate-300 text-lg mb-10 font-medium opacity-80 leading-relaxed max-w-lg">
                  Tell our AI assistant your requirements and get a personalized recommendation instantly.
                </p>
                <form onSubmit={handleAiAsk} className="relative max-w-xl group">
                  <input 
                    type="text" 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g. 30 people for a 2-day tour..." 
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-bold text-lg"
                  />
                  <button type="submit" disabled={isAiLoading} className="absolute right-2 top-2 bottom-2 bg-gold text-navy px-8 rounded-xl font-black hover:scale-105 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-gold/20 tracking-widest uppercase text-xs">
                    {isAiLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "ADVISE ME"}
                  </button>
                </form>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem] min-h-[300px] flex items-center justify-center shadow-inner relative group/box overflow-hidden">
                  <AnimatePresence mode="wait">
                    {aiResponse ? (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-center relative z-10"
                      >
                        <p className="italic text-slate-100 text-xl md:text-2xl leading-relaxed mb-8 font-bold tracking-tight">"{aiResponse}"</p>
                        <div className="w-20 h-1 bg-gold mx-auto rounded-full shadow-lg shadow-gold/50"></div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center opacity-20 group-hover/box:opacity-30 transition-opacity"
                      >
                        <Bus size={80} className="mx-auto mb-6 text-gold" />
                        <p className="text-lg font-black uppercase tracking-[0.4em]">Awaiting Input</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100"
          >
            <div className="lg:w-1/3 bg-navy text-white p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none group">
                <Bus size={400} className="rotate-12 transition-transform duration-1000 group-hover:rotate-0" />
              </div>
              <h2 className="text-4xl font-heading mb-10 relative z-10 leading-none">Get Your <br /><span className="text-gold">Quote</span> Today</h2>
              <p className="text-slate-300 text-lg mb-12 leading-relaxed opacity-70 font-medium">Professional consultants standing by 24/7 to plan your transportation needs.</p>
              <div className="space-y-12 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="bg-gold text-navy p-4 rounded-xl shadow-xl shadow-gold/20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Direct Line</p>
                    <p className="text-xl font-black">{CONTACT_PHONE}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-gold text-navy p-4 rounded-xl shadow-xl shadow-gold/20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Corporate Email</p>
                    <p className="text-xl font-black truncate">{CONTACT_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-12 md:p-16 bg-white relative">
              <h3 className="text-3xl font-black text-navy mb-10 tracking-tighter uppercase">Inquiry Form</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-black text-lg" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-black text-lg" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Requirement Details</label>
                  <textarea rows={4} className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-black text-lg resize-none" placeholder="Describe your passenger count, routes, and timings..."></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 30px -10px rgba(0, 31, 63, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-navy text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-gold hover:text-navy transition-all flex items-center justify-center gap-4 group shadow-xl uppercase tracking-widest"
                >
                  SEND INQUIRY <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-navy text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-gold p-3 rounded-2xl shadow-xl shadow-gold/20">
                  <Bus className="text-navy" size={28} />
                </div>
                <h1 className="font-black text-3xl tracking-tighter uppercase">{COMPANY_NAME}</h1>
              </div>
              <p className="text-slate-400 max-w-md mb-12 text-lg leading-relaxed font-bold opacity-80">
                A premier choice for safe, luxury, and dependable passenger transportation solutions across the UAE.
              </p>
              <div className="flex gap-4">
                {['FB', 'LI', 'IG', 'TW'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all border border-white/10 group font-black text-[10px] tracking-tighter">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.4em] text-gold mb-10">QUICK LINKS</h4>
              <ul className="space-y-4 text-slate-300 font-black text-sm uppercase tracking-widest">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
                <li><a href="#fleet" className="hover:text-gold transition-colors">Fleet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.4em] text-gold mb-10">CONNECT</h4>
              <ul className="space-y-4 text-slate-300 font-black text-sm uppercase tracking-widest">
                <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
                <li><a href={`tel:${CONTACT_PHONE}`} className="hover:text-gold transition-colors">Sales</a></li>
                <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} {COMPANY_NAME} - All Rights Reserved.</p>
              <p className="mt-1 opacity-30">Dubai, United Arab Emirates</p>
            </div>
            <div className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">
              Powered by <a href="https://www.nexaforgetech.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Nexaforge Technologies</a>
            </div>
          </div>
        </div>

        <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
          <motion.a 
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href={`https://wa.me/${waPhone}`} 
            className="bg-green-600 text-white p-5 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20"
          >
            <MessageCircle size={32} fill="white" className="text-green-600" />
          </motion.a>
        </div>
      </footer>
    </div>
  );
}