import { motion } from 'motion/react';
import { Github, Twitter, Globe, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-12 pb-8 px-8"
    >
      <div className="rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 fill-pink-600 dark:fill-pink-400 animate-pulse" />
            <span>using React, TypeScript & Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>

          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Zorvyn. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
