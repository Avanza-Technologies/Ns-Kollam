import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** A single orbital ring around the central structure */
function OrbitalRing({ radius, axis, speed, color, opacity }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation[axis] += dt * speed;
  });
  return (
    <mesh ref={ref} rotation={axis === 'x' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 6, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

export default function OpeningEnvironment() {
  const icoRef = useRef();
  const innerRef = useRef();
  const rimRef = useRef();

  // Sparse star field
  const starPositions = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (icoRef.current) {
      icoRef.current.rotation.y += dt * 0.04;
      icoRef.current.rotation.x += dt * 0.018;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= dt * 0.06;
      innerRef.current.rotation.z += dt * 0.025;
    }
    if (rimRef.current) {
      // Pulsing emissive — the single point of light expanding
      rimRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 0.8) * 0.25;
    }
  });

  return (
    <group>
      {/* Central emissive core — the "point of light" */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#6a9acc"
          emissive="#4a7aa8"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Outer icosahedron lattice — architectural structure */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#1a2a3a"
          wireframe
          transparent
          opacity={0.45}
          emissive="#2a4a6b"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner solid icosahedron — PBR metallic */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#0f1520"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
          emissive="#1a2a3a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Equatorial rim */}
      <mesh ref={rimRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.012, 8, 120]} />
        <meshStandardMaterial
          color="#4a7aa8"
          emissive="#4a7aa8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbital rings at different inclinations */}
      <OrbitalRing radius={4.0} axis="y" speed={0.025} color="#2a4a6b" opacity={0.3} />
      <OrbitalRing radius={3.5} axis="x" speed={0.018} color="#3a5a8a" opacity={0.2} />
      <OrbitalRing radius={4.8} axis="z" speed={0.012} color="#1a3050" opacity={0.15} />

      {/* Star field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#4a7aa8"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Cinematic lighting */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#4a7aa8" distance={18} decay={2} />
      <pointLight position={[4, 6, 3]} intensity={0.4} color="#aaccff" distance={20} decay={2} />
      <ambientLight intensity={0.04} />
    </group>
  );
}
