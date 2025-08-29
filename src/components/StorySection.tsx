'use client'

export default function StorySection() {
  return (
    <section className="fade-in px-10 py-20 max-w-6xl mx-auto my-10 bg-black/65 backdrop-blur-md rounded-xl border border-white/10">
      <h2 className="font-cormorant-garamond text-5xl text-center bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent mb-10">
        Our Story
      </h2>
      
      <div className="flex items-center gap-12 lg:flex-row flex-col">
        <div className="flex-1">
          <p className="text-white/85 text-xl leading-relaxed"
             style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.15)' }}>
            Nasamat Al Wadi (نسمات الوادي), "Valley Breezes," is inspired by the winds that sweep through serene landscapes, 
            carrying whispers of nature, tradition, and elegance. Each fragrance blends timeless Arabian heritage with modern sophistication, 
            creating scents that linger like a cherished memory on the valley wind.
          </p>
        </div>
        
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1605557622262-a2a4a7f98501?q=80&w=1887&auto=format&fit=crop" 
            alt="Valley Inspiration"
            className="w-full rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  )
}
