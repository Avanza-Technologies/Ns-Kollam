import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Single server rack unit */
function ServerRack({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.75, 3.2, 0.55]} />
        <meshPhysicalMaterial color="#0d0d0d" metalness={0.92} roughness={0.1} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[0, -1.35 + i * 0.33, 0.29]}>
          <boxGeometry args={[0.65, 0.22, 0.02]} />
          <meshStandardMaterial
            color="#080810"
            emissive={i % 3 === 0 ? '#2a7a4a' : i % 4 === 0 ? '#4a7aa8' : '#0a0a15'}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NetworkInfraEnvironment() {
  const globeRef = useRef();

  // Floating network nodes
  const nodes = useMemo(() =>
    Array.from({ length: 35 }, () => ({
      pos: [
        -10 + Math.random() * 20,
        -2 + Math.random() * 6,
        -5 + Math.random() * 10,
      ],
      size: 0.07 + Math.random() * 0.09,
    })), []);

  // Node connection lines (random pairs)
  const connectionLines = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (Math.random() > 0.55) {
        pts.push(...nodes[i].pos, ...nodes[i + 1].pos);
      }
    }
    return new Float32Array(pts);
  }, [nodes]);

  // Wireframe globe points
  const globePoints = useMemo(() => {
    const pts = [];
    const r = 2.8;
    for (let lat = 0; lat <= 14; lat++) {
      const phi = (lat / 14) * Math.PI;
      for (let lon = 0; lon <= 28; lon++) {
        const theta = (lon / 28) * Math.PI * 2;
        pts.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      }
    }
    return new Float32Array(pts);
  }, []);

  // Data packets traveling on connections (simple moving spheres)
  const packetRefs = useRef([]);
  const packetPhases = useMemo(() => Array.from({ length: 6 }, () => Math.random() * Math.PI * 2), []);

  useFrame((state, dt) => {
    if (globeRef.current) globeRef.current.rotation.y += dt * 0.055;
    packetRefs.current.forEach((ref, i) => {
      if (ref) {
        const t = (state.clock.elapsedTime * 0.4 + packetPhases[i]) % 1;
        const ni = (i * 5) % (nodes.length - 1);
        const a = nodes[ni].pos;
        const b = nodes[ni + 1].pos;
        ref.position.set(
          a[0] + (b[0] - a[0]) * t,
          a[1] + (b[1] - a[1]) * t,
          a[2] + (b[2] - a[2]) * t
        );
      }
    });
  });

  return (
    <group>
      {/* Server racks — two rows */}
      {[-5.5, -3.5, -1.5, 1.5, 3.5, 5.5].map((x, i) => (
        <ServerRack key={i} position={[x, -1.5, -4]} />
      ))}
      {[-4.5, -2.5, 0.5, 2.5, 4.5].map((x, i) => (
        <ServerRack key={`b${i}`} position={[x, -1.5, -7]} />
      ))}

      {/* Ceiling structure */}
      <mesh position={[0, 4.5, -5.5]}>
        <boxGeometry args={[16, 0.1, 8]} />
        <meshPhysicalMaterial color="#080808" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Overhead cable trays */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, 4.3, -5.5]}>
          <boxGeometry args={[0.3, 0.15, 7.5]} />
          <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Network topology nodes */}
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionLines.length / 3}
            array={connectionLines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </lineSegments>

      {/* Traveling data packets */}
      {packetPhases.map((_, i) => (
        <mesh key={i} ref={(el) => { packetRefs.current[i] = el; }}>
          <sphereGeometry args={[0.055, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* 3D Globe — assembles from the network */}
      <group ref={globeRef} position={[0, 4, 5]}>
        <mesh>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshPhysicalMaterial color="#030308" transparent opacity={0.25} metalness={0.3} roughness={0.5} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={globePoints.length / 3}
              array={globePoints}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.038} color="#4a7aa8" transparent opacity={0.55} sizeAttenuation />
        </points>
        <pointLight intensity={1.5} color="#4a7aa8" distance={10} decay={2} />
      </group>

      {/* Dark polished floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.1, -5]}>
        <planeGeometry args={[30, 20]} />
        <meshPhysicalMaterial color="#050505" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Overhead strip lighting — server room feel */}
      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, 4.2, -5]}>
          <mesh>
            <boxGeometry args={[0.15, 0.04, 6]} />
            <meshStandardMaterial color="#ffffff" emissive="#aaccff" emissiveIntensity={0.4} />
          </mesh>
          <rectAreaLight width={6} height={0.2} intensity={1.2} color="#aaccff" rotation={[Math.PI / 2, 0, 0]} />
        </group>
      ))}
      <ambientLight intensity={0.04} />
    </group>
  );
}
