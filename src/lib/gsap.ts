import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap() {
  return gsap;
}

export function useScrollTrigger() {
  return ScrollTrigger;
}

export function useFadeInUp<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    );
  }, [delay]);
  return ref;
}

export function useStaggerFadeIn<T extends HTMLElement = HTMLDivElement>(selector: string, delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(selector);
    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    );
  }, [selector, delay]);
  return ref;
}
