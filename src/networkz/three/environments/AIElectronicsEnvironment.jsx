import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Neural network node */
function NeuralNode({ position, layerColor }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        0.25 + Math.sin(state.clock.elapsedTime * 2.5 + position[0] * 3) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={layerColor} emissive={layerColor} emissiveIntensity={0.25} />
    </mesh>
  );
}

/** Minimalist robotic arm from boxes + cylinders */
function RoboticArm({ position }) {
  const armRef = useRef();
  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      armRef.current.children[1].rotation.z = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
    }
  });

  const mat = <meshPhysicalMaterial color="#141416" metalness={0.95} roughness={0.06} />;

  return (
    <group ref={armRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.45, 0.28, 16]} />
        {mat}
      </mesh>
      {/* Lower arm */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.13, 1.8, 0.13]} />
        {mat}
      </mesh>
      {/* Joint */}
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshPhysicalMaterial color="#1a1a22" metalness={1} roughness={0.04} />
      </mesh>
      {/* Upper arm */}
      <mesh position={[0.5, 2.7, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.11, 1.3, 0.11]} />
        {mat}
      </mesh>
      {/* End effector */}
      <mesh position={[1.05, 3.25, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#4a7aa8" emissive="#4a7aa8" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[1.05, 3.25, 0]} intensity={0.5} color="#4a7aa8" distance={3} decay={2} />
    </group>
  );
}

export default function AIElectronicsEnvironment() {
  // Neural network: 5 layers
  const { nodes, linePositions } = useMemo(() => {
    const layers = [3, 6, 8, 6, 3];
    const nodes = [];

    layers.forEach((count, li) => {
      for (let i = 0; i < count; i++) {
        nodes.push({
          position: [
            (li - layers.length / 2) * 1.6,
            (i - count / 2) * 0.85,
            0,
          ],
          layer: li,
        });
      }
    });

    // Build connection line segments between adjacent layers
    const segs = [];
    let startA = 0;
    layers.forEach((count, li) => {
      if (li > 0) {
        const prevCount = layers[li - 1];
        const startB = startA + prevCount;
        for (let a = startA - prevCount; a < startA; a++) {
          for (let b = startB; b < startB + count; b++) {
            if (nodes[a] && nodes[b]) {
              segs.push(...nodes[a].position, ...nodes[b].position);
            }
          }
        }
      }
      startA += count;
    });

    const linePositions = new Float32Array(segs);
    return { nodes, linePositions };
  }, []);

  const LAYER_COLORS = ['#2a6a9a', '#3a7aa8', '#4a7aa8', '#5a6a90', '#7a4a7a'];

  // PCB grid on the floor
  const gridPositions = useMemo(() => {
    const pts = [];
    const size = 18;
    const step = 0.7;
    for (let x = -size / 2; x <= size / 2; x += step) {
      pts.push(x, -3.5, -size / 2, x, -3.5, size / 2);
    }
    for (let z = -size / 2; z <= size / 2; z += step) {
      pts.push(-size / 2, -3.5, z, size / 2, -3.5, z);
    }
    return new Float32Array(pts);
  }, []);

  // Generative AI sphere of particles
  const aiParticles = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const aiGroupRef = useRef();
  useFrame((state, dt) => {
    if (aiGroupRef.current) aiGroupRef.current.rotation.y += dt * 0.12;
  });

  return (
    <group>
      {/* Neural network */}
      <group position={[0, 1, 0]}>
        {nodes.map((n, i) => (
          <NeuralNode key={i} position={n.position} layerColor={LAYER_COLORS[n.layer]} />
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#2a4a6b" transparent opacity={0.12} />
        </lineSegments>
      </group>

      {/* PCB grid floor */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gridPositions.length / 3}
            array={gridPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1a2a1a" transparent opacity={0.25} />
      </lineSegments>

      {/* Robotic arm */}
      <RoboticArm position={[6, -3.5, -3]} />

      {/* Generative AI sphere */}
      <group ref={aiGroupRef} position={[-5, 1.5, -2]}>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshPhysicalMaterial
            color="#05050f"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={aiParticles.length / 3}
              array={aiParticles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#7a4a9a" transparent opacity={0.7} sizeAttenuation />
        </points>
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#5a2a8a" emissive="#5a2a8a" emissiveIntensity={1.5} />
        </mesh>
        <pointLight intensity={1.2} color="#6a3a9a" distance={7} decay={2} />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#2a4a6b" distance={28} decay={2} />
      <pointLight position={[-5, 2, -2]} intensity={0.6} color="#6a3a9a" distance={14} decay={2} />
      <pointLight position={[6, 1, -3]} intensity={0.4} color="#aabbcc" distance={12} decay={2} />
    </group>
  );
}
