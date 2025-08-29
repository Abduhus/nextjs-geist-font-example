'use client'

interface QuizTriggerSectionProps {
  onStartQuiz: () => void
}

export default function QuizTriggerSection({ onStartQuiz }: QuizTriggerSectionProps) {
  return (
    <section className="fade-in px-10 py-20 max-w-6xl mx-auto my-10 bg-black/65 backdrop-blur-md rounded-xl border border-white/10 text-center">
      <h2 className="font-cormorant-garamond text-5xl text-center bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent mb-10">
        Find Your Signature Scent
      </h2>
      
      <p className="max-w-[600px] mx-auto mb-8 text-xl text-white/85">
        Answer a few simple questions, and we'll unveil the fragrance that truly represents you.
      </p>
      
      <button 
        onClick={onStartQuiz}
        className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base"
      >
        Take the Scent Quiz
      </button>
    </section>
  )
}
