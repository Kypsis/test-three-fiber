import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const PathAndParticles = () => {
  const path = new THREE.CurvePath();
  path.add(
    new THREE.LineCurve3(
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(0, 5, 0)
    )
  );
  path.add(
    new THREE.LineCurve3(new THREE.Vector3(0, 5, 0), new THREE.Vector3(5, 0, 0))
  );
  path.add(
    new THREE.LineCurve3(
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(0, -5, 0)
    )
  );
  path.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, -5, 0),
      new THREE.Vector3(-5, 0, 0)
    )
  );

  const tubeGeometry = new THREE.TubeGeometry(path, 100, 0.1, 8, false);
  const pathMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
  });

  const particleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const particles = useRef([]);

  // Initializing particles
  useMemo(() => {
    for (let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particles.current.push(particle);
    }
  }, [particleGeometry, particleMaterial]);

  // Animation of particles
  let t = 0.1;
  const speed = 0.001;

  useFrame(() => {
    t = (t + speed) % 1;

    for (let i = 1; i < particles.current.length; i++) {
      const particle = particles.current[i];
      const adjustedT = (t + i / 20) % 1;
      const segmentStart = i / 20;
      const segmentEnd = (i + 1) / 20;

      const normalizedPosition =
        (adjustedT - segmentStart) / (segmentEnd - segmentStart);
      const sineT = Math.sin(normalizedPosition * Math.PI);
      const adjustedGetPointAtT =
        segmentStart + (segmentEnd - segmentStart) * sineT;
      const clampedAdjustedGetPointAtT = Math.max(
        0,
        Math.min(1, adjustedGetPointAtT)
      );

      const pointOnPath = path.getPointAt(clampedAdjustedGetPointAtT);
      particle.position.copy(pointOnPath);
    }
  });

  return (
    <>
      {/* Curve Path */}
      <mesh geometry={tubeGeometry} material={pathMaterial} />

      {/* Particles */}
      {particles.current.map((particle, index) => (
        <primitive key={index} object={particle} />
      ))}
    </>
  );
};
