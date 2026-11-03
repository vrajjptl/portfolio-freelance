// src/components/ThreeDScene.tsx
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sparkles, Html } from '@react-three/drei';

/* ──────────────────────────────────────────────────────
   Floating 3D holographic tag badge
   ────────────────────────────────────────────────────── */
const FloatingBadge: React.FC<{
  position: [number, number, number];
  icon: string;
  label: string;
}> = ({ position, icon, label }) => {
  return (
    <Html position={position} center distanceFactor={8.5} zIndexRange={[100, 0]}>
      <div className="pointer-events-none select-none flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-gray-900/90 backdrop-blur-md border border-cyan-500/40 shadow-md shadow-cyan-500/10 text-[11px] font-bold text-slate-800 dark:text-cyan-300 whitespace-nowrap transition-colors duration-300">
        <span className="text-xs">{icon}</span>
        <span>{label}</span>
      </div>
    </Html>
  );
};

/* ──────────────────────────────────────────────────────
   Outer rotating wireframe cage
   ────────────────────────────────────────────────────── */
const WireframeCage: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.12;
      ref.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <mesh ref={ref} scale={1.55}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#38bdf8"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

/* ──────────────────────────────────────────────────────
   Concentric gyroscopic neon rings
   ────────────────────────────────────────────────────── */
const GyroRings: React.FC = () => {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = Math.sin(t * 0.35) * 0.6 + 1.2;
      ring1.current.rotation.y = t * 0.28;
    }
    if (ring2.current) {
      ring2.current.rotation.y = Math.cos(t * 0.25) * 0.7 - 0.5;
      ring2.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[1.9, 0.018, 16, 100]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.7, 0.015, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

/* ──────────────────────────────────────────────────────
   Core holographic sphere with dynamic distortion
   ────────────────────────────────────────────────────── */
const CoreSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      // Buttery smooth lerp tilt
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.35,
        0.04
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        pointer.x * 0.25,
        0.04
      );
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.15}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

/* ──────────────────────────────────────────────────────
   Scene composition with OrbitControls & lighting
   ────────────────────────────────────────────────────── */
const ThreeDScene: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 46 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={0.9} color="#ffffff" />
        <pointLight position={[-4, -3, -3]} intensity={1.2} color="#0ea5e9" />
        <pointLight position={[3, -2, 3]} intensity={0.9} color="#818cf8" />

        {/* 3D Elements */}
        <CoreSphere />
        <WireframeCage />
        <GyroRings />

        {/* Ambient sparkling stardust */}
        <Sparkles count={45} scale={4} size={2.5} speed={0.35} color="#38bdf8" />

        {/* Floating holographic pills positioned safely inside 3D frame */}
        <FloatingBadge
          position={[1.15, 0.95, 0.2]}
          icon="⚡"
          label={isEn ? 'Affordable' : 'परवडणारे दर'}
        />
        <FloatingBadge
          position={[-1.15, 0.85, -0.2]}
          icon="💻"
          label={isEn ? 'Web & Apps' : 'वेब व ॲप'}
        />
        <FloatingBadge
          position={[1.1, -0.95, -0.2]}
          icon="🚀"
          label={isEn ? 'Superfast' : 'सुपरफास्ट'}
        />
        <FloatingBadge
          position={[-1.1, -0.85, 0.2]}
          icon="📱"
          label={isEn ? 'Mobile First' : 'मोबाईल फर्स्ट'}
        />

        {/* Controls - allow user to freely drag and rotate 360 degrees */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          dampingFactor={0.05}
          enableDamping
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Interactive Drag Hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-gray-400 flex items-center gap-1.5 shadow-sm transition-colors duration-300">
        <span>👆</span>
        <span>{isEn ? 'Drag to rotate 3D core' : 'फिरवून ३D कोर पहा'}</span>
      </div>
    </div>
  );
};

export default ThreeDScene;
