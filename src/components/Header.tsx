'use client'

import { useState } from 'react'
import Link from 'next/link'

const PerfumeIcon = () => (
  <svg 
    className="w-8 h-8 stroke-[#D4AF37] stroke-[1.5]" 
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

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

interface NavItemProps {
  href: string
  icon: React.ReactNode
  text: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string; filter?: string }[]
  onClick?: () => void
}

function NavItem({ href, icon, text, hasDropdown, dropdownItems, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const handleDropdownClick = (filter?: string) => {
    if (filter) {
      // Scroll to bestsellers section and apply filter
      const bestsellersSection = document.getElementById('bestsellers')
      if (bestsellersSection) {
        bestsellersSection.scrollIntoView({ behavior: 'smooth' })
        // Trigger filter after scroll
        setTimeout(() => {
          const filterBtn = document.querySelector(`[data-filter="${filter}"]`) as HTMLElement
          if (filterBtn) {
            filterBtn.click()
          }
        }, 500)
      }
    }
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href={href} 
        className="flex items-center text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:rotate-[-10deg]"
        onClick={handleClick}
      >
        <span className="flex items-center justify-center h-8 transition-colors duration-300 group-hover:text-[#F9E79F]">
          {icon}
        </span>
      </Link>
      
      {/* Tooltip */}
      {!hasDropdown && (
        <span 
          className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-[#111] text-[#D4AF37] px-3 py-1 rounded text-sm font-semibold whitespace-nowrap border border-[#D4AF37]/50 transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
          }`}
        >
          {text}
        </span>
      )}

      {/* Dropdown Menu */}
      {hasDropdown && dropdownItems && (
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-black/85 backdrop-blur-md border border-white/10 rounded-md min-w-[120px] z-50 transition-all duration-300 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="px-5 py-2 font-cormorant-garamond text-lg text-[#F9E79F] border-b border-[#D4AF37]/20 font-semibold">
            Shop by Category
          </div>
          {dropdownItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleDropdownClick(item.filter)}
              className="block w-full text-left text-[#D4AF37] px-5 py-2 text-base transition-colors duration-300 hover:bg-[#D4AF37]/20 font-eb-garamond"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const shopDropdownItems = [
    { label: 'All Perfumes', href: '#bestsellers', filter: 'all' },
    { label: 'For Her', href: '#bestsellers', filter: 'women' },
    { label: 'For Him', href: '#bestsellers', filter: 'men' },
    { label: 'Unisex', href: '#bestsellers', filter: 'unisex' },
    { label: 'Gift Sets', href: '#' },
  ]

  return (
    <header className="flex justify-between items-center px-10 py-5 bg-black/80 backdrop-blur-md border-b border-[#222] sticky top-0 z-50">
      <Link href="#" className="flex items-center gap-3 text-decoration-none">
        <PerfumeIcon />
        <span className="font-cormorant-garamond text-[#D4AF37] text-2xl">
          Valley Breezes
        </span>
      </Link>

      <nav className="flex gap-6">
        <NavItem
          href="#bestsellers"
          icon={<ShoppingBagIcon />}
          text="Shop"
          hasDropdown={true}
          dropdownItems={shopDropdownItems}
        />
        <NavItem
          href="#"
          icon={
            <img 
              src="https://placehold.co/28x28/D4AF37/000000?text=VB" 
              alt="Valley Breezes Logo" 
              className="w-7 h-7 object-contain"
            />
          }
          text="Collections"
        />
        <NavItem
          href="#"
          icon={<PhoneIcon />}
          text="Contact"
        />
        <NavItem
          href="#"
          icon={<SearchIcon />}
          text="Search"
        />
        <NavItem
          href="#"
          icon={<UserIcon />}
          text="Account"
        />
      </nav>
    </header>
  )
}
