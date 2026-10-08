"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type OpeningVariant = "envelope" | "lift" | "gate";
export type OpeningPhase = "closed" | "opening" | "open";

/** One lifecycle for every theme: keep the cover until its timeline completes. */
export function useInvitationOpening(variant: OpeningVariant) {
  const [phase, setPhase] = useState<OpeningPhase>("closed");
  const phaseRef = useRef<OpeningPhase>("closed");
  const coverRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const opened = phase === "open";

  useEffect(() => () => contextRef.current?.revert(), []);

  useEffect(() => {
    if (opened) {
      mainRef.current?.focus({ preventScroll: true });
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overscrollBehavior = previousOverscroll;
    };
  }, [opened]);

  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return;

    const frame = requestAnimationFrame(() => {
      // Do not move the cover's scroll position when focusing the primary action.
      cover.querySelector<HTMLButtonElement>("[data-opening-button]")?.focus({ preventScroll: true });
    });
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(cover.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex="0"]',
      )).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) return;
      if (event.shiftKey && (document.activeElement === first || !cover.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !cover.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    cover.addEventListener("keydown", trapFocus);
    return () => {
      cancelAnimationFrame(frame);
      cover.removeEventListener("keydown", trapFocus);
    };
  }, []);

  const open = useCallback(() => {
    if (phaseRef.current !== "closed") return;
    const cover = coverRef.current;
    const main = mainRef.current;
    if (!cover || !main) return;

    phaseRef.current = "opening";
    setPhase("opening");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      phaseRef.current = "open";
      setPhase("open");
    };
    const select = (selector: string) => cover.querySelectorAll<HTMLElement>(selector);
    const hero = main.querySelector<HTMLElement>("[data-invitation-hero-content]");

    contextRef.current = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });

      if (reduced) {
        timeline.to(cover, { opacity: 0, duration: 0.18 });
        return;
      }

      // Promote only the layers that actually move; release them afterwards.
      gsap.set(select("[data-opening-panel], [data-envelope-flap], [data-envelope-letter]"), { willChange: "transform" });
      gsap.set(cover, { willChange: variant === "lift" ? "transform" : "opacity" });

      if (hero) {
        timeline.fromTo(hero,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" },
          variant === "envelope" ? 0.6 : 0.3,
        );
      }

      if (variant === "envelope") {
        timeline
          .to(select("[data-opening-controls]"), { opacity: 0, y: 10, duration: 0.28 }, 0)
          .to(select("[data-envelope-seal]"), { opacity: 0, scale: 1.12, duration: 0.3 }, 0)
          .to(select("[data-envelope-flap]"), { rotationX: 180, duration: 0.65, ease: "power2.inOut" }, 0.12)
          .set(select("[data-envelope-flap]"), { zIndex: 0 }, 0.44)
          .to(select("[data-envelope-address]"), { opacity: 0, duration: 0.25 }, 0.28)
          .to(select("[data-envelope-letter]"), { opacity: 1, yPercent: -42, duration: 0.85, ease: "power3.out" }, 0.42)
          .to(select("[data-envelope-pocket]"), { y: 12, duration: 0.65 }, 0.48)
          .to(cover, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 1.13);
      } else if (variant === "gate") {
        timeline
          .to(select("[data-opening-content]"), { opacity: 0, y: -16, duration: 0.4, ease: "power2.out" }, 0)
          .to(select("[data-opening-backdrop]"), { opacity: 0, duration: 0.45 }, 0.15)
          .to(select("[data-opening-panel-left]"), { xPercent: -101, duration: 1.4 }, 0.12)
          .to(select("[data-opening-panel-right]"), { xPercent: 101, duration: 1.4 }, 0.12)
          .to(select("[data-opening-crown]"), { yPercent: -105, duration: 0.95 }, 0.2)
          .to(cover, { opacity: 0, duration: 0.25 }, 1.4);
      } else {
        timeline
          .to(select("[data-opening-controls]"), { opacity: 0, duration: 0.22 }, 0)
          .to(cover, { yPercent: -101, duration: 1.5, ease: "power3.inOut" }, 0.08);
      }
    }, cover);
  }, [variant]);

  return { phase, opened, coverRef, mainRef, open };
}

export type InvitationOpening = ReturnType<typeof useInvitationOpening>;

/** Reveal content only after entry, never while it is concealed by the cover. */
export function useInvitationReveals(experience: InvitationOpening) {
  const { opened, mainRef } = experience;
  useEffect(() => {
    const main = mainRef.current;
    if (!opened || !main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = main.querySelectorAll<HTMLElement>("[data-invitation-reveal]");
    let observer: IntersectionObserver;
    const context = gsap.context(() => {
      gsap.set(nodes, { opacity: 0, y: 20 });
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" });
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
      nodes.forEach((node) => observer.observe(node));
    }, main);

    return () => {
      observer?.disconnect();
      nodes.forEach((node) => gsap.killTweensOf(node));
      context.revert();
    };
  }, [opened, mainRef]);
}
