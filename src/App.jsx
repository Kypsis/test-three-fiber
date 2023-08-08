import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { Curve1 } from "./components/Curve1";
import { Lights } from "./components/Lights";
import { Scene } from "./components/Scene";
import { PathAndParticles } from "./components/PathAndParticles";

export default function App() {
  const ref = useRef();

  const [lightVisible, setLightVisible] = useState(true);

  const { rotation } = useControls({
    rotation: {
      value: 0,
      min: 0,
      max: 360,
      step: 1,
    },
  });

  return (
    <>
      <Leva oneLineLabels />
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 8]}
          fov={75}
          near={1}
          far={1000}
        />
        <OrbitControls ref={ref} />
        <Lights lightVisible={lightVisible} />
        <Scene setLightVisible={setLightVisible} />
        <PathAndParticles />
        <Curve1 rotationValue={rotation} />
      </Canvas>
    </>
  );
}

export const models = {
  curve1: "models/curve1.glb",
  meshes: "models/meshes.glb",
  // ...rest of model paths in public/models
};

// Silently pre-load all models
Object.values(models).forEach(useGLTF.preload);
