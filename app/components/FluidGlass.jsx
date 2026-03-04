"use client";
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

function LensMesh({ modeProps = {} }) {
  const ref = useRef();
  const { nodes } = useGLTF('/assets/3d/lens.glb');
  const buffer = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const { viewport: vp } = useThree();

  const {
    scale,
    ior = 1.15,
    thickness = 5,
    anisotropy = 0.01,
    chromaticAberration = 0.1,
    ...extraMat
  } = modeProps;

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    easing.damp3(ref.current.position, [(pointer.x * v.width) / 2, (pointer.y * v.height) / 2, 15], 0.15, delta);
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes['Cylinder']?.geometry}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          {...extraMat}
        />
      </mesh>
    </>
  );
}

export default function FluidGlass({ lensProps = {} }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <LensMesh modeProps={lensProps} />
    </Canvas>
  );
}