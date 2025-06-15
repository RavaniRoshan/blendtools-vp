
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

      // Animate connecting lines
      gsap.fromTo('.process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
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

    }, processRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Connect Your AI',
      description: 'Add your OpenAI, Anthropic, or local LLM credentials. Test the connection with one click.',
      color: 'from-accent to-blue'
    },
    {
      number: '02',
      title: 'Find Blender',
      description: 'Auto-detect your Blender installation or browse to select it manually. Version compatibility checked.',
      color: 'from-blue to-accent'
    },
    {
      number: '03',
      title: 'Start Creating',
      description: 'Chat naturally about your 3D vision. Watch as AI generates and executes Blender scripts automatically.',
      color: 'from-accent to-blue'
    }
  ];

  return (
    <section id="process" ref={processRef} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
            Simple 3-Step Setup
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Get started in minutes. No complex configuration or technical knowledge required.
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="process-step relative mb-16 lg:mb-20">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Step number and content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-text font-bold text-sm mb-4`}>
                    STEP {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-text mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>

                {/* Visual representation */}
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 rotate-12`}></div>
                    <div className={`absolute inset-0 w-32 h-32 rounded-2xl bg-gradient-to-br ${step.color} opacity-40 -rotate-6`}></div>
                    <div className="absolute inset-0 w-32 h-32 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur-sm border border-secondary flex items-center justify-center">
                      <span className="text-3xl font-bold text-text">{step.number}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="process-line absolute left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-accent to-blue mt-8 origin-top"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
