'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LyricsPage() {
  const { artist, title } = useParams()
  const [lyrics, setLyrics] = useState('')
  const [geniusUrl, setGeniusUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLyrics() {
      try {
        const res = await fetch(`/api/genius?artist=${artist}&title=${title}`)
        const data = await res.json()

        if (data.lyrics) {
          setLyrics(data.lyrics)
        } else {
          setLyrics('Lyrics not found.')
          if (data.url) {
            setGeniusUrl(data.url)
          }
        }
      } catch (err) {
        setError('Error fetching lyrics.')
      }
    }

    fetchLyrics()
  }, [artist, title])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          {decodeURIComponent(title)} - {decodeURIComponent(artist)}
        </h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <motion.pre
            className="whitespace-pre-wrap font-mono text-sm md:text-base bg-gray-900 p-4 rounded-lg overflow-y-auto max-h-[60vh] border border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {lyrics}
          </motion.pre>
        )}

        {geniusUrl && (
          <motion.a
            href={geniusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-6 text-center text-blue-400 hover:text-blue-300 underline transition duration-200"
            whileHover={{ scale: 1.05 }}
          >
            🔗 View Full Lyrics on Genius.com
          </motion.a>
        )}
      </motion.div>
    </div>
  )
}
