import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Organic data-ribbon using a CatmullRom tube */
function DataRibbon({ controlPoints, color, opacity, speed }) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      controlPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    );
    return new THREE.TubeGeometry(curve, 60, 0.018, 5, false);
  }, [controlPoints]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity =
        opacity + Math.sin(state.clock.elapsedTime * speed) * 0.08;
    }
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

export default function BusinessEnvironment() {
  // Market signal bars
  const bars = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => {
      const h = 0.25 + Math.abs(Math.sin(i * 0.9 + 1.2)) * 2.2;
      return { x: -8.5 + i * 0.65, h, up: h > 1.1 };
    }), []);

  // Data ribbons representing campaign flows
  const ribbon1 = useMemo(() => [
    [-8, 0, 0], [-5, 1.5, -1], [-2, 0.5, -2], [1, 2, -1], [4, 0.8, 0], [7, 1.5, -1],
  ], []);
  const ribbon2 = useMemo(() => [
    [-7, -1, -1], [-4, 0.5, -2], [0, -0.5, -1.5], [3, 1, -2], [6, -0.2, -1],
  ], []);
  const ribbon3 = useMemo(() => [
    [-6, 2, -3], [-2, 1, -4], [2, 2.5, -3], [6, 1.5, -4],
  ], []);

  // Animated signal travel along ribbon1
  const signalRef = useRef();
  const ribbonCurve = useMemo(() =>
    new THREE.CatmullRomCurve3(ribbon1.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    [ribbon1]);

  useFrame((state) => {
    if (signalRef.current) {
      const t = (state.clock.elapsedTime * 0.18) % 1;
      const pt = ribbonCurve.getPoint(t);
      signalRef.current.position.copy(pt);
    }
  });

  return (
    <group>
      {/* Large dark interface plane — dashboard */}
      <mesh position={[0, 1.5, -1.5]}>
        <planeGeometry args={[14, 7]} />
        <meshPhysicalMaterial
          color="#050a10"
          transparent
          opacity={0.55}
          metalness={0.7}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Frame border */}
      {[[-7.02, 1.5, -1.48], [7.02, 1.5, -1.48]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <planeGeometry args={[0.008, 7.02]} />
          <meshStandardMaterial color="#4a7aa8" emissive="#4a7aa8" emissiveIntensity={0.3} transparent opacity={0.35} />
        </mesh>
      ))}

      {/* Market signal bars */}
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 1.2, -1.2]}>
          <boxGeometry args={[0.18, b.h, 0.12]} />
          <meshStandardMaterial
            color={b.up ? '#2a6a4a' : '#6a2a3a'}
            emissive={b.up ? '#2a6a4a' : '#6a2a3a'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* Data flow ribbons */}
      <DataRibbon controlPoints={ribbon1} color="#4a7aa8" opacity={0.45} speed={0.8} />
      <DataRibbon controlPoints={ribbon2} color="#6a4a8a" opacity={0.35} speed={1.1} />
      <DataRibbon controlPoints={ribbon3} color="#2a6a5a" opacity={0.25} speed={0.6} />

      {/* Signal traveling along ribbon */}
      <mesh ref={signalRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#7aafff" emissive="#4a7aa8" emissiveIntensity={2} />
      </mesh>
      <pointLight ref={signalRef} intensity={0.4} color="#4a7aa8" distance={3} decay={2} />

      {/* Minimal desk + monitor stand */}
      <mesh position={[-4, -2.5, 1]}>
        <boxGeometry args={[3.5, 0.06, 1]} />
        <meshPhysicalMaterial color="#101010" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[-4, -1.0, 0.5]}>
        <planeGeometry args={[2, 1.2]} />
        <meshPhysicalMaterial color="#080d14" transparent opacity={0.8} metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
        <planeGeometry args={[35, 25]} />
        <meshPhysicalMaterial color="#060606" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Ceiling wash */}
      <mesh position={[0, 6, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#080808" transparent opacity={0.9} side={THREE.BackSide} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.06} />
      <pointLight position={[0, 5, 2]} intensity={1.2} color="#ffffff" distance={20} decay={2} />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#6a4a9a" distance={14} decay={2} />
      <pointLight position={[5, 2, -2]} intensity={0.4} color="#2a6a7a" distance={12} decay={2} />
    </group>
  );
}
