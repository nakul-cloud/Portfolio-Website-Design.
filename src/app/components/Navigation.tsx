'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
    { name: 'HEY', href: '#hero' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'WORK', href: '#work' },
    { name: 'MUSIC', href: '#music' },
    { name: 'CHAT', href: '#contact' },
]

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navItems.map(item => item.href.slice(1))
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (href: string) => {
        const element = document.getElementById(href.slice(1))
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsOpen(false)
        }
    }

    return (
        <>
            {/* Desktop Navigation */}
            <nav
                className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${scrolled ? 'top-4' : 'top-8'
                    }`}
            >
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-heading ${activeSection === item.href.slice(1)
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Mobile Navigation Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 right-6 z-50 md:hidden p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-2xl">
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="text-3xl font-heading font-semibold text-gray-400 hover:text-white transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
