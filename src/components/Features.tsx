
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Hover animations for feature cards
      gsap.utils.toArray('.feature-card').forEach((card: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { y: -10, scale: 1.05, duration: 0.3, ease: 'power2.out' });
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });

    }, featuresRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Universal AI Support',
      description: 'Connect OpenAI, Anthropic, Mistral, or your local LLMs. One interface, endless possibilities.',
      icon: '🤖'
    },
    {
      title: 'Natural Conversations',
      description: 'Just chat about what you want to create. No complex commands or scripts needed.',
      icon: '💬'
    },
    {
      title: 'Instant Blender Integration',
      description: 'AI-generated Python scripts execute automatically in Blender. See results in real-time.',
      icon: '⚡'
    },
    {
      title: 'Professional Results',
      description: 'Built-in Blender expertise ensures high-quality, production-ready 3D models.',
      icon: '🎯'
    },
    {
      title: 'Secure & Private',
      description: 'Your API keys stay encrypted locally. No data sent to external servers.',
      icon: '🔒'
    },
    {
      title: 'Artist-Friendly',
      description: 'Designed by 3D artists, for 3D artists. Clean, intuitive, and powerful.',
      icon: '🎨'
    }
  ];

  return (
    <section id="features" ref={featuresRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Why Choose Blender AI Agent?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the future of 3D modeling with AI-powered automation and professional-grade results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="relative p-8 h-full bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
