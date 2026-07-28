import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Rough geographic centroids of each state (in local plane units)
const LOCATIONS = [
  { name: 'KERALA',     x: -2.8, z:  1.8, color: '#4a7aa8' },
  { name: 'TAMIL NADU', x:  1.8, z:  0.8, color: '#4a7aa8' },
  { name: 'KARNATAKA',  x: -0.3, z: -2.2, color: '#4a7aa8' },
];

function LocationMarker({ position, color }) {
  const pulseRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.2 + position[0]) * 0.18;
    if (pulseRef.current) pulseRef.current.scale.setScalar(s);
    if (ringRef.current) {
      ringRef.current.material.opacity =
        0.4 + Math.sin(state.clock.elapsedTime * 2.2 + position[0] + Math.PI) * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* Vertical marker pin */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      {/* Pulsing ground ring */}
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.18, 24]} />
        <meshStandardMaterial ref={ringRef} color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
      <pointLight position={[0, 0.75, 0]} intensity={0.6} color={color} distance={4} decay={2} />
    </group>
  );
}

export default function MapEnvironment() {
  // Topographic terrain — West Ghats on left, plateau center, coastal plain right
  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 18, 80, 65);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const elevation =
        Math.sin(x * 0.55 + y * 0.3) * 0.28 +
        Math.cos(x * 0.3 - y * 0.6) * 0.18 +
        Math.sin(x * 1.1 - y * 0.2) * 0.09 +
        Math.max(0, -(x + 4) * 0.06) * 0.7; // Western Ghats ridge
      pos.setZ(i, elevation);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Connection lines between locations
  const connectionSegs = useMemo(() => {
    const pairs = [[0, 1], [1, 2], [0, 2]];
    const pts = [];
    pairs.forEach(([a, b]) => {
      const la = LOCATIONS[a], lb = LOCATIONS[b];
      pts.push(la.x, 0.02, la.z, lb.x, 0.02, lb.z);
    });
    return new Float32Array(pts);
  }, []);

  // Ambient particle float
  const particles = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = -8 + Math.random() * 16;
      arr[i * 3 + 1] = 0.5 + Math.random() * 3;
      arr[i * 3 + 2] = -6 + Math.random() * 12;
    }
    return arr;
  }, []);

  const particleRef = useRef();
  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.rotation.y += 0.0005;
      particleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group>
      {/* Solid terrain */}
      <mesh geometry={terrain} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshPhysicalMaterial
          color="#080e14"
          metalness={0.1}
          roughness={0.92}
        />
      </mesh>

      {/* Topographic wireframe overlay */}
      <mesh geometry={terrain} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
        <meshStandardMaterial
          color="#1a3050"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Location markers */}
      {LOCATIONS.map((loc) => (
        <LocationMarker
          key={loc.name}
          position={[loc.x, -0.48, loc.z]}
          color={loc.color}
        />
      ))}

      {/* Connection pathways */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionSegs.length / 3}
            array={connectionSegs}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4a7aa8" transparent opacity={0.28} />
      </lineSegments>

      {/* Floating atmospheric particles */}
      <group ref={particleRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.025} color="#4a7aa8" transparent opacity={0.35} sizeAttenuation />
        </points>
      </group>

      {/* Edge sea plane — dark water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
        <planeGeometry args={[40, 35]} />
        <meshPhysicalMaterial color="#040810" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Aerospace-style lighting from above */}
      <directionalLight position={[3, 20, 5]} intensity={0.5} color="#8ab0d0" />
      <pointLight position={[-2.8, 3, 1.8]} intensity={0.4} color="#4a7aa8" distance={8} decay={2} />
      <pointLight position={[1.8, 3, 0.8]}  intensity={0.4} color="#4a7aa8" distance={8} decay={2} />
      <pointLight position={[-0.3, 3, -2.2]} intensity={0.4} color="#4a7aa8" distance={8} decay={2} />
      <ambientLight intensity={0.07} color="#0a1a28" />
    </group>
  );
}
