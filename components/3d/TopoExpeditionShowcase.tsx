"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Compass,
  NavigationArrow,
  ArrowsClockwise,
  Eye,
  Crosshair,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";

// Waypoints data
const WAYPOINTS = [
  { name: "Kyoto & Tokyo", pos: [1.4, 1.28, 0.8] as [number, number, number], lat: "35.6762° N", long: "139.6503° E", color: "#166534" },
  { name: "Antarctic Sound", pos: [-1.2, 0.96, -0.7] as [number, number, number], lat: "63.3500° S", long: "56.7500° W", color: "#0284C7" },
  { name: "Arenal Volcano", pos: [0.2, 1.6, -1.4] as [number, number, number], lat: "10.4631° N", long: "84.7032° W", color: "#D97706" },
];

function InteractiveTerrain({
  biome,
  scrollProgress,
  showContours,
  selectedPin,
  onSelectPin,
}: {
  biome: "alpine" | "volcanic" | "polar";
  scrollProgress: number;
  showContours: boolean;
  selectedPin: number;
  onSelectPin: (idx: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Biome material colors
  const biomeTheme = useMemo(() => {
    switch (biome) {
      case "volcanic":
        return { terrain: "#27272A", wire: "#71717A", water: "#1E293B", beacon: "#F97316" };
      case "polar":
        return { terrain: "#F1F5F9", wire: "#94A3B8", water: "#38BDF8", beacon: "#0284C7" };
      case "alpine":
      default:
        return { terrain: "#E6E4DC", wire: "#BDB7A6", water: "#D2DCE3", beacon: "#166534" };
    }
  }, [biome]);

  // Procedural stepped geometry
  const { geometry, wireframeGeom } = useMemo(() => {
    const size = 16;
    const segments = 80;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      vertex.fromBufferAttribute(pos, i);
      const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
      const maxRadius = 6.8;

      if (distFromCenter < maxRadius) {
        const angle = Math.atan2(vertex.z, vertex.x);
        const organicNoise =
          Math.sin(vertex.x * 0.7) * Math.cos(vertex.z * 0.7) * 1.8 +
          Math.sin(vertex.x * 1.5 + angle * 2) * Math.cos(vertex.z * 1.5) * 0.8 +
          Math.sin(vertex.x * 3.0) * 0.35;

        const falloff = Math.max(0, Math.cos((distFromCenter / maxRadius) * (Math.PI / 2)));
        let elevation = (organicNoise + 1.2) * Math.pow(falloff, 1.8) * 2.4;

        // Stepped contour quantization
        const stepHeight = 0.32;
        elevation = Math.floor(elevation / stepHeight) * stepHeight;

        vertex.y = Math.max(0, elevation);
      } else {
        vertex.y = -0.05;
      }

      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geom.computeVertexNormals();
    const wireGeom = new THREE.WireframeGeometry(geom);

    return { geometry: geom, wireframeGeom: wireGeom };
  }, []);

  // Curve route connecting destinations
  const routeCurve = useMemo(() => {
    const p1 = new THREE.Vector3(...WAYPOINTS[0].pos);
    const p2 = new THREE.Vector3(...WAYPOINTS[1].pos);
    const p3 = new THREE.Vector3(...WAYPOINTS[2].pos);

    // Midpoint elevated arc
    const mid1 = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    mid1.y += 1.8;

    const mid2 = new THREE.Vector3().addVectors(p2, p3).multiplyScalar(0.5);
    mid2.y += 1.6;

    const curve = new THREE.CatmullRomCurve3([p1, mid1, p2, mid2, p3]);
    return new THREE.TubeGeometry(curve, 64, 0.025, 8, false);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // Scroll-choreographed camera rotation and tilt
      const scrollRotation = scrollProgress * Math.PI * 0.8;
      const targetRotY = time * 0.05 + scrollRotation;
      const targetRotX = 0.55 + Math.sin(scrollProgress * Math.PI) * 0.15;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        2.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Terrain Mesh */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color={biomeTheme.terrain}
          roughness={0.8}
          metalness={0.08}
          flatShading={true}
        />
      </mesh>

      {/* Contour Lines Overlay */}
      {showContours && (
        <lineSegments geometry={wireframeGeom}>
          <lineBasicMaterial color={biomeTheme.wire} transparent opacity={0.4} />
        </lineSegments>
      )}

      {/* Luminous Flight / Expedition Route Vector */}
      <mesh geometry={routeCurve}>
        <meshBasicMaterial color="#10B981" transparent opacity={0.85} />
      </mesh>

      {/* Waypoints with Glow */}
      {WAYPOINTS.map((wp, idx) => {
        const isSelected = selectedPin === idx;
        return (
          <group
            key={wp.name}
            position={wp.pos}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPin(idx);
            }}
          >
            {/* Mast */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
              <meshBasicMaterial color="#181818" />
            </mesh>
            {/* Beacon Orb */}
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[isSelected ? 0.16 : 0.11, 16, 16]} />
              <meshStandardMaterial
                color={wp.color}
                emissive={wp.color}
                emissiveIntensity={isSelected ? 1.2 : 0.6}
              />
            </mesh>
            {/* Pulsing Base Ring */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.28, 24]} />
              <meshBasicMaterial color={wp.color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* Surrounding Ambient Water Base */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 9.2, 64]} />
        <meshStandardMaterial
          color={biomeTheme.water}
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function TopoExpeditionShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [biome, setBiome] = useState<"alpine" | "volcanic" | "polar">("alpine");
  const [showContours, setShowContours] = useState(true);
  const [selectedPin, setSelectedPin] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeWaypoint = WAYPOINTS[selectedPin];

  return (
    <section
      id="3d-expedition"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="3D Expedition Navigator"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 caption-4 font-semibold">
          <NavigationArrow size={14} weight="fill" />
          <span>Spatial Route Discovery</span>
        </div>
        <h2 className="heading-2 text-[#181818]">
          Interactive 3D Expedition Terrain
        </h2>
        <p className="body-2 text-[#575753]">
          Experience our handcrafted routes through architectural elevation contours. Scroll down to sweep camera vectors across remote wilderness corridors.
        </p>
      </div>

      {/* 3D Canvas Container with Expedition HUD */}
      <div className="relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden bg-[#EDEDEA] border border-[#E7E7E3] shadow-md">
        {/* Interactive 3D Canvas */}
        <Canvas
          camera={{ position: [0, 7.5, 10.5], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[12, 18, 10]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 8, -6]} intensity={0.6} color="#A7D2CB" />
          <InteractiveTerrain
            biome={biome}
            scrollProgress={scrollProgress}
            showContours={showContours}
            selectedPin={selectedPin}
            onSelectPin={setSelectedPin}
          />
        </Canvas>

        {/* Top-Left HUD: Coordinates & Waypoint Metadata */}
        <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-[#E7E7E3] rounded-2xl p-4 shadow-sm max-w-xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#E7E7E3] pb-2">
            <span className="caption-4 uppercase tracking-wider text-[#666666] font-mono">
              Waypoint HUD
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
          <div>
            <p className="title-4 font-bold text-[#181818]">{activeWaypoint.name}</p>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-[#575753]">
              <span>LAT: {activeWaypoint.lat}</span>
              <span>LONG: {activeWaypoint.long}</span>
            </div>
          </div>
          <div className="pt-1 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
            <Crosshair size={13} weight="bold" />
            <span>Guaranteed Departure Linked</span>
          </div>
        </div>

        {/* Top-Right HUD: Biome Selector */}
        <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md border border-[#E7E7E3] rounded-2xl p-2 shadow-sm flex items-center gap-1.5">
          <span className="caption-5 text-[#666666] px-2 uppercase tracking-wide">
            Biome
          </span>
          {(["alpine", "volcanic", "polar"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBiome(b)}
              className={`px-3 py-1.5 rounded-xl caption-4 capitalize transition-all ${
                biome === b
                  ? "bg-[#181818] text-white font-semibold"
                  : "hover:bg-[#F2F2F0] text-[#575753]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Bottom HUD: Tactile Controls */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#E7E7E3] rounded-full px-4 py-2 text-[#575753] caption-4 shadow-sm">
            <Compass size={16} weight="bold" className="text-emerald-800" />
            <span>Scroll Page to Orbit &bull; Drag to Inspect Elevation Steps</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowContours(!showContours)}
              className={`px-3.5 py-2 rounded-full border border-[#E7E7E3] caption-4 backdrop-blur-md transition-colors ${
                showContours ? "bg-white text-[#181818] font-semibold" : "bg-white/60 text-[#888888]"
              }`}
            >
              <Eye size={14} className="inline mr-1.5" />
              {showContours ? "Contours Active" : "Contours Hidden"}
            </button>
            <button
              onClick={() => setSelectedPin((p) => (p + 1) % WAYPOINTS.length)}
              className="px-4 py-2 rounded-full bg-[#181818] hover:bg-black text-white button-sm shadow-sm transition-all"
            >
              <span>Next Waypoint</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
