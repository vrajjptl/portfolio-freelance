// src/components/ThreeDScene.tsx
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

/* ──────────────────────────────────────────────────────
   Inner Geometric Core (Faceted Dark Crystal with Pulse)
   ────────────────────────────────────────────────────── */
const InnerCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.25;
      wireRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Faceted Solid Tech Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#0284c7"
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.85}
          flatShading
        />
      </mesh>

      {/* Delicate Micro-Wireframe Lattice */}
      <mesh ref={wireRef} scale={1.03}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Internal Core Glow Point Light */}
      <pointLight color="#06b6d4" intensity={1.8} distance={3.5} />
    </group>
  );
};

/* ──────────────────────────────────────────────────────
   Outer Frosted Glass Sphere (Smooth & Minimal)
   ────────────────────────────────────────────────────── */
const GlassShell: React.FC = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 64, 64]} />
      <meshPhysicalMaterial
        color="#38bdf8"
        transmission={0.88}
        roughness={0.12}
        ior={1.45}
        thickness={1.4}
        reflectivity={0.65}
        clearcoat={1}
        clearcoatRoughness={0.08}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

/* ──────────────────────────────────────────────────────
   Single Minimalist Orbital Ring & Milestone Satellite
   ────────────────────────────────────────────────────── */
const MinimalOrbit: React.FC = () => {
  const satelliteRef = useRef<THREE.Mesh>(null!);
  const orbitRadius = 1.62;

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.7;
    if (satelliteRef.current) {
      satelliteRef.current.position.x = Math.cos(t) * orbitRadius;
      satelliteRef.current.position.z = Math.sin(t) * orbitRadius;
    }
  });

  return (
    <group rotation={[Math.PI / 3.2, 0.25, -0.3]}>
      {/* Ultra-Thin Orbital Track */}
      <mesh>
        <torusGeometry args={[orbitRadius, 0.007, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Glowing Satellite Milestone Node */}
      <mesh ref={satelliteRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

/* ──────────────────────────────────────────────────────
   Interactive Root with Pointer Parallax
   ────────────────────────────────────────────────────── */
const InteractiveHub: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Subtle smooth parallax tilt towards cursor
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.25,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
        <InnerCore />
        <GlassShell />
        <MinimalOrbit />
      </Float>
    </group>
  );
};

/* ──────────────────────────────────────────────────────
   ThreeDScene Main Component
   ────────────────────────────────────────────────────── */
const ThreeDScene: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 44 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Modern Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#ffffff" />
        <pointLight position={[-4, -3, -2]} intensity={1.2} color="#0284c7" />
        <pointLight position={[3, -2, 3]} intensity={0.9} color="#6366f1" />

        {/* 3D Interactive Hub */}
        <InteractiveHub />

        {/* OrbitControls with Gentle Damping */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          dampingFactor={0.06}
          enableDamping
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.8}
        />
      </Canvas>

      {/* Minimal Interactive Hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-500 dark:text-gray-400 flex items-center gap-1.5 shadow-sm transition-colors duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{isEn ? 'Drag to inspect 3D core' : 'फिरवून ३D कोर पहा'}</span>
      </div>
    </div>
  );
};

export default ThreeDScene;
