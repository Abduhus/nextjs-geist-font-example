'use client'

interface HeroProps {
  onDiscoverClick: () => void
}

const PerfumeIcon = () => (
  <svg 
    className="w-16 h-16 stroke-[#D4AF37] stroke-[1.2]" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18.5 11.5H5.5C4.94772 11.5 4.5 11.9477 4.5 12.5V19C4.5 20.3807 5.61929 21.5 7 21.5H17C18.3807 21.5 19.5 20.3807 19.5 19V12.5C19.5 11.9477 19.0523 11.5 18.5 11.5Z"/>
    <path d="M14.5 11.5V9C14.5 8.44772 14.0523 8 13.5 8H10.5C9.94772 8 9.5 8.44772 9.5 9V11.5"/>
    <path d="M13.5 8C13.5 6.89543 12.6046 6 11.5 6C10.3954 6 9.5 6.89543 9.5 8"/>
    <path d="M13 6.5C15 5 16.5 4.5 18 3"/>
    <path d="M13.5 7.5C15.5 6.5 17 6 18.5 5"/>
  </svg>
)

export default function Hero({ onDiscoverClick }: HeroProps) {
  const scrollToBestsellers = () => {
    const bestsellersSection = document.getElementById('bestsellers')
    if (bestsellersSection) {
      bestsellersSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="text-center px-10 py-32 flex flex-col items-center justify-center min-h-[80vh]">
      <PerfumeIcon />
      
      <h1 className="font-cormorant-garamond text-6xl bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent m-0 mb-2">
        Valley Breezes
      </h1>
      
      <p className="font-noto-sans-arabic text-2xl my-2 bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent">
        نسمات الوادي للعطور
      </p>
      
      <p className="text-xl text-white/85 max-w-[600px] mx-auto my-5 leading-relaxed" 
         style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
        Whispers of the valley, captured in timeless fragrances that awaken the soul.
      </p>
      
      <div className="flex gap-5 justify-center mt-8">
        <button 
          onClick={scrollToBestsellers}
          className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base"
        >
          Shop Now
        </button>
        
        <button 
          onClick={onDiscoverClick}
          className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md font-bold transition-all duration-300 hover:bg-[#D4AF37] hover:text-black font-eb-garamond text-base"
        >
          Discover Your Scent
        </button>
      </div>
    </section>
  )
}
