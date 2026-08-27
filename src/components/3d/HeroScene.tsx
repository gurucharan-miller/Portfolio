import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated Glowing Wireframe Sphere with Orange & Red Nodes
function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Globe */}
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          wireframe
          color="#FF6B00"
          emissive="#FF3B30"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Glowing Energy Core */}
      <mesh ref={innerRef} scale={1.4}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          wireframe
          color="#FF3B30"
          emissive="#FF6B00"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// Particle Galaxy Universe
function ParticleUniverse() {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorOrange = new THREE.Color('#FF6B00');
    const colorRed = new THREE.Color('#FF3B30');
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      // Radius distribution
      const r = (Math.random() ** 0.5) * 12 + 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random color selection
      const rand = Math.random();
      let chosenColor = colorOrange;
      if (rand > 0.6) chosenColor = colorRed;
      else if (rand > 0.9) chosenColor = colorWhite;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Energy Wave Rings
function EnergyRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.15;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.2;
  });

  return (
    <group position={[0, 0, -1]}>
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[4.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FF3B30" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Interactive Mouse Camera Movement
function CameraRig() {
  useFrame((state) => {
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.8;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouseY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF6B00" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#FF3B30" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <ParticleUniverse />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <WireframeSphere />
          <EnergyRings />
        </Float>

        <CameraRig />
      </Canvas>
    </div>
  );
};
