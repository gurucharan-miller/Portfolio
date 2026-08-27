import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube({ position, scale, color, rotationSpeed }: { position: [number, number, number]; scale: number; color: string; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.8;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          wireframe
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

export const CubesScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#FF6B00" intensity={1} />
        
        <FloatingCube position={[-3.5, 2, -1]} scale={0.8} color="#FF6B00" rotationSpeed={0.3} />
        <FloatingCube position={[3.8, -1.5, -2]} scale={1.2} color="#FF3B30" rotationSpeed={0.2} />
        <FloatingCube position={[-2.5, -2.5, -3]} scale={0.9} color="#FF6B00" rotationSpeed={0.25} />
        <FloatingCube position={[3, 2.5, -2]} scale={0.7} color="#FF3B30" rotationSpeed={0.35} />
      </Canvas>
    </div>
  );
};
