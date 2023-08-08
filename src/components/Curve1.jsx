import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  LineBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Line,
} from "three";
import { models } from "../App";

export const Curve1 = ({ rotationValue }) => {
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
};
