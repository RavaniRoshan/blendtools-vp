
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Process = () => {
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate process steps
      gsap.fromTo('.process-step',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate connecting lines (only on larger screens)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo('.process-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, processRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Connect Your AI',
      description: 'Add your OpenAI, Anthropic, or local LLM credentials. Test the connection with one click.',
      color: 'from-blender-accent-primary to-blender-accent-secondary'
    },
    {
      number: '02',
      title: 'Find Blender',
      description: 'Auto-detect your Blender installation or browse to select it manually. Version compatibility checked.',
      color: 'from-blender-accent-secondary to-blender-accent-primary'
    },
    {
      number: '03',
      title: 'Start Creating',
      description: 'Chat naturally about your 3D vision. Watch as AI generates and executes Blender scripts automatically.',
      color: 'from-blender-accent-primary to-blender-accent-secondary'
    }
  ];

  return (
    <section id="process" ref={processRef} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative bg-blender-bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 bg-gradient-to-r from-blender-text-primary to-blender-text-secondary bg-clip-text text-transparent">
            Simple 3-Step Setup
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blender-text-muted max-w-3xl mx-auto">
            Get started in minutes. No complex configuration or technical knowledge required.
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="process-step relative mb-12 sm:mb-16 lg:mb-20">
              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16">
                {/* Step number and content */}
                <div className="flex-1 text-center lg:text-left max-w-lg lg:max-w-none mx-auto lg:mx-0">
                  <div className={`inline-block px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4`}>
                    STEP {step.number}
                  </div>
                  <h3 className="text-heading-2 text-blender-text-primary mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-blender-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual representation */}
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 rotate-12`}></div>
                    <div className={`absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br ${step.color} opacity-40 -rotate-6`}></div>
                    <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl bg-blender-bg-secondary/80 backdrop-blur-sm border border-blender-border-secondary flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-blender-text-primary">{step.number}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line - only visible on larger screens */}
              {index < steps.length - 1 && (
                <div className="process-line hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-blender-accent-primary to-blender-accent-secondary mt-6 sm:mt-8 origin-top"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
