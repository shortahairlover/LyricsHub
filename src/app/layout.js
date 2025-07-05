import './globals.css'
import Header from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Lyric Finder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-br from-black to-gray-900 text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
