
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);

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
    <nav ref={navRef} className="header fixed top-0 w-full z-50 bg-blender-bg-secondary/90 backdrop-blur-lg border-b border-blender-divider">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="nav-item">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blender-accent-primary to-blender-accent-secondary bg-clip-text text-transparent">
              🤖 Blender AI Agent
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-item">Features</a>
            <a href="#process" className="nav-item">How it Works</a>
            <a href="#download" className="nav-item">Download</a>
          </div>

          <div className="nav-item">
            <button className="btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
