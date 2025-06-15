
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Process from '../components/Process';
import CallToAction from '../components/CallToAction';
import Navigation from '../components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll behavior - reduced motion for mobile
      const mm = gsap.matchMedia();
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(window, {
          scrollTo: { y: 0, autoKill: false },
          duration: 0.001
        });
      });

      // Refresh ScrollTrigger on resize for responsive behavior
      ScrollTrigger.refresh();

    }, containerRef);

    // Handle resize events
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-blender-bg-primary">
      <Navigation />
      <main className="relative overflow-hidden">
        <Hero />
        <Features />
        <Process />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
