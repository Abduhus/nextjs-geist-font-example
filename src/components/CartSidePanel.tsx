'use client'

import { useCart } from '@/contexts/CartContext'

interface CartSidePanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidePanel({ isOpen, onClose }: CartSidePanelProps) {
  const { cart, updateQuantity, getTotalPrice } = useCart()

  const handleQuantityChange = (name: string, change: number) => {
    const item = cart.find(item => item.name === name)
    if (item) {
      updateQuantity(name, item.quantity + change)
    }
  }

  const handleCheckout = () => {
    // Mock checkout process
    alert('Checkout functionality would be implemented here!')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-black/85 backdrop-blur-2xl border-l border-white/10 z-50 transition-transform duration-400 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex justify-between items-center">
          <h2 className="font-cormorant-garamond text-2xl m-0 bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent">
            Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="bg-none border-none text-white text-3xl cursor-pointer hover:text-[#D4AF37] transition-colors"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-5">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex gap-4 mb-5 pb-5 border-b border-[#333] last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="m-0 mb-1 text-lg font-cormorant-garamond text-white">
                    {item.name}
                  </h3>
                  <div className="text-[#D4AF37] mb-2">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(item.name, -1)}
                      className="bg-[#333] border border-[#555] text-white w-6 h-6 cursor-pointer rounded font-eb-garamond flex items-center justify-center hover:bg-[#444] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.name, 1)}
                      className="bg-[#333] border border-[#555] text-white w-6 h-6 cursor-pointer rounded font-eb-garamond flex items-center justify-center hover:bg-[#444] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#222]">
            <div className="flex justify-between text-xl mb-5">
              <span className="text-white">Subtotal</span>
              <span className="text-[#D4AF37] font-semibold">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
