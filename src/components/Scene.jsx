import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { models } from "../App";

export const Scene = ({ setLightVisible }) => {
  const gltf = useGLTF(models.meshes);
  const { camera, raycaster, mouse } = useThree();
  const wallswitchRef = useRef();

  useEffect(() => {
    if (gltf) {
      const wallswitch = gltf.scene.children[39];
      wallswitchRef.current = wallswitch;

      // Traverse the GLTF model to set shadow properties
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
    }
  }, [gltf]);

  function handlePointerDown(event) {
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(wallswitchRef.current, true);

    if (intersects.length > 0) {
      console.log("Wallswitch clicked");
      setLightVisible((prevState) => !prevState);
    }
  }

  return (
    <group onPointerDown={handlePointerDown}>
      <primitive object={gltf ? gltf.scene : null} />
    </group>
  );
};
