import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAGES = ['LEARN', 'BUILD', 'CREATE', 'DEPLOY', 'WORK', 'GROW'];

export default function TransformationEnvironment() {
  const orbitRefs = useRef([]);
  const coreRef = useRef();
  const outerRef = useRef();

  useFrame((state, dt) => {
    // Slowly counter-rotating shells
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 0.08;
      coreRef.current.rotation.x += dt * 0.035;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= dt * 0.04;
      outerRef.current.rotation.z += dt * 0.022;
    }

    // Each orbital ring rotates at a unique speed and axis
    orbitRefs.current.forEach((ref, i) => {
      if (!ref) return;
      ref.rotation.y += dt * (0.06 + i * 0.018) * (i % 2 === 0 ? 1 : -1);
      ref.rotation.x += dt * (0.04 + i * 0.01) * (i % 3 === 0 ? 1 : -1);
    });
  });

  return (
    <group>
      {/* Core — the culmination of the journey */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial
          color="#d8d6d0"
          metalness={0.6}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Outer icosahedron shell — open wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshStandardMaterial
          color="#2a4a6b"
          wireframe
          transparent
          opacity={0.3}
          emissive="#2a4a6b"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Six orbital rings — one per stage */}
      {STAGES.map((stage, i) => {
        const radius = 1.8 + i * 0.52;
        const inclineX = (i * Math.PI * 0.28) % Math.PI;
        const inclineZ = (i * Math.PI * 0.15) % Math.PI;

        return (
          <group
            key={stage}
            ref={(el) => { orbitRefs.current[i] = el; }}
            rotation={[inclineX, i * 0.55, inclineZ]}
          >
            {/* Ring */}
            <mesh>
              <torusGeometry args={[radius, 0.01, 6, 100]} />
              <meshStandardMaterial
                color="#4a7aa8"
                emissive="#4a7aa8"
                emissiveIntensity={0.55}
                transparent
                opacity={0.35 - i * 0.03}
              />
            </mesh>

            {/* Orbiting bead */}
            <mesh position={[radius, 0, 0]}>
              <sphereGeometry args={[0.07 + i * 0.008, 8, 8]} />
              <meshStandardMaterial
                color="#e8e6e0"
                emissive="#ffffff"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* Outer particle halo */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={(() => {
              const arr = new Float32Array(600);
              for (let i = 0; i < 200; i++) {
                const r = 5 + Math.random() * 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
                arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                arr[i * 3 + 2] = r * Math.cos(phi);
              }
              return arr;
            })()}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#4a7aa8" transparent opacity={0.3} sizeAttenuation />
      </points>

      {/* Ground mirror */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshPhysicalMaterial color="#030303" metalness={0.92} roughness={0.08} transparent opacity={0.9} />
      </mesh>

      {/* Central glow + soft fill */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#4a7aa8" distance={18} decay={2} />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#ffffff" distance={20} decay={2} />
      <ambientLight intensity={0.04} />
    </group>
  );
}
