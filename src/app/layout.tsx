import type { Metadata } from 'next'
import { EB_Garamond, Cormorant_Garamond, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-cormorant-garamond',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['500'],
  variable: '--font-noto-sans-arabic',
})

export const metadata: Metadata = {
  title: 'Valley Breezes Perfumes | نسمات الوادي للعطور',
  description: 'Whispers of the valley, captured in timeless fragrances that awaken the soul. Discover luxury perfumes inspired by Arabian heritage and modern sophistication.',
  keywords: 'perfume, fragrance, luxury, Arabian, oud, musk, citrus, valley breezes, نسمات الوادي',
  authors: [{ name: 'Valley Breezes Perfumes' }],
  openGraph: {
    title: 'Valley Breezes Perfumes | نسمات الوادي للعطور',
    description: 'Whispers of the valley, captured in timeless fragrances that awaken the soul.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${cormorantGaramond.variable} ${notoSansArabic.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23D4AF37' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18.5 11.5H5.5C4.94772 11.5 4.5 11.9477 4.5 12.5V19C4.5 20.3807 5.61929 21.5 7 21.5H17C18.3807 21.5 19.5 20.3807 19.5 19V12.5C19.5 11.9477 19.0523 11.5 18.5 11.5Z'/%3E%3Cpath d='M14.5 11.5V9C14.5 8.44772 14.0523 8 13.5 8H10.5C9.94772 8 9.5 8.44772 9.5 9V11.5'/%3E%3Cpath d='M13.5 8C13.5 6.89543 12.6046 6 11.5 6C10.3954 6 9.5 6.89543 9.5 8'/%3E%3Cpath d='M13 6.5C15 5 16.5 4.5 18 3'/%3E%3Cpath d='M13.5 7.5C15.5 6.5 17 6 18.5 5'/%3E%3C/svg%3E" />
        <script src="https://kit.fontawesome.com/your-kit-id.js" crossOrigin="anonymous" async></script>
      </head>
      <body className={`font-eb-garamond bg-black text-white overflow-x-hidden`}>
        <div 
          className="min-h-screen"
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175&auto=format&fit=crop") no-repeat center center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
