'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      className="p-4 border-b border-white flex justify-between items-center bg-gray-800 shadow-md"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-white">🎵</h1>
      <nav className="space-x-4 text-sm md:text-base">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/search" className="hover:text-blue-400">Search</Link>
        <Link href="/favorites" className="hover:text-blue-400">Favorites</Link>
        <Link href="/about" className="hover:text-blue-400">About</Link>
        <Link href="/contact" className="hover:text-blue-400">Contact</Link>
      </nav>
    </motion.header>
  )
}
