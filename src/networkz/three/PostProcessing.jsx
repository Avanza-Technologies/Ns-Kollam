import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={2}>
      {/* Subtle bloom — only very bright emissive surfaces glow */}
      <Bloom
        luminanceThreshold={0.55}
        luminanceSmoothing={0.7}
        intensity={0.35}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
      />
      {/* Deep vignette for cinematic framing */}
      <Vignette
        offset={0.12}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
