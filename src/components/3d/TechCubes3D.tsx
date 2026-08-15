import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { skillsList } from '../../data/skillsData';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiThreedotjs,
  SiFramer,
  SiLeaflet,
  SiGit,
  SiGithub,
  SiLinux,
  SiNginx,
} from 'react-icons/si';
import { FaBoxes, FaServer, FaCloud } from 'react-icons/fa';

const ICON_MAP: Record<string, any> = {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  FaBoxes,
  SiReactquery,
  SiThreedotjs,
  SiFramer,
  SiLeaflet,
  FaServer,
  SiGit,
  SiGithub,
  SiLinux,
  SiNginx,
  FaCloud,
};

interface TechCubeNodeProps {
  skill: typeof skillsList[0];
  position: [number, number, number];
  index: number;
}

const TechCubeNode: React.FC<TechCubeNodeProps> = ({ skill, position, index }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const IconComp = ICON_MAP[skill.iconName || 'SiReact'] || SiReact;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.2;
      meshRef.current.rotation.x = Math.cos(time * 0.4 + index) * 0.15;

      // Smooth z position displacement on hover (moves forward toward user)
      const targetZ = hovered ? position[2] + 1.2 : position[2];
      const targetScale = hovered ? 1.25 : 1;

      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.15} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#DBEAFE' : '#FFFFFF'}
          emissive={hovered ? new THREE.Color('#2563EB') : new THREE.Color('#3B82F6')}
          emissiveIntensity={hovered ? 0.4 : 0.08}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Outer Blue Glow Border on Hover */}
      {hovered && (
        <RoundedBox args={[1.36, 1.36, 1.36]} radius={0.16}>
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.8} />
        </RoundedBox>
      )}

      {/* HTML Content Overlay on Cube */}
      <Html center distanceFactor={7} zIndexRange={[100, 0]}>
        <div
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 pointer-events-none select-none ${
            hovered ? 'scale-110 drop-shadow-[0_0_15px_#2563EB]' : ''
          }`}
        >
          <IconComp className={`w-8 h-8 transition-colors ${hovered ? 'text-brand-blue' : 'text-navy-800'}`} />
          <span className={`text-xs font-mono font-bold mt-1 text-center whitespace-nowrap ${hovered ? 'text-brand-blue' : 'text-navy-900'}`}>
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
};

export const TechCubes3D: React.FC = () => {
  // Grid layout parameters for 16 skills
  const gridPositions: [number, number, number][] = [
    [-4.5, 2.2, 0],   [-1.5, 2.2, 0],   [1.5, 2.2, 0],   [4.5, 2.2, 0],
    [-4.5, 0.7, 0],   [-1.5, 0.7, 0],   [1.5, 0.7, 0],   [4.5, 0.7, 0],
    [-4.5, -0.8, 0],  [-1.5, -0.8, 0],  [1.5, -0.8, 0],  [4.5, -0.8, 0],
    [-4.5, -2.3, 0],  [-1.5, -2.3, 0],  [1.5, -2.3, 0],  [4.5, -2.3, 0],
  ];

  return (
    <div className="w-full h-[520px] md:h-[620px] relative">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#2563EB" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#60A5FA" />
        <Sparkles count={60} scale={[14, 10, 6]} size={3} color="#3B82F6" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <React.Suspense fallback={null}>
            {skillsList.map((skill, index) => (
              <TechCubeNode
                key={skill.name}
                skill={skill}
                index={index}
                position={gridPositions[index] || [0, 0, 0]}
              />
            ))}
          </React.Suspense>
        </Float>
      </Canvas>
    </div>
  );
};
