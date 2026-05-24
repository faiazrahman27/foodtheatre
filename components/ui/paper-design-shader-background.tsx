"use client";

import { GrainGradient } from "@paper-design/shaders-react";

export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="#fffdf8"
        softness={0.78}
        intensity={0.48}
        noise={0.06}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1.05}
        rotation={0}
        speed={1.8}
        colors={[
          "#ee542e",
          "#efd11e",
          "#0072ae",
          "#7a73b5",
          "#f3b7bf",
          "#37af87",
        ]}
      />

      <div className="absolute inset-0 bg-[#fffdf8]/34" />
    </div>
  );
}
