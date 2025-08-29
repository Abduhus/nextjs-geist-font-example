'use client'

import { useState } from 'react'

interface ScentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ScentRecommendation {
  perfumeName: string
  reason: string
  image: string
}

const products = [
  {
    name: 'Amber & Spice',
    description: 'A warm, inviting blend of rich amber and exotic spices, perfect for a cozy evening.',
    image: 'https://images.unsplash.com/photo-1617103996386-c42684d7c7c3?q=80&w=1887&auto=format&fit=crop',
    keywords: ['warm', 'cozy', 'evening', 'spice', 'amber', 'comfort', 'winter', 'fireplace', 'intimate']
  },
  {
    name: 'Desert Rose Oud',
    description: 'An elegant fusion of delicate desert rose and deep, smoky oud wood.',
    image: 'https://images.unsplash.com/photo-1554386698-294b5d33b2a2?q=80&w=1887&auto=format&fit=crop',
    keywords: ['elegant', 'rose', 'oud', 'desert', 'luxury', 'sophisticated', 'mysterious', 'deep', 'smoky']
  },
  {
    name: 'Citrus Grove',
    description: 'A bright, refreshing burst of sun-ripened citrus, capturing the essence of a vibrant morning.',
    image: 'https://images.unsplash.com/photo-1596417929339-0158a74421b3?q=80&w=1887&auto=format&fit=crop',
    keywords: ['bright', 'fresh', 'citrus', 'morning', 'energetic', 'sunny', 'vibrant', 'clean', 'uplifting']
  },
  {
    name: 'Midnight Musk',
    description: 'A mysterious and sensual scent with notes of dark musk, vanilla, and a hint of patchouli.',
    image: 'https://images.unsplash.com/photo-1594035934090-41a4818f041b?q=80&w=1887&auto=format&fit=crop',
    keywords: ['mysterious', 'sensual', 'night', 'musk', 'vanilla', 'dark', 'seductive', 'intimate', 'alluring']
  },
  {
    name: 'Sandalwood Veil',
    description: 'A comforting embrace of creamy sandalwood and soft vanilla, suitable for any occasion.',
    image: 'https://images.unsplash.com/photo-1622620789729-1959c82c21a3?q=80&w=1887&auto=format&fit=crop',
    keywords: ['comfort', 'sandalwood', 'vanilla', 'soft', 'gentle', 'versatile', 'calming', 'peaceful', 'serene']
  }
]

const mockAIRecommendation = (userPrompt: string): ScentRecommendation => {
  const prompt = userPrompt.toLowerCase()
  
  // Score each product based on keyword matches
  const scores = products.map(product => {
    let score = 0
    product.keywords.forEach(keyword => {
      if (prompt.includes(keyword)) {
        score += 2
      }
      // Check for partial matches
      if (prompt.split(' ').some(word => keyword.includes(word) || word.includes(keyword))) {
        score += 1
      }
    })
    return { product, score }
  })
  
  // Sort by score and get the best match
  scores.sort((a, b) => b.score - a.score)
  const bestMatch = scores[0].product
  
  // Generate contextual reasons based on the input
  const reasons = [
    `This scent captures the essence of your described mood perfectly.`,
    `The notes in this fragrance align beautifully with your vision.`,
    `This perfume embodies the feeling you're seeking.`,
    `The character of this scent matches your described atmosphere.`,
    `This fragrance translates your words into an olfactory experience.`
  ]
  
  const randomReason = reasons[Math.floor(Math.random() * reasons.length)]
  
  return {
    perfumeName: bestMatch.name,
    reason: randomReason,
    image: bestMatch.image
  }
}

export default function ScentModal({ isOpen, onClose }: ScentModalProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<ScentRecommendation | null>(null)

  const handleFindScent = async () => {
    if (!prompt.trim()) {
      alert("Please describe a scent, mood, or memory.")
      return
    }

    setIsLoading(true)
    setRecommendation(null)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const result = mockAIRecommendation(prompt)
      setRecommendation(result)
    } catch (error) {
      console.error('Error generating recommendation:', error)
      setRecommendation({
        perfumeName: 'Amber & Spice',
        reason: 'We couldn\'t process your request, but this warm scent might be perfect for you.',
        image: 'https://images.unsplash.com/photo-1617103996386-c42684d7c7c3?q=80&w=1887&auto=format&fit=crop'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setPrompt('')
    setRecommendation(null)
    setIsLoading(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 opacity-100 transition-opacity duration-300"
      onClick={handleClose}
    >
      <div 
        className="bg-black/85 backdrop-blur-2xl border border-white/10 rounded-xl p-8 w-[90%] max-w-2xl relative transform scale-100 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 bg-none border-none text-white text-2xl cursor-pointer hover:text-[#D4AF37] transition-colors"
        >
          ×
        </button>
        
        <h2 className="font-cormorant-garamond text-3xl text-center bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent mt-0 mb-4">
          Discover Your Perfect Scent
        </h2>
        
        <p className="text-center text-white/85 -mt-2 mb-5">
          Describe a memory, a mood, or a feeling, and our AI perfumer will find your match.
        </p>
        
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'a quiet walk in a rainy forest' or 'the feeling of warm sunshine on my skin' or 'a vibrant, bustling souk'..."
          className="w-full h-24 bg-black/30 border border-[#444] rounded-md text-white p-3 font-eb-garamond text-lg resize-vertical mb-5 focus:border-[#D4AF37] focus:outline-none"
        />
        
        <button 
          onClick={handleFindScent}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Finding Your Scent...' : 'Find My Scent'}
        </button>
        
        {isLoading && (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-white/20 border-l-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        )}
        
        {recommendation && !isLoading && (
          <div className="flex gap-5 mt-5 items-center">
            <img 
              src={recommendation.image} 
              alt="Recommended Perfume"
              className="w-32 h-40 object-cover rounded-md"
            />
            <div>
              <h3 className="mt-0 text-[#F9E79F] font-cormorant-garamond text-2xl mb-2">
                {recommendation.perfumeName}
              </h3>
              <p className="text-white/85 text-lg leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
