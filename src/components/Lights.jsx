export const Lights = ({ lightVisible }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[-4, 5, 4]}
        intensity={50}
        distance={100}
        castShadow
        visible={lightVisible}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-bias={-0.001}
      />
    </>
  );
};
