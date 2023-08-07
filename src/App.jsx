import { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, useGLTF } from "@react-three/drei";
import {
  LineBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Line,
} from "three";
import { Leva, useControls } from "leva";

const models = {
  curve1: "models/curve1.glb",
  // ...rest of model paths in public/models
};

function Curve1({ rotationValue }) {
  const { scene } = useThree();
  const gltf = useGLTF(models.curve1);

  useEffect(() => {
    const mesh = gltf.scene.children[0];
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);

    const vertices = geometry.attributes.position.array;
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute("position", new BufferAttribute(vertices, 3));

    const material = new LineBasicMaterial({ color: 0xff0000 });
    const lineObject = new Line(lineGeometry, material);
    lineObject.position.copy(mesh.position);
    lineObject.rotation.copy(mesh.rotation);
    lineObject.rotateY((Math.PI / 180) * rotationValue);

    scene.add(lineObject);

    return () => scene.remove(lineObject); // cleanup to remove from scene on unmount
  }, [gltf, scene, rotationValue]);

  return null;
}

export default function App() {
  const ref = useRef();

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
      <Canvas camera={{ position: [0, 5, 20], fov: 45, near: 1, far: 200 }}>
        <OrbitControls ref={ref} />
        <ambientLight />
        <Plane
          args={[10, 10]}
          rotation-x={-Math.PI / 2}
          material-color={0x00ff00}
        />
        <Curve1 rotationValue={rotation} />
      </Canvas>
    </>
  );
}

// Silently pre-load all models
Object.values(models).forEach(useGLTF.preload);
