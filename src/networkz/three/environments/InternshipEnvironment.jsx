import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MILESTONES = [
  { label: 'FOUNDATION', x: -10, color: '#3a5a7a' },
  { label: 'LEARNING',   x: -3,  color: '#3a6a8a' },
  { label: 'BUILDING',   x:  4,  color: '#3a7a8a' },
  { label: 'WORKING',    x:  11, color: '#4a7aa8' },
];

/** Physical timeline pillar + base disk */
function TimelineNode({ x, color, index }) {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity =
        0.5 + Math.sin(state.clock.elapsedTime * 1.5 + index * 1.2) * 0.25;
    }
  });

  return (
    <group position={[x, 0, 0]}>
      {/* Vertical column */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 6, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      {/* Node sphere at top */}
      <mesh position={[0, 4.7, 0]}>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshPhysicalMaterial
          color="#101820"
          metalness={0.95}
          roughness={0.06}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Platform disk at base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} />
        <meshPhysicalMaterial color="#101010" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Pulse ring */}
      <mesh position={[0, -1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.58, 0.62, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.6} />
      </mesh>
      <pointLight ref={glowRef} position={[0, 4.7, 0]} intensity={0.5} color={color} distance={5} decay={2} />
    </group>
  );
}

export default function InternshipEnvironment() {
  // Corridor wall panels
  const wallPanels = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: -12 + i * 2.5,
      z: -4,
      h: 3 + Math.random() * 1.5,
    })), []);

  // Horizon line running along the timeline
  const horizonRef = useRef();
  useFrame((state) => {
    if (horizonRef.current) {
      horizonRef.current.material.opacity =
        0.4 + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
  });

  return (
    <group>
      {/* Timeline rail */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[26, 0.018, 0.018]} />
        <meshStandardMaterial ref={horizonRef} color="#4a7aa8" emissive="#4a7aa8" emissiveIntensity={0.9} transparent opacity={0.4} />
      </mesh>

      {/* Timeline milestone pillars */}
      {MILESTONES.map((m, i) => (
        <TimelineNode key={m.label} x={m.x} color={m.color} index={i} />
      ))}

      {/* Corridor wall panels — architectural depth */}
      {wallPanels.map((p, i) => (
        <mesh key={i} position={[p.x, p.h / 2 - 2, p.z]}>
          <boxGeometry args={[2, p.h, 0.06]} />
          <meshPhysicalMaterial
            color="#080a0c"
            metalness={0.4}
            roughness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Mirror wall panels on opposite side */}
      {wallPanels.map((p, i) => (
        <mesh key={`r${i}`} position={[p.x, p.h / 2 - 2, 4]}>
          <boxGeometry args={[2, p.h, 0.06]} />
          <meshPhysicalMaterial color="#080a0c" metalness={0.4} roughness={0.8} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[32, 12]} />
        <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Overhead strip lights along the corridor */}
      {[-10, -3, 4, 11].map((x, i) => (
        <group key={i} position={[x, 5, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 0.04, 5]} />
            <meshStandardMaterial color="#fff" emissive="#aaccff" emissiveIntensity={0.3} />
          </mesh>
          <rectAreaLight width={4} height={0.15} intensity={1} color="#aaccff" rotation={[Math.PI / 2, 0, 0]} />
        </group>
      ))}

      <ambientLight intensity={0.05} />
    </group>
  );
}
