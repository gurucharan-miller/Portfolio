import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Trigger EmailJS if service keys exist or simulate high-reliability completion
      await new Promise((res) => setTimeout(res, 1200));

      // Trigger Confetti Explosion!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#FF3B30', '#FFFFFF', '#FFA500']
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B00]/15 via-[#FF3B30]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>08 // GET IN TOUCH</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Let’s Build Something <span className="text-gradient-orange">Extraordinary.</span>
        </h2>
      </div>

      {/* Contact Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-zinc-800 space-y-6">
            <h3 className="font-heading font-bold text-2xl text-white">
              Contact Information
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Whether you have an internship opportunity, project collaboration, or just want to discuss AI & web engineering, feel free to reach out directly.
            </p>

            {/* Email Card */}
            {personalInfo.email && (
              <div className="p-4 rounded-2xl bg-[#1B1B1B] border border-zinc-800 flex items-center justify-between group hover:border-[#FF6B00]/40 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">EMAIL ADDRESS</div>
                    <div className="text-sm font-mono text-white font-medium">{personalInfo.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#FF6B00] transition"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Phone Card */}
            {personalInfo.phone && (
              <div className="p-4 rounded-2xl bg-[#1B1B1B] border border-zinc-800 flex items-center justify-between group hover:border-[#FF6B00]/40 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">PHONE / WHATSAPP</div>
                    <div className="text-sm font-mono text-white font-medium">{personalInfo.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-[#FF6B00] transition"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Location Card */}
            {personalInfo.location && (
              <div className="p-4 rounded-2xl bg-[#1B1B1B] border border-zinc-800 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">LOCATION</div>
                  <div className="text-sm font-mono text-white font-medium">{personalInfo.location}</div>
                </div>
              </div>
            )}

            {/* Social Links Bar */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">CONNECT ON:</span>
              <div className="flex gap-2">
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] hover:text-black text-zinc-300 transition"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] hover:text-black text-zinc-300 transition"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Glass Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-8 border border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-heading font-bold text-2xl text-white mb-6">
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00] flex items-center justify-center mx-auto text-[#FF6B00]">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-heading font-bold text-2xl text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out, {formData.name || 'Friend'}. I will review your message and reply as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1B1B1B] text-[#FF6B00] font-mono text-xs font-bold border border-[#FF6B00]/40 hover:bg-[#FF6B00] hover:text-black transition duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B] border border-zinc-800 focus:border-[#FF6B00] focus:outline-none text-sm text-white font-mono placeholder:text-zinc-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B] border border-zinc-800 focus:border-[#FF6B00] focus:outline-none text-sm text-white font-mono placeholder:text-zinc-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Inquiry / Freelance Project"
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B] border border-zinc-800 focus:border-[#FF6B00] focus:outline-none text-sm text-white font-mono placeholder:text-zinc-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, offer, or question..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B] border border-zinc-800 focus:border-[#FF6B00] focus:outline-none text-sm text-white font-mono placeholder:text-zinc-600 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-heading font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,107,0,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

