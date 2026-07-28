import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

import CameraRig from './CameraRig';
import PostProcessing from './PostProcessing';
import OpeningEnvironment from './environments/OpeningEnvironment';
import SoftwareLabEnvironment from './environments/SoftwareLabEnvironment';
import AIElectronicsEnvironment from './environments/AIElectronicsEnvironment';
import NetworkInfraEnvironment from './environments/NetworkInfraEnvironment';
import BusinessEnvironment from './environments/BusinessEnvironment';
import InternshipEnvironment from './environments/InternshipEnvironment';
import MapEnvironment from './environments/MapEnvironment';
import InstituteEnvironment from './environments/InstituteEnvironment';
import TransformationEnvironment from './environments/TransformationEnvironment';
import { ENV_POSITIONS } from '../data/chapters';

export default function SceneCanvas({ scrollRef, mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60, near: 0.1, far: 600 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.88,
      }}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
      frameloop="always"
      shadows={false}
    >
      {/* Deep space background */}
      <color attach="background" args={['#080808']} />

      {/* Fog creates depth and hides pop-in of distant environments */}
      <fog attach="fog" args={['#080808', 60, 260]} />

      {/* Scroll-driven camera choreography */}
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />

      {/* All environments coexist in the same world, the camera visits each */}
      <Suspense fallback={null}>
        <group position={ENV_POSITIONS[0]}><OpeningEnvironment /></group>
        <group position={ENV_POSITIONS[1]}><SoftwareLabEnvironment /></group>
        <group position={ENV_POSITIONS[2]}><AIElectronicsEnvironment /></group>
        <group position={ENV_POSITIONS[3]}><NetworkInfraEnvironment /></group>
        <group position={ENV_POSITIONS[4]}><BusinessEnvironment /></group>
        <group position={ENV_POSITIONS[5]}><InternshipEnvironment /></group>
        <group position={ENV_POSITIONS[6]}><MapEnvironment /></group>
        <group position={ENV_POSITIONS[7]}><InstituteEnvironment /></group>
        <group position={ENV_POSITIONS[8]}><TransformationEnvironment /></group>
      </Suspense>

      <PostProcessing />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
