import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Glass curtain-wall panel */
function GlassPanel({ position, width, height, opacity = 0.15 }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color="#0f1e2e"
        transparent
        opacity={opacity}
        roughness={0.02}
        metalness={0.5}
        transmission={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Window grid on facade */
function WindowGrid({ cx, cy, cz, cols, rows, ww = 1.4, wh = 1.1, gap = 0.18 }) {
  const windows = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = cx + (c - (cols - 1) / 2) * (ww + gap);
      const y = cy + (r - (rows - 1) / 2) * (wh + gap);
      // Randomise interior light warmth
      const warm = Math.random() > 0.35;
      windows.push(
        <mesh key={`${r}-${c}`} position={[x, y, cz]}>
          <planeGeometry args={[ww, wh]} />
          <meshStandardMaterial
            color={warm ? '#0a1520' : '#060a10'}
            emissive={warm ? '#1a3040' : '#080c12'}
            emissiveIntensity={warm ? 0.35 : 0.1}
            transparent
            opacity={0.75}
          />
        </mesh>
      );
    }
  }
  return <>{windows}</>;
}

export default function InstituteEnvironment() {
  const spotTargetRef = useRef();

  return (
    <group>
      {/* ── Main building body ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[14, 7, 4.5]} />
        <meshPhysicalMaterial color="#0c0c0c" metalness={0.3} roughness={0.75} />
      </mesh>

      {/* Glass curtain wall — front */}
      <GlassPanel position={[0, 0, 2.26]} width={14} height={7} opacity={0.22} />

      {/* Window grid on front facade */}
      <WindowGrid cx={0} cy={0.3} cz={2.28} cols={6} rows={3} />

      {/* ── Roof overhang ── */}
      <mesh position={[0, 3.85, 0.5]}>
        <boxGeometry args={[15.2, 0.28, 5.5]} />
        <meshPhysicalMaterial color="#0f0f0f" metalness={0.85} roughness={0.12} />
      </mesh>

      {/* ── Side wing (left) ── */}
      <mesh position={[-10, -0.6, -1]}>
        <boxGeometry args={[6, 5.8, 6.5]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.4} roughness={0.65} />
      </mesh>
      <GlassPanel position={[-10, -0.6, 2.26]} width={6} height={5.8} opacity={0.14} />
      <WindowGrid cx={-10} cy={-0.4} cz={2.28} cols={3} rows={2} ww={1.2} wh={1.0} />

      {/* ── Entrance canopy ── */}
      <mesh position={[0, -2, 3.8]}>
        <boxGeometry args={[5, 0.12, 3.5]} />
        <meshPhysicalMaterial color="#131313" metalness={0.92} roughness={0.08} />
      </mesh>
      {[-2.2, 2.2].map((x, i) => (
        <mesh key={i} position={[x, -3.25, 5.2]}>
          <cylinderGeometry args={[0.055, 0.055, 2.5, 8]} />
          <meshPhysicalMaterial color="#181818" metalness={0.95} roughness={0.06} />
        </mesh>
      ))}

      {/* ── Signage plane on facade ── */}
      <mesh position={[0, 2.2, 2.3]}>
        <planeGeometry args={[4.5, 0.9]} />
        <meshStandardMaterial color="#080808" emissive="#4a7aa8" emissiveIntensity={0.08} />
      </mesh>

      {/* ── Landscaping — plaza ground ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.6, 6]}>
        <planeGeometry args={[35, 20]} />
        <meshPhysicalMaterial color="#060606" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* ── Low concrete planter boxes ── */}
      {[-5, 0, 5].map((x, i) => (
        <mesh key={i} position={[x, -3.1, 6.5]}>
          <boxGeometry args={[2.5, 0.5, 0.8]} />
          <meshPhysicalMaterial color="#0e0e0e" metalness={0.3} roughness={0.9} />
        </mesh>
      ))}

      {/* ── Interior warm glow ── */}
      <pointLight position={[0, 0, 1.5]} intensity={0.6} color="#ffb877" distance={10} decay={2} />
      <pointLight position={[-10, -0.5, 1.5]} intensity={0.3} color="#ffaa66" distance={8} decay={2} />

      {/* ── Exterior architectural lighting ── */}
      <spotLight
        position={[-8, 10, 8]}
        intensity={3}
        color="#ffffff"
        angle={0.35}
        penumbra={0.5}
        decay={1.5}
      />
      <spotLight
        position={[8, 9, 7]}
        intensity={2}
        color="#c8d8e8"
        angle={0.35}
        penumbra={0.6}
        decay={1.5}
      />
      {/* Uplight grazing the facade */}
      <pointLight position={[0, -3, 4]} intensity={0.8} color="#8aaccc" distance={16} decay={2} />
      <ambientLight intensity={0.05} />
    </group>
  );
}
