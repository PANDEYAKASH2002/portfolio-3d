import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shape1Ref = useRef<THREE.Mesh>(null);
  const shape2Ref = useRef<THREE.Mesh>(null);
  const shape3Ref = useRef<THREE.Mesh>(null);
  const shape4Ref = useRef<THREE.Mesh>(null);
  const shape5Ref = useRef<THREE.Mesh>(null);
  const shape6Ref = useRef<THREE.Mesh>(null);
  const shape7Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.03 + mouseX * 0.3;
      groupRef.current.rotation.x = mouseY * 0.15;
    }

    // Animate each shape individually with different speeds
    if (shape1Ref.current) {
      shape1Ref.current.rotation.x = time * 0.15;
      shape1Ref.current.rotation.y = time * 0.25;
    }

    if (shape2Ref.current) {
      shape2Ref.current.rotation.y = -time * 0.2;
      shape2Ref.current.rotation.z = time * 0.12;
    }

    if (shape3Ref.current) {
      shape3Ref.current.rotation.x = time * 0.12;
      shape3Ref.current.rotation.z = -time * 0.18;
    }

    if (shape4Ref.current) {
      shape4Ref.current.rotation.x = time * 0.2;
      shape4Ref.current.rotation.y = time * 0.15;
    }

    if (shape5Ref.current) {
      shape5Ref.current.rotation.y = time * 0.1;
      shape5Ref.current.rotation.z = time * 0.08;
    }

    if (shape6Ref.current) {
      shape6Ref.current.rotation.x = -time * 0.18;
      shape6Ref.current.rotation.y = time * 0.22;
    }

    if (shape7Ref.current) {
      shape7Ref.current.rotation.z = time * 0.14;
      shape7Ref.current.rotation.y = -time * 0.16;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Black Sparkles - Static/Sparkling */}
      <Sparkles 
        count={300} 
        scale={[20, 14, 12]} 
        size={2.5} 
        speed={0.1} 
        color="#000000" 
        opacity={0.8} 
      />
      
      {/* White/Silver Sparkling Dots */}
      <Sparkles 
        count={200} 
        scale={[18, 12, 10]} 
        size={1.5} 
        speed={0.15} 
        color="#FFFFFF" 
        opacity={0.6} 
      />
      
      {/* Gold Sparkles for accent */}
      <Sparkles 
        count={100} 
        scale={[15, 10, 8]} 
        size={2} 
        speed={0.08} 
        color="#FFD700" 
        opacity={0.4} 
      />

      {/* Blue Wireframe Icosahedron - Vector Icon 1 */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6} position={[-5, 2.5, -2]}>
        <mesh ref={shape1Ref}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* Distorted Glowing Sphere - Vector Icon 2 */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8} position={[5, 2, -3]}>
        <mesh ref={shape2Ref}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <MeshDistortMaterial
            color="#DBEAFE"
            emissive="#2563EB"
            emissiveIntensity={0.3}
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Torus Knot - Vector Icon 3 */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.7} position={[4.5, -2.5, -2]}>
        <mesh ref={shape3Ref}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial color="#2563EB" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>

      {/* Octahedron - Vector Icon 4 */}
      <Float speed={2} rotationIntensity={0.7} floatIntensity={0.5} position={[-4, -2.8, -1.5]}>
        <mesh ref={shape4Ref}>
          <octahedronGeometry args={[1.2]} />
          <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* Dodecahedron - Vector Icon 5 */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9} position={[3.5, 3.5, -2.5]}>
        <mesh ref={shape5Ref}>
          <dodecahedronGeometry args={[1.1]} />
          <meshBasicMaterial color="#93C5FD" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>

      {/* Torus - Vector Icon 6 */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.6} position={[-3.2, 3.8, -1]}>
        <mesh ref={shape6Ref}>
          <torusGeometry args={[1.2, 0.25, 16, 32]} />
          <meshStandardMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Cone - Vector Icon 7 */}
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.7} position={[2.8, -3.2, -1.8]}>
        <mesh ref={shape7Ref}>
          <coneGeometry args={[0.9, 1.5, 24]} />
          <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Small glowing spheres as accents */}
      <Float speed={2.8} floatIntensity={1} position={[-2.5, -1.5, -3]}>
        <mesh>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={2} floatIntensity={0.8} position={[2.2, 1.8, -3.5]}>
        <mesh>
          <sphereGeometry args={[0.5, 12, 12]} />
          <meshBasicMaterial color="#93C5FD" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

export const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full pointer-events-none"
        events={() => ({}) as any}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#2563EB" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#60A5FA" />
        <pointLight position={[0, 5, 8]} intensity={0.8} color="#3B82F6" />
        <React.Suspense fallback={null}>
          <FloatingShapes />
        </React.Suspense>
      </Canvas>
    </div>
  );
};