"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TopoIsland({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const terrainRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Procedural Topographic Island Geometry
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
        // Multi-frequency organic mountain formation
        const angle = Math.atan2(vertex.z, vertex.x);
        const organicNoise =
          Math.sin(vertex.x * 0.7) * Math.cos(vertex.z * 0.7) * 1.8 +
          Math.sin(vertex.x * 1.5 + angle * 2) * Math.cos(vertex.z * 1.5) * 0.8 +
          Math.sin(vertex.x * 3.0) * 0.35;

        // Radial falloff so it curves down into water
        const falloff = Math.max(0, Math.cos((distFromCenter / maxRadius) * (Math.PI / 2)));
        let elevation = (organicNoise + 1.2) * Math.pow(falloff, 1.8) * 2.4;

        // Quantize elevation into topographic contour steps (Architectural scale)
        const stepHeight = 0.32;
        elevation = Math.floor(elevation / stepHeight) * stepHeight;

        vertex.y = Math.max(0, elevation);
      } else {
        vertex.y = -0.05;
      }

      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geom.computeVertexNormals();

    // Wireframe for contour outline aesthetics
    const wireGeom = new THREE.WireframeGeometry(geom);

    return { geometry: geom, wireframeGeom: wireGeom };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating oscillation
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.12;

      // Smooth mouse parallax tilt with damping
      const targetRotX = 0.55 + mouseY * 0.25;
      const targetRotY = time * 0.08 + mouseX * 0.35;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3,
        delta
      );
    }

    if (waterRef.current) {
      const time = state.clock.getElapsedTime();
      waterRef.current.rotation.z = time * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Stepped Architectural Topographic Island */}
      <mesh ref={terrainRef} geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color="#E6E4DC"
          roughness={0.75}
          metalness={0.08}
          flatShading={true}
        />
      </mesh>

      {/* Subtle Contour Wireframe Overlay */}
      <lineSegments geometry={wireframeGeom}>
        <lineBasicMaterial color="#BDB7A6" transparent opacity={0.35} />
      </lineSegments>

      {/* Elegant Translucent Water Ring Base */}
      <mesh ref={waterRef} position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 8.8, 64]} />
        <meshStandardMaterial
          color="#D2DCE3"
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Topographic Contour Level Rings */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.25, 48]} />
        <meshBasicMaterial color="#A39D8B" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 2.84, 48]} />
        <meshBasicMaterial color="#166534" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Waypoint Destination Pins */}
      <group position={[1.4, 1.28, 0.8]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshBasicMaterial color="#181818" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#166534" roughness={0.3} emissive="#166534" emissiveIntensity={0.6} />
        </mesh>
      </group>

      <group position={[-1.2, 0.96, -0.7]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshBasicMaterial color="#181818" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#272727" roughness={0.3} emissive="#272727" emissiveIntensity={0.4} />
        </mesh>
      </group>

      <group position={[0.2, 1.6, -1.4]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshBasicMaterial color="#181818" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#A16207" roughness={0.3} emissive="#CA8A04" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}
