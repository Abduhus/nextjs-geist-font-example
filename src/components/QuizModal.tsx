'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

interface QuizAnswers {
  gender: string
  profile: string
  occasion: string
}

const productsData = [
  { 
    name: 'Amber & Spice', 
    tags: ['unisex', 'spicy', 'night'],
    price: 52,
    image: 'https://images.unsplash.com/photo-1617103996386-c42684d7c7c3?q=80&w=1887&auto=format&fit=crop',
    description: 'A warm, inviting blend of rich amber and exotic spices, perfect for a cozy evening.',
    volume: '100ml Eau de Parfum',
    rating: 4
  },
  { 
    name: 'Desert Rose Oud', 
    tags: ['unisex', 'woody', 'night'],
    price: 65,
    image: 'https://images.unsplash.com/photo-1554386698-294b5d33b2a2?q=80&w=1887&auto=format&fit=crop',
    description: 'An elegant fusion of delicate desert rose and deep, smoky oud wood.',
    volume: '75ml Eau de Parfum',
    rating: 5
  },
  { 
    name: 'Citrus Grove', 
    tags: ['women', 'fresh', 'day'],
    price: 48,
    image: 'https://images.unsplash.com/photo-1596417929339-0158a74421b3?q=80&w=1887&auto=format&fit=crop',
    description: 'A bright, refreshing burst of sun-ripened citrus, capturing the essence of a vibrant morning.',
    volume: '50ml Eau de Toilette',
    rating: 4
  },
  { 
    name: 'Midnight Musk', 
    tags: ['women', 'floral', 'night'],
    price: 58,
    image: 'https://images.unsplash.com/photo-1594035934090-41a4818f041b?q=80&w=1887&auto=format&fit=crop',
    description: 'A mysterious and sensual scent with notes of dark musk, vanilla, and a hint of patchouli.',
    volume: '90ml Eau de Parfum',
    rating: 5
  },
  { 
    name: 'Sandalwood Veil', 
    tags: ['unisex', 'woody', 'day'],
    price: 62,
    image: 'https://images.unsplash.com/photo-1622620789729-1959c82c21a3?q=80&w=1887&auto=format&fit=crop',
    description: 'A comforting embrace of creamy sandalwood and soft vanilla, suitable for any occasion.',
    volume: '100ml Eau de Parfum',
    rating: 4
  }
]

const PerfumeBottleIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    stroke="#D4AF37" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M18.5 11.5H5.5C4.94772 11.5 4.5 11.9477 4.5 12.5V19C4.5 20.3807 5.61929 21.5 7 21.5H17C18.3807 21.5 19.5 20.3807 19.5 19V12.5C19.5 11.9477 19.0523 11.5 18.5 11.5Z"/>
    <path d="M14.5 11.5V9C14.5 8.44772 14.0523 8 13.5 8H10.5C9.94772 8 9.5 8.44772 9.5 9V11.5"/>
    <path d="M13.5 8C13.5 6.89543 12.6046 6 11.5 6C10.3954 6 9.5 6.89543 9.5 8"/>
    <path d="M13 6.5C15 5 16.5 4.5 18 3"/>
    <path d="M13.5 7.5C15.5 6.5 17 6 18.5 5"/>
  </svg>
)

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const { addToCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({
    gender: '',
    profile: '',
    occasion: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const totalSteps = 3

  const handleAnswerChange = (key: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const findMatch = async () => {
    if (!answers.gender || !answers.profile || !answers.occasion) {
      alert("Please answer all questions to find your match.")
      return
    }

    setIsLoading(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    const userPreferences = [answers.gender, answers.profile, answers.occasion]
    
    let bestMatch = null
    let maxScore = -1

    productsData.forEach(product => {
      let currentScore = 0
      userPreferences.forEach(pref => {
        if (product.tags.includes(pref)) {
          currentScore++
        }
      })
      if (currentScore > maxScore) {
        maxScore = currentScore
        bestMatch = product
      }
    })

    setResult(bestMatch)
    setIsLoading(false)
    setShowResult(true)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setAnswers({ gender: '', profile: '', occasion: '' })
    setResult(null)
    setShowResult(false)
    setIsLoading(false)
    onClose()
  }

  const handleAddToCart = () => {
    if (result) {
      addToCart({
        name: result.name,
        price: result.price,
        image: result.image
      })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-[#D4AF37]' : 'text-[#555]'}>
        ★
      </span>
    ))
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
        
        <h2 className="font-cormorant-garamond text-3xl text-center bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent mt-0 mb-6">
          Find Your Scent
        </h2>
        
        {!showResult && !isLoading && (
          <>
            <div className="w-full h-2 bg-[#333] rounded mb-5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] transition-all duration-400"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>

            {/* Step 1: Gender */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <h3 className="text-center text-2xl mb-5 text-white/90">Who are you shopping for?</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: 'women', icon: '♀', text: 'For Her' },
                    { value: 'men', icon: '♂', text: 'For Him' },
                    { value: 'unisex', icon: '⚥', text: 'Unisex' }
                  ].map((option, index) => (
                    <label 
                      key={option.value}
                      className={`${index === 2 ? 'col-span-2 mx-auto max-w-xs' : ''} bg-white/5 border border-[#444] rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#777] ${
                        answers.gender === option.value ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="gender" 
                        value={option.value}
                        checked={answers.gender === option.value}
                        onChange={(e) => handleAnswerChange('gender', e.target.value)}
                        className="hidden"
                      />
                      <div className="text-4xl mb-2">{option.icon}</div>
                      <div className="text-lg">{option.text}</div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <button 
                    onClick={nextStep}
                    disabled={!answers.gender}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Scent Profile */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-center text-2xl mb-5 text-white/90">What's your preferred scent profile?</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: 'spicy', icon: '🌶️', text: 'Warm & Spicy' },
                    { value: 'woody', icon: '🌲', text: 'Woody & Earthy' },
                    { value: 'fresh', icon: '🍋', text: 'Fresh & Citrusy' },
                    { value: 'floral', icon: '🌹', text: 'Sensual & Floral' },
                    { value: 'oriental', icon: '🕌', text: 'Rich & Oriental' },
                    { value: 'aquatic', icon: '🌊', text: 'Clean & Aquatic' }
                  ].map((option) => (
                    <label 
                      key={option.value}
                      className={`bg-white/5 border border-[#444] rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#777] ${
                        answers.profile === option.value ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="profile" 
                        value={option.value}
                        checked={answers.profile === option.value}
                        onChange={(e) => handleAnswerChange('profile', e.target.value)}
                        className="hidden"
                      />
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-lg">{option.text}</div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={prevStep}
                    className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md font-bold transition-all duration-300 hover:bg-[#D4AF37] hover:text-black font-eb-garamond text-base"
                  >
                    Back
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!answers.profile}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Occasion */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h3 className="text-center text-2xl mb-5 text-white/90">When will you wear it most?</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: 'day', icon: '☀️', text: 'Daytime Casual' },
                    { value: 'night', icon: '🌙', text: 'Evening & Events' },
                    { value: 'work', icon: '💼', text: 'Work/Professional' },
                    { value: 'special', icon: '✨', text: 'Special Occasions' }
                  ].map((option) => (
                    <label 
                      key={option.value}
                      className={`bg-white/5 border border-[#444] rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#777] ${
                        answers.occasion === option.value ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="occasion" 
                        value={option.value}
                        checked={answers.occasion === option.value}
                        onChange={(e) => handleAnswerChange('occasion', e.target.value)}
                        className="hidden"
                      />
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-lg">{option.text}</div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={prevStep}
                    className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md font-bold transition-all duration-300 hover:bg-[#D4AF37] hover:text-black font-eb-garamond text-base"
                  >
                    Back
                  </button>
                  <button 
                    onClick={findMatch}
                    disabled={!answers.occasion}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Find My Match
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-white/20 border-l-[#D4AF37] rounded-full animate-spin"></div>
            </div>
            <p className="text-white/85">Finding your perfect match...</p>
          </div>
        )}

        {showResult && result && (
          <div className="text-center animate-fadeIn">
            <h3 className="text-2xl mb-6 text-[#F9E79F]">Your Perfect Match!</h3>
            <div className="bg-[#111] border border-[#333] rounded-lg p-5 text-center overflow-hidden max-w-sm mx-auto">
              <div className="relative w-full h-[200px] rounded overflow-hidden mb-4">
                <img 
                  src={result.image} 
                  alt={`${result.name} Mood Image`}
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-5 box-border">
                  <PerfumeBottleIcon />
                </div>
              </div>
              <h3 className="text-white/90 font-cormorant-garamond text-xl my-2">
                {result.name}
              </h3>
              <div className="text-[#D4AF37] mb-2">
                {renderStars(result.rating)}
              </div>
              <p className="text-sm text-white/70 mb-2">
                {result.volume}
              </p>
              <p className="text-white/70 text-base min-h-[40px] my-2 leading-relaxed">
                {result.description}
              </p>
              <div className="text-[#D4AF37] font-semibold my-2 text-lg">
                ${result.price}
              </div>
              <button 
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base border-none cursor-pointer w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
