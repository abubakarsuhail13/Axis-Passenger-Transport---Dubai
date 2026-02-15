
import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  CheckCircle2,
  ArrowRight,
  Send,
  Loader2,
  Bus, Plane, UserCheck, Map as MapIcon, Hotel, GraduationCap, Users, Calendar,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SERVICES, FLEET, WHY_CHOOSE_US, INDUSTRIES } from './constants';
import { getAIQuoteAdvice } from './geminiService';

const IconMap: Record<string, any> = {
  Plane, UserCheck, Map: MapIcon, Bus, Users, GraduationCap, Hotel, Calendar
};

// Fix: Use 'as const' to ensure 'ease' is inferred as a literal type allowed by Framer Motion instead of a generic string.
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
  
  // Parallax reference for the Hero Section
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // AI Assistant State
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for sticky nav contrast adjustment
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

  return (
    <div className="min-h-screen font-sans flex flex-col overflow-x-hidden antialiased">
      {/* Top Header Contact Bar */}
      <div className="bg-navy text-white text-xs py-2 px-4 md:px-12 flex justify-between items-center border-b border-slate-800 relative z-[60]">
        <div className="flex gap-6">
          <a href="tel:+97140000000" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Phone size={14} /> <span>+971 4 000 0000</span>
          </a>
          <a href="mailto:info@axis-transport.ae" className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors">
            <Mail size={14} /> <span>info@axis-transport.ae</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline opacity-80 uppercase tracking-tighter">Dubai, UAE</span>
          <a href="https://wa.me/97140000000" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-green-700 transition-colors font-semibold">
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white shadow-xl py-3 mt-0 border-b border-slate-100' 
          : 'bg-transparent py-6 mt-8 md:mt-10'
      }`}>
        {/* Subtle overlay for navigation contrast when not scrolled */}
        {!scrolled && <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent -z-10 h-32 pointer-events-none" />}
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 group"
          >
            <div className={`p-2 rounded-xl transition-colors duration-300 ${scrolled ? 'bg-navy text-gold' : 'bg-gold text-navy shadow-lg shadow-gold/20'}`}>
              <Bus size={26} />
            </div>
            <div>
              <h1 className={`font-bold text-xl md:text-2xl leading-none tracking-tight transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>AXIS</h1>
              <p className={`text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-slate-500' : 'text-gold'}`}>TRANSPORT</p>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`font-bold text-sm tracking-wide uppercase transition-all duration-300 relative group ${
                  scrolled ? 'text-navy hover:text-gold' : 'text-white hover:text-gold'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className={`px-7 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                scrolled 
                  ? 'bg-navy text-white hover:bg-gold hover:text-navy shadow-md' 
                  : 'bg-gold text-navy hover:bg-white shadow-lg'
              }`}
            >
              GET A QUOTE
            </motion.a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${scrolled ? 'text-navy bg-slate-100' : 'text-white bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden flex flex-col p-8 gap-5 overflow-hidden border-t border-slate-100"
            >
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-navy font-black text-xl border-b border-slate-50 pb-3 hover:text-gold transition-colors flex justify-between items-center"
                >
                  {item.name}
                  <ChevronRight size={20} className="text-slate-300" />
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="bg-navy text-white text-center py-5 rounded-2xl font-bold text-lg hover:bg-gold hover:text-navy transition-all shadow-lg active:scale-95"
              >
                REQUEST A QUOTE
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header id="home" ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=90&w=1920" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent"></div>
          <div className="absolute inset-0 bg-navy/20"></div>
        </motion.div>

        <motion.div 
          style={{ y: contentY }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full pt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 bg-gold/30 backdrop-blur-sm border border-gold/40 text-white px-5 py-2 rounded-full text-xs font-black tracking-widest mb-8 uppercase">
              <ShieldCheck size={14} className="text-gold" /> PREMIUM TRANSPORT UAE
            </div>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-lg">
              Reliable Bus Rental <br />
              <span className="text-gold">in Dubai</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-100 mb-12 leading-relaxed font-medium max-w-xl">
              Setting the standard for safe, luxury, and professional corporate and school transportation across the Emirates.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#fleet" 
                className="bg-gold text-navy px-10 py-5 rounded-2xl font-black text-center text-lg hover:bg-white transition-all shadow-2xl"
              >
                EXPLORE FLEET
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-black text-center text-lg hover:border-white transition-all"
              >
                CONTACT US
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-gold to-transparent rounded-full" />
        </motion.div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-gold font-black tracking-[0.2em] text-sm mb-4 uppercase">OUR EXPERTISE</h2>
            <h3 className="text-navy font-heading text-4xl md:text-5xl">Professional Transport Services</h3>
            <div className="w-24 h-1.5 bg-gold mx-auto mt-8 rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {SERVICES.map((service) => {
              const IconComp = IconMap[service.icon];
              return (
                <motion.div 
                  key={service.id}
                  variants={fadeInUp}
                  className="group p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:bg-navy hover:border-navy transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden flex flex-col items-start text-left"
                >
                  {/* Background decoration for hover visibility and branding */}
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                    <IconComp size={100} className="text-navy group-hover:text-gold" />
                  </div>
                  
                  {/* Icon container - improved visibility and contrast */}
                  <div className="bg-slate-50 group-hover:bg-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-all duration-300 border border-slate-100 group-hover:border-gold">
                    <IconComp className="text-navy transition-colors group-hover:scale-110" size={32} />
                  </div>
                  
                  <h4 className="font-bold text-2xl mb-4 leading-tight text-navy group-hover:text-white transition-colors">
                    {service.title}
                  </h4>
                  
                  <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed mb-8 flex-grow transition-colors">
                    {service.description}
                  </p>
                  
                  <a href="#contact" className="inline-flex items-center text-gold font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-gold transition-all duration-300">
                    Get Details 
                    <div className="ml-2 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all">
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>

                  {/* Bottom bar indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-transparent group-hover:bg-gold transition-all duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-gold/20 rounded-full blur-3xl -z-10"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" 
                  alt="About Axis Transport" 
                  className="w-full h-auto object-cover hover:scale-105 transition duration-1000"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-navy text-white p-10 rounded-[2rem] z-20 shadow-2xl border-b-4 border-gold hidden sm:block"
              >
                <p className="text-5xl font-black text-gold mb-1">15+</p>
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Years of Excellence</p>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-gold font-black tracking-[0.2em] text-sm mb-6 uppercase">Dubai's Trusted Carrier</h2>
              <h3 className="text-navy font-heading text-4xl md:text-5xl mb-8 leading-tight">Your Partner in Safe & Reliable Transportation</h3>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                Axis Passenger Transport Bus Rent LLC has been a pillar of the Dubai transport community for over a decade. We specialize in providing high-end, reliable transportation that businesses and institutions depend on every single day.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  'Certified RTA Professional Drivers',
                  'State-of-the-Art Vehicle Fleet',
                  'Strict Adherence to Punctuality',
                  'Comprehensive 24/7 Support',
                  'Fully Insured Operations',
                  'Customized Logistics Plans'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                      <CheckCircle2 className="text-gold" size={16} />
                    </div>
                    <span className="font-semibold text-navy text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <motion.a 
                whileHover={{ x: 10 }}
                href="#contact"
                className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gold hover:text-navy transition-all shadow-xl"
              >
                LEARN MORE ABOUT US <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-gold font-black tracking-[0.2em] text-sm mb-4 uppercase">OUR PREMIUM FLEET</h2>
            <h3 className="text-navy font-heading text-4xl md:text-5xl mb-6">Built for Every Journey</h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">From luxury coaches to efficient staff shuttles, our fleet is meticulously maintained to provide a world-class experience.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {FLEET.map((vehicle, idx) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-1/2 relative overflow-hidden group/image">
                  <img 
                    src={vehicle.imageUrl} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/image:scale-110"
                  />
                  
                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-navy/70 backdrop-blur-[3px] opacity-0 group-hover/image:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-white p-8">
                    <div className="text-center">
                      <h4 className="text-3xl font-heading text-gold mb-4 translate-y-6 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-500 delay-100">
                        {vehicle.name}
                      </h4>
                      <div className="flex items-center justify-center gap-3 translate-y-6 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-500 delay-200">
                        <Users size={20} className="text-gold" />
                        <span className="font-bold text-xl tracking-wider">{vehicle.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 bg-navy/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-black group-hover/image:opacity-0 transition-opacity border border-white/10">
                    {vehicle.capacity}
                  </div>
                </div>
                
                <div className="md:w-1/2 p-10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-navy mb-6 group-hover:text-gold transition-colors">{vehicle.name}</h4>
                    <ul className="space-y-3 mb-8">
                      {vehicle.features.slice(0, 4).map(f => (
                        <li key={f} className="text-slate-600 text-sm flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gold/50"></div> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-8 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safe & Secured</span>
                      <span className="text-xs font-bold text-navy bg-gold/10 px-3 py-1 rounded-full">{vehicle.specifications.safety}</span>
                    </div>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="#contact"
                      className="block w-full text-center bg-navy text-white py-4 rounded-2xl font-black text-sm hover:bg-gold hover:text-navy transition-all duration-300 shadow-lg"
                    >
                      BOOK NOW
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Advice Assistant */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-navy rounded-[3.5rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2.5 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-6 uppercase">
                  <Loader2 className={isAiLoading ? "animate-spin" : ""} size={14} /> AI FLEET CONSULTANT
                </div>
                <h3 className="text-4xl md:text-5xl font-heading mb-6">Need help choosing <br /> the right bus?</h3>
                <p className="text-slate-300 text-lg mb-10 font-medium opacity-80 leading-relaxed">
                  Tell our AI assistant about your requirements (passengers, distance, trip type) and get an instant professional recommendation.
                </p>
                
                <form onSubmit={handleAiAsk} className="relative max-w-md">
                  <input 
                    type="text" 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g. 40 staff for daily commute in Dubai..." 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-7 py-5 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all font-medium"
                  />
                  <button type="submit" disabled={isAiLoading} className="absolute right-2 top-2 bottom-2 bg-gold text-navy px-8 rounded-xl font-black hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100">
                    {isAiLoading ? <Loader2 className="animate-spin" /> : "ADVISE ME"}
                  </button>
                </form>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] min-h-[220px] flex items-center justify-center shadow-inner">
                  <AnimatePresence mode="wait">
                    {aiResponse ? (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="italic text-slate-100 text-xl leading-relaxed mb-6 font-medium">"{aiResponse}"</p>
                        <div className="w-12 h-1 bg-gold mx-auto rounded-full"></div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center opacity-30"
                      >
                        <Bus size={64} className="mx-auto mb-6 text-gold" />
                        <p className="text-lg font-bold tracking-wide">Waiting for your requirements...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us & Industries */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gold rounded-full blur-[200px] -mr-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div {...fadeInUp}>
              <h2 className="text-gold font-black tracking-[0.2em] text-sm mb-6 uppercase">THE AXIS ADVANTAGE</h2>
              <h3 className="text-4xl md:text-5xl font-heading mb-14">Why Leading Firms <br />Partner With Us</h3>
              <div className="grid sm:grid-cols-2 gap-10">
                {WHY_CHOOSE_US.map((item) => (
                  <motion.div 
                    key={item.title}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <div className="bg-white/10 p-5 rounded-2xl w-fit mb-6 group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                      <item.icon size={36} />
                    </div>
                    <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-10 flex items-center gap-4">
                <Users className="text-gold" size={32} /> Industries We Serve
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
                {INDUSTRIES.map((industry) => (
                  <div key={industry} className="flex items-center gap-4 p-5 bg-navy border border-white/5 rounded-2xl hover:border-gold/50 transition-all duration-300 group">
                    <div className="w-3 h-3 rounded-full bg-gold shadow-lg shadow-gold/40 group-hover:scale-125 transition-transform"></div>
                    <span className="font-bold text-lg text-slate-200">{industry}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-gradient-to-br from-gold to-yellow-600 rounded-[2rem] text-navy">
                <h4 className="font-black text-2xl mb-3">Customized Logistics</h4>
                <p className="text-sm font-bold opacity-80 mb-6 leading-relaxed">Need a tailored solution for a high-volume operation? Our logistics team designs efficient route plans that save time and fuel.</p>
                <a href="#contact" className="flex items-center gap-3 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all">
                  Discuss your project <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          {/* Fix: Explicitly cast 'ease' to literal to fix TypeScript type mismatch error. */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="bg-slate-50 rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100"
          >
            <div className="lg:w-1/3 bg-navy text-white p-12 md:p-20 relative">
              <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                <Bus size={300} />
              </div>
              <h2 className="text-4xl font-heading mb-10 relative z-10">Start Your <br />Journey</h2>
              <p className="text-slate-300 text-lg mb-16 leading-relaxed opacity-80">Our dedicated transport consultants are available 24/7 to provide detailed quotes and route consultations.</p>
              
              <div className="space-y-12 relative z-10">
                <div className="flex items-start gap-5 group">
                  <div className="bg-gold text-navy p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Direct Line</p>
                    <p className="text-xl font-black">+971 4 000 0000</p>
                    <p className="text-sm font-bold text-slate-500 mt-1">24/7 Operations Room</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="bg-gold text-navy p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Email Support</p>
                    <p className="text-xl font-black truncate">info@axis-transport.ae</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="bg-gold text-navy p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Headquarters</p>
                    <p className="text-xl font-black leading-tight">Business Bay, <br />Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-12 md:p-20 bg-white">
              <h3 className="text-3xl font-bold text-navy mb-10 tracking-tight">Send a Quick Inquiry</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-semibold" placeholder="e.g. Johnathan Smith" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-semibold" placeholder="e.g. john@corporate.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-semibold" placeholder="+971 -- --- ----" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Requested Service</label>
                    <select className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-semibold appearance-none cursor-pointer">
                      <option>Staff Pick & Drop</option>
                      <option>Luxury Bus Rental</option>
                      <option>School/College Transport</option>
                      <option>Airport Transfers</option>
                      <option>Event Transportation</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Requirement Details</label>
                  <textarea rows={4} className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-gold focus:bg-white transition-all font-semibold resize-none" placeholder="Please specify vehicle type, passenger count, and route..."></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-navy text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-gold hover:text-navy transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  SUBMIT QUOTE REQUEST <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-24 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-gold p-2 rounded-xl">
                  <Bus className="text-navy" size={28} />
                </div>
                <h1 className="font-black text-3xl tracking-tighter">AXIS TRANSPORT</h1>
              </div>
              <p className="text-slate-400 max-w-sm mb-12 text-lg leading-relaxed font-medium">
                The premier choice for passenger transportation in Dubai. We deliver reliability, safety, and luxury for every client, from hotels to global corporations.
              </p>
              <div className="flex gap-5">
                {['Facebook', 'LinkedIn', 'Instagram', 'Twitter'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all border border-white/10 group">
                    <span className="sr-only">{social}</span>
                    <ChevronRight size={20} className="group-hover:rotate-45 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-10 border-l-4 border-gold pl-5">Quick Access</h4>
              <ul className="space-y-5 text-slate-400 font-semibold">
                <li><a href="#home" className="hover:text-gold transition-colors">Home Dashboard</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Core Services</a></li>
                <li><a href="#fleet" className="hover:text-gold transition-colors">Vehicle Gallery</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Contact Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-10 border-l-4 border-gold pl-5">Solutions</h4>
              <ul className="space-y-5 text-slate-400 font-semibold">
                <li><a href="#services" className="hover:text-gold transition-colors">Corporate Shuttle</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Luxury Coach Hire</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Campus Transport</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Crew Logistics</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">VIP Transfers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm font-bold text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Axis Passenger Transport Bus Rent LLC.</p>
              <p className="mt-1 opacity-50 uppercase tracking-[0.2em] text-[10px]">Dubai RTA Approved Operator</p>
            </div>
            
            <div className="text-slate-400 text-sm font-bold">
              Powered by <a href="https://www.nexaforgetech.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors font-black tracking-wide">Nexaforge Technologies</a>
            </div>
          </div>
        </div>

        {/* Floating Actions */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
          <motion.a 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/97140000000" 
            className="bg-green-600 text-white p-5 rounded-3xl shadow-[0_20px_50px_rgba(22,163,74,0.4)] flex items-center justify-center border-2 border-white/20"
          >
            <MessageCircle size={36} fill="white" className="text-green-600" />
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
