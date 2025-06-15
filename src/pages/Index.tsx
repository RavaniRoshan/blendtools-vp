
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
      // Initial page load animation
      gsap.fromTo('.page-enter', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );

      // Smooth scroll behavior
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0.001
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-primary">
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
