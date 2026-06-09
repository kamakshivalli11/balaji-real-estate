import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Menu, X, Phone, Mail, MapPin, CheckCircle, 
  Home as HomeIcon, TrendingUp, Key, FileText, 
  Map, Star, ArrowRight, ShieldCheck, ThumbsUp, 
  Building, Users, Target, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Counter = ({ end, duration = 2, label }: { end: number, duration?: number, label: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{count}+</div>
      <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wider text-center">{label}</div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3">{subtitle}</h2>
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h3>
  </div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Areas", id: "areas" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent Successfully",
      description: "Balaji will get back to you shortly.",
    });
  };

  const logoUrl = `${import.meta.env.BASE_URL}balaji-logo.jpeg`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 1. Sticky Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo("home")}>
            <img src={logoUrl} alt="Balaji R Logo" className="h-12 w-12 rounded-full object-cover mr-3 border-2 border-primary/20 shadow-sm" />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-gray-900 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>BALAJI R</span>
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase mt-0.5">Real Estate Advisor</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="rounded-full shadow-lg font-semibold tracking-wide px-6">
              Book Consultation
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-gray-900 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t py-6 px-6 flex flex-col space-y-2"
          >
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-semibold text-gray-800 py-3 border-b border-gray-100 uppercase tracking-wider hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="w-full mt-6 py-6 text-lg rounded-xl">
              Book Consultation
            </Button>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0faf0 40%, #E8F5E9 100%)' }}>
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #c8e6c9 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #a5d6a7 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }} />
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #2E7D32 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

          <div className="container relative z-10 mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-36 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* LEFT: Text content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                {/* Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-[0.18em] text-green-700 uppercase">North Bangalore Property Consultant</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] mb-2 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Don't Buy
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2E7D32' }}>
                  Overpriced.
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] mb-6 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Don't Sell Underpriced.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                  I'll help you evaluate the right property value — whether you're buying or selling in North Bangalore. Expert guidance for the best deal, every time.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Button
                    size="lg"
                    onClick={() => scrollTo("contact")}
                    className="rounded-full text-base h-14 px-8 shadow-lg font-bold transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: '#2E7D32', color: '#fff' }}
                    data-testid="button-book-consultation-hero"
                  >
                    Book Free Consultation
                  </Button>
                  <a
                    href="tel:+919036727332"
                    className="inline-flex items-center justify-center gap-2 rounded-full text-base h-14 px-8 font-bold border-2 transition-all hover:scale-105"
                    style={{ borderColor: '#2E7D32', color: '#2E7D32', background: 'white' }}
                    data-testid="link-call-now-hero"
                  >
                    <Phone className="h-5 w-5" /> Call Now
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 pt-8 border-t border-green-100">
                  {[
                    { icon: <ShieldCheck className="h-4 w-4" />, label: 'Trusted Advisor' },
                    { icon: <CheckCircle className="h-4 w-4" />, label: 'Verified Projects' },
                    { icon: <Users className="h-4 w-4" />, label: 'End-to-End Assistance' },
                    { icon: <Target className="h-4 w-4" />, label: 'Local Market Expert' },
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <span className="text-green-600">{badge.icon}</span>
                      {badge.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT: Balaji's photo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
              >
                {/* Decorative card behind photo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-80 md:w-[420px] md:h-[420px] rounded-[3rem] rotate-6 opacity-60" style={{ background: 'linear-gradient(135deg, #c8e6c9, #E8F5E9)' }} />
                </div>

                {/* Silver Award badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-4 right-4 lg:-top-2 lg:-right-2 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20 border border-green-100"
                >
                  <div className="bg-yellow-50 rounded-xl p-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Silver Partner</div>
                    <div className="text-sm font-bold text-gray-900">Award Winner</div>
                  </div>
                </motion.div>

                {/* Phone badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 left-0 lg:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20 border border-green-100"
                >
                  <div className="bg-green-50 rounded-xl p-2">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Call Directly</div>
                    <div className="text-sm font-bold text-gray-900">+91 90367 27332</div>
                  </div>
                </motion.div>

                {/* Main photo */}
                <div className="relative z-10">
                  <img
                    src={`${import.meta.env.BASE_URL}balaji-photo.png`}
                    alt="Balaji R – North Bangalore Real Estate Advisor"
                    className="w-72 md:w-[400px] lg:w-[440px] object-cover object-top rounded-[2.5rem] shadow-2xl border-4 border-white"
                    style={{ maxHeight: '580px' }}
                    data-testid="img-balaji-hero"
                  />
                  {/* Green accent line */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full" style={{ background: '#2E7D32' }} />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. About Section */}
        <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F8FAFC] -skew-x-12 transform origin-top-right z-0"></div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                className="w-full lg:w-5/12"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] transform -rotate-6 scale-105 z-0"></div>
                  <img src={`${import.meta.env.BASE_URL}balaji-photo.png`} alt="Balaji R" className="relative z-10 w-full rounded-3xl shadow-2xl object-cover aspect-square border-8 border-white" style={{ objectPosition: 'top' }} />
                  <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 border border-gray-100 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="flex items-center gap-5">
                      <div className="bg-green-100 p-4 rounded-xl">
                        <Star className="text-primary h-8 w-8 fill-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900">5.0</div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Client Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-7/12 lg:pl-10"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4 flex items-center">
                  <span className="w-8 h-0.5 bg-primary mr-3"></span> About Balaji R
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">Your Local North Bangalore Market Expert</h3>
                <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
                  <p className="font-medium text-gray-800">
                    With deep roots in North Bangalore, I specialize in providing honest, transparent, and highly personalized real estate guidance. 
                  </p>
                  <p>
                    Whether you are looking for your dream home or a high-ROI investment, my local expertise ensures you make the right choice. I focus strictly on verified, RERA-approved properties and provide end-to-end support—from initial site visits to legal documentation and final registration. My philosophy is simple: client satisfaction over everything else.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 shadow-inner">
                  <Counter end={5} label="Years Exp." />
                  <Counter end={200} label="Happy Clients" />
                  <Counter end={100} label="Properties" />
                  <Counter end={95} label="Satisfaction %" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <section id="services" className="py-24 md:py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading 
              subtitle="Comprehensive Solutions" 
              title="Real Estate Services" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <HomeIcon className="h-8 w-8" />, title: "Property Buying", desc: "Expert guidance to find the perfect home that matches your lifestyle and budget." },
                { icon: <Key className="h-8 w-8" />, title: "Property Selling", desc: "Strategic marketing and valuation to get the best price for your property." },
                { icon: <TrendingUp className="h-8 w-8" />, title: "Investment Advisory", desc: "Data-driven insights to identify high-growth plots and commercial investments." },
                { icon: <Map className="h-8 w-8" />, title: "Site Visit Coordination", desc: "Hassle-free scheduling and accompanied visits to shortlisted properties." },
                { icon: <FileText className="h-8 w-8" />, title: "Documentation Support", desc: "Complete assistance with legal checks, registration, and home loan processing." },
                { icon: <ShieldCheck className="h-8 w-8" />, title: "RERA Approved", desc: "Exclusive focus on verified, safe, and legally clear builder projects." }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden bg-white rounded-2xl">
                    <CardContent className="p-8 md:p-10">
                      <div className="bg-[#E8F5E9] w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                        {service.icon}
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h4>
                      <p className="text-gray-600 text-lg leading-relaxed">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Areas Section */}
        <section id="areas" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3 flex items-center">
                  <span className="w-8 h-0.5 bg-primary mr-3"></span> Prime Locations
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">North Bangalore Hubs</h3>
                <p className="text-gray-600 text-lg md:text-xl">The fastest growing corridor in the city, offering excellent connectivity to the airport and major IT parks.</p>
              </div>
              <Button onClick={() => scrollTo("contact")} className="shrink-0 rounded-full font-bold px-8 h-14 text-lg">
                Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Yelahanka", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
                { name: "Devanahalli", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
                { name: "Hebbal", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
                { name: "Thanisandra", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" },
                { name: "Hennur", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
                { name: "Kogilu", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
                { name: "Jakkur", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80" },
                { name: "Bagalur", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" }
              ].map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl h-72 cursor-pointer shadow-lg"
                >
                  <div className="absolute inset-0 bg-gray-900">
                    <img src={area.img} alt={area.name} className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700 ease-in-out" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300">
                    <h4 className="text-2xl font-bold text-white mb-2 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" /> {area.name}
                    </h4>
                    <p className="text-green-300 text-sm font-bold tracking-wider uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      High ROI • Great Connectivity
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Why Choose Balaji R */}
        <section className="py-24 md:py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading 
              subtitle="The Balaji Advantage" 
              title="Why Choose Balaji R" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <MapPin />, title: "Local Market Expertise", desc: "Deep knowledge of North Bangalore micro-markets and upcoming infrastructure." },
                { icon: <MessageCircle />, title: "Transparent Advice", desc: "Clear, honest communication about property pros, cons, and actual pricing." },
                { icon: <ShieldCheck />, title: "Verified Options", desc: "Every property goes through strict legal and title verification before suggestion." },
                { icon: <Users />, title: "Personalized Service", desc: "Dedicated 1-on-1 support tailored to your family's specific needs and lifestyle." },
                { icon: <Building />, title: "Strong Builder Network", desc: "Direct access to top developers for priority allocations and best pricing." },
                { icon: <Target />, title: "Investment-Focused", desc: "Strategic guidance to maximize rental yields and capital appreciation." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
                >
                  <div className="bg-[#E8F5E9] p-4 rounded-full text-primary shrink-0">
                    {React.cloneElement(feature.icon as React.ReactElement, { className: "h-6 w-6" })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Testimonials */}
        <section id="testimonials" className="py-24 md:py-32 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading 
              subtitle="Client Success Stories" 
              title="What Families Say" 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Ramesh Kumar", text: "Balaji helped us find the perfect plot in North Bangalore. The entire process was smooth and transparent." },
                { name: "Priya Sharma", text: "Excellent guidance for investment opportunities near Devanahalli. Highly recommended for anyone looking for honest advice." },
                { name: "Naveen Reddy", text: "Professional service and honest advice. We successfully purchased our dream property without any hassle." }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <Card className="h-full border-gray-100 shadow-lg hover:shadow-xl transition-shadow rounded-3xl bg-gray-50">
                    <CardContent className="p-8 md:p-10 flex flex-col h-full">
                      <div className="flex text-yellow-400 mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed flex-grow italic mb-8">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                          <p className="text-sm text-gray-500">Property Buyer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Lead Capture CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Looking for Property in North Bangalore?</h2>
              <p className="text-green-50 text-xl mb-10 max-w-2xl mx-auto">Get exclusive access to pre-launch offers, prime locations, and expert negotiation assistance.</p>
              <Button size="lg" onClick={() => scrollTo("contact")} className="bg-white text-primary hover:bg-gray-100 rounded-full text-xl h-16 px-12 shadow-2xl font-bold transition-transform hover:scale-105">
                Book Free Consultation
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 9. Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4 flex items-center">
                  <span className="w-8 h-0.5 bg-primary mr-3"></span> Get In Touch
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Let's Find Your Perfect Property</h3>
                <p className="text-gray-600 text-xl mb-12 leading-relaxed">
                  Whether you're looking to buy a home, invest in a plot, or sell your property, I'm here to help. Schedule a free consultation today.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center group">
                    <div className="bg-[#E8F5E9] p-5 rounded-2xl mr-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Phone className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Call / WhatsApp</h4>
                      <p className="text-2xl font-bold text-gray-900">+91 90367 27332</p>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="bg-[#E8F5E9] p-5 rounded-2xl mr-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Mail className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                      <p className="text-xl font-bold text-gray-900">balajir.properties@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="bg-[#E8F5E9] p-5 rounded-2xl mr-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <MapPin className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Office Location</h4>
                      <p className="text-xl font-bold text-gray-900">Hebbal Kempapura, North Bangalore</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100"
              >
                <h4 className="text-3xl font-bold text-gray-900 mb-8">Send an Inquiry</h4>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                    <Input required placeholder="John Doe" className="h-14 bg-gray-50 border-gray-200 text-lg rounded-xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                    <Input required type="tel" placeholder="+91 XXXXX XXXXX" className="h-14 bg-gray-50 border-gray-200 text-lg rounded-xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Requirement</label>
                    <Select required>
                      <SelectTrigger className="h-14 bg-gray-50 border-gray-200 text-lg rounded-xl focus-visible:ring-primary">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy-apt">Buy Apartment/Villa</SelectItem>
                        <SelectItem value="buy-plot">Buy Plot/Land</SelectItem>
                        <SelectItem value="sell">Sell Property</SelectItem>
                        <SelectItem value="invest">Investment Advisory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                    <Textarea placeholder="How can I help you?" className="min-h-[150px] bg-gray-50 border-gray-200 resize-none text-lg rounded-xl focus-visible:ring-primary" />
                  </div>
                  <Button type="submit" className="w-full h-16 text-xl rounded-xl shadow-lg font-bold">
                    Send Inquiry
                  </Button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="relative">
          <div className="bg-[#F8FAFC] py-12 px-4 md:px-6 text-center">
            <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" /> Find Us
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hebbal Kempapura, North Bangalore
            </h3>
            <p className="text-gray-500 mt-2 text-base">No:16, 14th A Cross, Dasarahalli Main Rd, Bhuvaneswari Nagar, Hebbal, Bengaluru – 560024</p>
          </div>
          <div className="w-full h-[420px] md:h-[500px]">
            <iframe
              title="Balaji R North Bangalore Location"
              src="https://maps.google.com/maps?q=Balaji+R+North+Bangalore,+Hebbal+Kempapura,+Bengaluru&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="iframe-google-map"
            />
          </div>
          <div className="bg-[#F8FAFC] py-6 text-center">
            <a
              href="https://share.google/iWmTqNNrZMRs4Xpvk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-base"
              data-testid="link-open-google-maps"
            >
              <MapPin className="h-4 w-4" />
              Open in Google Maps
            </a>
          </div>
        </section>

      </main>

      {/* 10. Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => scrollTo("home")}>
                <img src={logoUrl} alt="Balaji R Logo" className="h-20 w-20 rounded-full object-cover mr-4 border-2 border-white/20" />
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-white">BALAJI R</h3>
                  <p className="text-primary text-sm font-bold tracking-widest uppercase mt-1">Real Estate Advisor</p>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm mt-6">
                Your Trusted Property Partner.<br/> Buying, Selling & Investing in North Bangalore with transparency and expertise.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8 text-white border-b border-gray-800 pb-4 inline-block uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)} className="text-gray-400 hover:text-primary transition-colors text-left text-lg font-medium">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8 text-white border-b border-gray-800 pb-4 inline-block uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-6 text-gray-400 text-lg">
                <li className="flex items-center hover:text-white transition-colors"><Phone className="h-6 w-6 mr-4 text-primary" /> <a href="tel:+919036727332">+91 90367 27332</a></li>
                <li className="flex items-center hover:text-white transition-colors"><Mail className="h-6 w-6 mr-4 text-primary" /> <a href="mailto:balajir.properties@gmail.com">balajir.properties@gmail.com</a></li>
                <li className="flex items-start"><MapPin className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" /> <span>Hebbal Kempapura,<br/>North Bangalore, India</span></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
            <p>&copy; 2026 Balaji R. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">North Bangalore's Premium Real Estate Consultancy</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a 
          href="tel:+919036727332" 
          className="bg-gray-900 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
          aria-label="Call Now"
        >
          <Phone className="h-7 w-7" />
        </a>
        <a 
          href="https://wa.me/919036727332?text=Hi%20Balaji%2C%20I%20am%20interested%20in%20a%20property%20consultation%20in%20North%20Bangalore.%20Please%20get%20in%20touch." 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
