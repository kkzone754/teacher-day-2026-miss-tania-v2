"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function MemoryWorld({ chapter, revealed }: { chapter: number; revealed: boolean }) {
  return (
    <div className="world" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 42 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffe8bb" />
        <pointLight position={[-3, 1, 2]} intensity={10} distance={9} color="#8e6334" />
        <Particles chapter={chapter} />
        <FloatingShape chapter={chapter} revealed={revealed} />
      </Canvas>
      <div className={"world-wash world-wash-" + chapter} />
    </div>
  );
}

function Particles({ chapter }: { chapter: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 360;
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = (Math.random() - 0.5) * 5;
      data[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (0.018 + Math.max(chapter, 0) * 0.004);
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} transparent opacity={0.2} color="#d7b875" depthWrite={false} />
    </points>
  );
}

function FloatingShape({ chapter, revealed }: { chapter: number; revealed: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.35 + state.clock.elapsedTime * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  const accent = revealed ? "#d7b875" : "#b69a67";

  return (
    <group ref={group} position={[1.25, 0, -1.6]}>
      {chapter < 1 && (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[2.3, 1.55, 0.08]} />
          <meshStandardMaterial color="#181613" roughness={0.7} />
        </mesh>
      )}
      {chapter === 1 && (
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color={accent} roughness={0.38} metalness={0.4} wireframe />
        </mesh>
      )}
      {(chapter === 2 || chapter === 3 || chapter === 4) && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.8, 1.05, 0.18, 48]} />
            <meshStandardMaterial color="#7e352b" roughness={0.58} />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <coneGeometry args={[0.52, 1.2, 32]} />
            <meshStandardMaterial color={accent} roughness={0.4} emissive="#4a3016" emissiveIntensity={0.2} />
          </mesh>
        </group>
      )}
      {chapter === 5 && (
        <mesh>
          <torusKnotGeometry args={[0.7, 0.06, 100, 12, 2, 3]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.55} />
        </mesh>
      )}
      {chapter === 6 && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.72, 0.62, 0.62, 48]} />
            <meshStandardMaterial color={revealed ? "#c9aa68" : "#242019"} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <torusGeometry args={[0.7, 0.07, 16, 48]} />
            <meshStandardMaterial color="#cdbb99" />
          </mesh>
        </group>
      )}
    </group>
  );
}
