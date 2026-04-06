import { motion } from 'motion/react';
import { HelpCircle, FileText, MessageCircle, Mail } from 'lucide-react';

export function HelpPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-6 pt-4"
    >
      <div className="flex flex-col mb-8 items-center text-center">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-2xl mb-6 shadow-xl shadow-indigo-500/10">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for articles, tutorials, or FAQs..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
          <svg className="absolute left-4 top-4 w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          { icon: FileText, title: "Documentation", desc: "Detailed guides and API references." },
          { icon: MessageCircle, title: "Live Chat", desc: "Talk with our support team in real-time." },
          { icon: Mail, title: "Email Support", desc: "Send us an email and we'll reply within 24h." }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all mb-4">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}