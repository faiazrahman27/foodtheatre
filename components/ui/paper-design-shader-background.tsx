"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { GrainGradient } from "@paper-design/shaders-react";

type GradientBackgroundProps = {
  speed?: number;
  pauseWhileInteracting?: boolean;
};

const INTERACTION_PAUSE_MS = 260;
const NAV_INTERACTION_ZONE_PX = 140;

export function GradientBackground({
  speed = 0.15,
  pauseWhileInteracting = true,
}: GradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  const isNearViewport = useInView(containerRef, {
    margin: "420px 0px",
    amount: 0.01,
  });

  useEffect(() => {
    if (!pauseWhileInteracting || !isNearViewport) {
      setIsInteractionPaused(false);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }

      return;
    }

    const pauseTemporarily = () => {
      setIsInteractionPaused(true);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }

      resumeTimerRef.current = setTimeout(() => {
        setIsInteractionPaused(false);
        resumeTimerRef.current = null;
      }, INTERACTION_PAUSE_MS);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.clientY <= NAV_INTERACTION_ZONE_PX) {
        pauseTemporarily();
      }
    };

    window.addEventListener("scroll", pauseTemporarily, { passive: true });
    window.addEventListener("wheel", pauseTemporarily, { passive: true });
    window.addEventListener("touchmove", pauseTemporarily, { passive: true });
    window.addEventListener("pointerdown", pauseTemporarily, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("keydown", pauseTemporarily);

    return () => {
      window.removeEventListener("scroll", pauseTemporarily);
      window.removeEventListener("wheel", pauseTemporarily);
      window.removeEventListener("touchmove", pauseTemporarily);
      window.removeEventListener("pointerdown", pauseTemporarily);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", pauseTemporarily);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };
  }, [isNearViewport, pauseWhileInteracting]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#fffdf8]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(238,84,46,0.30),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(239,209,30,0.34),transparent_34%),radial-gradient(circle_at_18%_86%,rgba(0,114,174,0.18),transparent_34%),radial-gradient(circle_at_88%_78%,rgba(122,115,181,0.20),transparent_36%),radial-gradient(circle_at_52%_50%,rgba(55,175,135,0.16),transparent_34%)]" />

      {isNearViewport ? (
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="#fffdf8"
          softness={0.78}
          intensity={0.5}
          noise={0.06}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1.05}
          rotation={5}
          speed={isInteractionPaused ? 0 : speed}
          colors={[
            "#ee542e",
            "#efd11e",
            "#0072ae",
            "#7a73b5",
            "#f3b7bf",
            "#37af87",
          ]}
        />
      ) : null}

      <div className="absolute inset-0 bg-[#fffdf8]/34" />
    </div>
  );
}
