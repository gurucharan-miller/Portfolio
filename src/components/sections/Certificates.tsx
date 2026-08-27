import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Calendar, ExternalLink, ShieldCheck, CheckCircle2, X, Eye } from 'lucide-react';
import { CERTIFICATES_DATA } from '../../data/portfolioData';
import { CertificateItem } from '../../types/portfolio';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  if (!CERTIFICATES_DATA || CERTIFICATES_DATA.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FF3B30]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>06 // CREDENTIALS & CERTIFICATIONS</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Verified <span className="text-gradient-orange">Certificates.</span>
        </h2>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATES_DATA.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-card rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#FF6B00]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
          >
            {/* Top Certificate Graphic Preview */}
            <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-[#FF6B00]/40 font-mono text-[10px] text-[#FF6B00]">
                {cert.issuer}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#FF6B00] transition-colors leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{cert.date}</span>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#1B1B1B] text-[10px] font-mono text-zinc-400 border border-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setSelectedCert(cert)}
                className="w-full py-2.5 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] text-zinc-300 hover:text-black font-mono font-bold text-xs transition duration-300 flex items-center justify-center gap-2 border border-zinc-800"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Certificate</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 border border-[#FF6B00]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED CREDENTIAL</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                {selectedCert.title}
              </h3>

              <div className="text-zinc-400 font-mono text-xs mb-6">
                ISSUED BY: <span className="text-[#FF6B00] font-bold">{selectedCert.issuer}</span> // ID: {selectedCert.credentialId}
              </div>

              <div className="w-full h-72 rounded-2xl overflow-hidden mb-6 border border-zinc-800 relative bg-zinc-900 p-2 flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-zinc-800 text-xs font-mono text-zinc-300">
                      {sk}
                    </span>
                  ))}
                </div>

                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-bold font-mono text-xs shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:brightness-110 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify Credential</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
