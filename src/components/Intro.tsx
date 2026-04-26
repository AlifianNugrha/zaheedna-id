import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/logo.jpeg";

export function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3.out",
    })
    .to(logoRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "sine.inOut",
    })
    .to(introRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pattern-islamic overflow-hidden"
    >
      <div className="relative text-center">
        {/* Decorative Arches */}
        <div className="absolute inset-0 -m-20 border border-accent/10 rounded-full animate-pulse" />
        <div className="absolute inset-0 -m-40 border border-accent/5 rounded-full" />
        
        <img
          ref={logoRef}
          src={logo}
          alt="Zaheedna Logo"
          className="h-20 md:h-32 w-auto object-contain relative z-10"
        />
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-accent" />
          <p className="font-display text-xl tracking-[0.3em] text-foreground/80 uppercase">
            Zaheedna
          </p>
        </div>
      </div>
    </div>
  );
}
