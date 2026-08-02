import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Translucent interface panel — represents a developer screen */
function InterfacePanel({ position, rotation, width = 4, height = 2.5, opacity = 0.12 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color="#0f1a28"
        transparent
        opacity={opacity}
        roughness={0.05}
        metalness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Single glowing code-line stroke */
function CodeStroke({ x, y, z, width, delay }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity =
        0.2 + Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <planeGeometry args={[width, 0.012]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.7}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function SoftwareLabEnvironment() {
  const groupRef = useRef();

  // Generate code-line layout on the main panel
  const codeLines = useMemo(() => {
    const lines = [];
    const indents = [0, 0.3, 0.6, 0.6, 0.3, 0, 0.3, 0.6, 0.9, 0.6, 0.3, 0];
    for (let i = 0; i < 22; i++) {
      const indent = indents[i % indents.length];
      lines.push({
        x: -2.2 + indent + (0.4 + Math.random() * 1.2) / 2,
        y: 1.5 - i * 0.145,
        z: 0.008,
        width: 0.4 + Math.random() * 2.2 - indent,
        delay: i * 0.35,
      });
    }
    return lines;
  }, []);

  // Floating geometric data structures
  const floaters = useMemo(() => [
    { pos: [5.5, 2.2, -1.5],  rot: [0.4, 0.6, 0.2],   geo: 'oct',  color: '#181818' },
    { pos: [-6, -1.2, -2.5],  rot: [1.0, 0.4, 0.3],   geo: 'torus', color: '#181818' },
    { pos: [4,  -2,   -4],    rot: [0.2, 1.2, 0.5],   geo: 'cube', color: '#111111' },
    { pos: [-4,  3,   -5],    rot: [0.8, 0.2, 1.1],   geo: 'ico',  color: '#181818' },
  ], []);

  const floaterRefs = useRef([]);

  useFrame((state, dt) => {
    floaterRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.y += dt * (0.04 + i * 0.012);
        ref.rotation.x += dt * (0.025 + i * 0.008);
        ref.position.y = floaters[i].pos[1] + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.12;
      }
    });
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.07) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main developer interface panel */}
      <InterfacePanel position={[0, 0.5, 0]} rotation={[0, 0, 0]} width={5.5} height={3.4} opacity={0.18} />

      {/* Subtle frame border lines */}
      {[[-2.76, 0.5, 0.002], [2.76, 0.5, 0.002]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <planeGeometry args={[0.008, 3.4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Code lines on main panel */}
      {codeLines.map((l, i) => (
        <CodeStroke key={i} {...l} />
      ))}

      {/* Side panels at angle */}
      <InterfacePanel position={[-7.5, 1, -4]} rotation={[0, Math.PI / 3.5, 0]} width={3} height={2} opacity={0.08} />
      <InterfacePanel position={[7.5, -0.5, -4]} rotation={[0, -Math.PI / 3.5, 0]} width={3} height={2} opacity={0.08} />

      {/* Floating structural elements */}
      {floaters.map((f, i) => (
        <group
          key={i}
          ref={(el) => { floaterRefs.current[i] = el; }}
          position={f.pos}
          rotation={f.rot}
        >
          {f.geo === 'oct' && (
            <mesh>
              <octahedronGeometry args={[0.7, 0]} />
              <meshPhysicalMaterial color={f.color} metalness={0.95} roughness={0.08} emissive="#222222" emissiveIntensity={0.15} />
            </mesh>
          )}
          {f.geo === 'torus' && (
            <mesh>
              <torusGeometry args={[0.65, 0.09, 12, 60]} />
              <meshPhysicalMaterial color={f.color} metalness={0.9} roughness={0.15} emissive="#222222" emissiveIntensity={0.12} />
            </mesh>
          )}
          {f.geo === 'cube' && (
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshPhysicalMaterial color={f.color} metalness={0.85} roughness={0.2} emissive="#181818" emissiveIntensity={0.1} />
            </mesh>
          )}
          {f.geo === 'ico' && (
            <mesh>
              <icosahedronGeometry args={[0.55, 0]} />
              <meshPhysicalMaterial color={f.color} metalness={0.95} roughness={0.06} wireframe />
            </mesh>
          )}
        </group>
      ))}

      {/* Dark reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 2]}>
        <planeGeometry args={[40, 30]} />
        <meshPhysicalMaterial color="#050505" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cinematic lighting */}
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#ffffff" distance={22} decay={2} />
      <pointLight position={[-6, 2, -4]} intensity={0.5} color="#ffffff" distance={16} decay={2} />
      <rectAreaLight position={[0, 5, 0]} width={8} height={1} intensity={0.5} color="#ffffff" />
      <ambientLight intensity={0.06} />
      <rectAreaLight position={[0, 5, 0]} width={8} height={1} intensity={0.5} color="#ffffff" />
      <ambientLight intensity={0.06} />
    </group>
  );
}
