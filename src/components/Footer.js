'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="p-4 border-t border-white text-sm text-center bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      © 2025 Lyrics Hub. All rights reserved.
    </motion.footer>
  )
}
