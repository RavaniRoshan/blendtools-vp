
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-item', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav ref={navRef} className="header fixed top-0 w-full z-50 bg-blender-bg-secondary/90 backdrop-blur-lg border-b border-blender-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="nav-item">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blender-accent-primary to-blender-accent-secondary bg-clip-text text-transparent">
              🤖 Blender AI Agent
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#features" className="nav-item text-sm lg:text-base">Features</a>
            <a href="#process" className="nav-item text-sm lg:text-base">How it Works</a>
            <a href="#download" className="nav-item text-sm lg:text-base">Download</a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block nav-item">
            <button className="btn-primary px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden nav-item p-2 text-blender-text-primary hover:text-blender-accent-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blender-bg-secondary/95 backdrop-blur-lg border-b border-blender-divider">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#features" 
                className="block py-3 text-blender-text-secondary hover:text-blender-accent-primary transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#process" 
                className="block py-3 text-blender-text-secondary hover:text-blender-accent-primary transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#download" 
                className="block py-3 text-blender-text-secondary hover:text-blender-accent-primary transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </a>
              <button className="btn-primary w-full py-4 text-lg font-semibold mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
