import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTERS } from '../data/chapters';

const _pos = new THREE.Vector3();
const _target = new THREE.Vector3();
const _camPos = new THREE.Vector3();

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpV(a, b, t) {
  return a + (b - a) * t;
}

export default function CameraRig({ scrollRef, mouseRef }) {
  const { camera } = useThree();
  const n = CHAPTERS.length;

  useFrame(() => {
    const progress = scrollRef.current ?? 0;
    const chapterSize = 1 / n;

    // Which chapter and how far through it
    const rawIdx = progress / chapterSize;
    const idx = Math.min(Math.floor(rawIdx), n - 1);
    const t = easeInOutCubic(Math.min(Math.max(rawIdx - idx, 0), 1));

    const curr = CHAPTERS[idx];
    const next = CHAPTERS[Math.min(idx + 1, n - 1)];

    // Target camera position
    const tx = lerpV(curr.cameraPos[0], next.cameraPos[0], t);
    const ty = lerpV(curr.cameraPos[1], next.cameraPos[1], t);
    const tz = lerpV(curr.cameraPos[2], next.cameraPos[2], t);

    // Subtle cursor parallax
    const mx = (mouseRef?.current?.x ?? 0) * 0.35;
    const my = (mouseRef?.current?.y ?? 0) * 0.22;

    _pos.set(tx + mx, ty + my, tz);

    // Smooth camera position — lerp factor controls cinematic lag
    camera.position.lerp(_pos, 0.055);

    // Look target
    const lx = lerpV(curr.cameraTarget[0], next.cameraTarget[0], t);
    const ly = lerpV(curr.cameraTarget[1], next.cameraTarget[1], t);
    const lz = lerpV(curr.cameraTarget[2], next.cameraTarget[2], t);
    _target.set(lx, ly, lz);

    // Smooth lookAt via quaternion slerp
    _camPos.copy(camera.position);
    const tmpCam = camera.clone();
    tmpCam.position.copy(_camPos);
    tmpCam.lookAt(_target);
    camera.quaternion.slerp(tmpCam.quaternion, 0.05);

    // FOV transition
    const fovTarget = lerpV(curr.fov ?? 60, next.fov ?? 60, t);
    camera.fov += (fovTarget - camera.fov) * 0.04;
    camera.updateProjectionMatrix();
  });

  return null;
}
