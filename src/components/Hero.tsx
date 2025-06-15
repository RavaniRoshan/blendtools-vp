
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main hero animation timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Floating animation for the 3D cube
      gsap.to(floatingRef.current, {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      // Parallax effect on scroll (reduced on mobile)
      gsap.to('.hero-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden bg-blender-bg-primary">
      {/* Animated background - responsive sizes */}
      <div className="hero-bg absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blender-accent-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blender-accent-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6">
          <span className="text-heading-1">
            Create 3D Models
          </span>
          <br />
          <span className="bg-gradient-to-r from-blender-accent-primary via-blender-accent-secondary to-blender-accent-primary bg-clip-text text-transparent">
            with AI Magic
          </span>
        </h1>

        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-blender-text-muted mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Transform your ideas into stunning 3D models through simple conversations. 
          Connect your AI, chat naturally, and watch Blender create automatically.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
          <button className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold min-h-[44px]">
            Download for Windows
          </button>
          <button className="btn-secondary w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold min-h-[44px]">
            Watch Demo
          </button>
        </div>

        {/* Floating 3D cube animation - hidden on mobile */}
        <div ref={floatingRef} className="absolute top-1/2 right-4 lg:right-10 transform -translate-y-1/2 hidden lg:block">
          <div className="w-16 h-16 lg:w-24 lg:h-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blender-accent-primary to-blender-accent-secondary rounded-lg transform rotate-12 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blender-accent-secondary to-blender-accent-primary rounded-lg transform -rotate-12 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
