
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const navRef = useRef<HTMLNavElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-item', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="nav-item">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blender AI Agent
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-item text-white/80 hover:text-white transition-colors duration-300">Features</a>
            <a href="#process" className="nav-item text-white/80 hover:text-white transition-colors duration-300">How it Works</a>
            <a href="#download" className="nav-item text-white/80 hover:text-white transition-colors duration-300">Download</a>
          </div>

          <div className="nav-item">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
