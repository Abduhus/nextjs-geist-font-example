'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductsSection from '@/components/ProductsSection'
import StorySection from '@/components/StorySection'
import QuizTriggerSection from '@/components/QuizTriggerSection'
import Footer from '@/components/Footer'
import ScentModal from '@/components/ScentModal'
import QuizModal from '@/components/QuizModal'
import FloatingCart from '@/components/FloatingCart'
import CartSidePanel from '@/components/CartSidePanel'
import { CartProvider } from '@/contexts/CartContext'

export default function Home() {
  const [isScentModalOpen, setIsScentModalOpen] = useState(false)
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Scroll fade-in animation
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeInElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      fadeInElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        
        <main>
          <Hero onDiscoverClick={() => setIsScentModalOpen(true)} />
          <ProductsSection />
          <StorySection />
          <QuizTriggerSection onStartQuiz={() => setIsQuizModalOpen(true)} />
        </main>

        <Footer />

        {/* Modals */}
        <ScentModal 
          isOpen={isScentModalOpen} 
          onClose={() => setIsScentModalOpen(false)} 
        />
        <QuizModal 
          isOpen={isQuizModalOpen} 
          onClose={() => setIsQuizModalOpen(false)} 
        />

        {/* Cart Components */}
        <FloatingCart onClick={() => setIsCartOpen(true)} />
        <CartSidePanel 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  )
}
