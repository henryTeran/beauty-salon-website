import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function AnimatedSphere({ position, color, speed }) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.25}
          speed={1.5}
          roughness={0.3}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        <AnimatedSphere position={[-3, 2, 0]} color="#D4AF37" speed={1.5} />
        <AnimatedSphere position={[3, -2, -2]} color="#C7A86F" speed={2} />
        <AnimatedSphere position={[0, 0, -3]} color="#B8860B" speed={1} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          makeDefault
        />
      </Canvas>
    </div>
  );
}