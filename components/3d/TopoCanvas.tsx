"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { TopoIsland } from "./TopoIsland";

export function TopoCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      // Normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 6.5, 9.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[12, 18, 10]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, 8, -6]} intensity={0.5} color="#A7D2CB" />
        <pointLight position={[0, -2, 4]} intensity={0.3} color="#F2EFE9" />

        <TopoIsland
          mouseX={prefersReducedMotion ? 0 : mousePos.x}
          mouseY={prefersReducedMotion ? 0 : mousePos.y}
        />
      </Canvas>

      {/* Subtle overlay caption token */}
      <div className="absolute bottom-4 right-4 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E7E7E3] text-[#575753] caption-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        Interactive Topographic Model (Orbit & Tilt)
      </div>
    </div>
  );
}
