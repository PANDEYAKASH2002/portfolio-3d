import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  SiReact as ReactIcon,
  SiTypescript as TSIcon,
  SiJavascript as JSIcon,
  SiTailwindcss as TailwindIcon,
  SiRedux as ReduxIcon,
  SiThreedotjs as ThreeIcon,
  SiGit as GitIcon,
  SiGithub as GithubIcon,
  SiLeaflet as LeafletIcon,
  SiLinux as LinuxIcon,
  SiNginx as NginxIcon,
} from 'react-icons/si';

const TECH_ORBITS = [
  { name: 'React.js', icon: ReactIcon, radius: 2.8, speed: 0.6, yOffset: 0.4 },
  { name: 'TypeScript', icon: TSIcon, radius: 3.2, speed: 0.4, yOffset: -0.5 },
  { name: 'JavaScript', icon: JSIcon, radius: 3.5, speed: 0.5, yOffset: 0.8 },
  { name: 'Tailwind CSS', icon: TailwindIcon, radius: 2.9, speed: 0.7, yOffset: -0.9 },
  { name: 'Redux Toolkit', icon: ReduxIcon, radius: 3.4, speed: 0.45, yOffset: 0.2 },
  { name: 'Three.js', icon: ThreeIcon, radius: 3.0, speed: 0.55, yOffset: -0.3 },
  { name: 'Git', icon: GitIcon, radius: 3.6, speed: 0.35, yOffset: 0.7 },
  { name: 'GitHub', icon: GithubIcon, radius: 3.1, speed: 0.65, yOffset: -0.6 },
  { name: 'Leaflet.js', icon: LeafletIcon, radius: 3.3, speed: 0.48, yOffset: 0.5 },
  { name: 'Linux', icon: LinuxIcon, radius: 2.7, speed: 0.52, yOffset: -0.4 },
  { name: 'Nginx', icon: NginxIcon, radius: 3.7, speed: 0.38, yOffset: 0.1 },
];

// Pointer position tracked OUTSIDE r3f's own pointer system, on the capture
// phase, so hovering a Html badge (a real DOM element on top of the canvas)
// can never block or freeze it.
interface PointerRef {
  current: { x: number; y: number };
}

const TechGlobeMesh: React.FC<{ pointerRef: PointerRef }> = ({ pointerRef }) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const innerGlobeRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const smoothedMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Ease toward the real pointer position instead of snapping to it —
    // this is what removes the jump when the cursor enters/leaves a badge.
    const damp = 1 - Math.pow(0.001, delta); // frame-rate independent lerp factor
    smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, pointerRef.current.x, damp);
    smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, pointerRef.current.y, damp);

    const mouseX = smoothedMouse.current.x * 0.3;
    const mouseY = smoothedMouse.current.y * 0.3;

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = time * 0.15 + mouseX;
      globeGroupRef.current.rotation.x = mouseY * 0.3;
    }

    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y = -time * 0.1;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Outer Wireframe Latitude/Longitude Grid Globe */}
      <mesh ref={innerGlobeRef}>
        <sphereGeometry args={[2.0, 24, 24]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#2563EB"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>

      {/* Blue Orbital Ring */}
      <group ref={ringGroupRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]} renderOrder={1}>
          <ringGeometry args={[2.7, 2.75, 64]} />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]} renderOrder={2}>
          <ringGeometry args={[3.2, 3.24, 64]} />
          <meshBasicMaterial
            color="#2563EB"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Blue Particle Orbit Trails */}
      <Sparkles count={80} scale={[7, 7, 7]} size={3.5} speed={1.2} color="#3B82F6" />

      {/* Orbiting HTML Tech Badges */}
      {TECH_ORBITS.map((tech, i) => {
        const IconComponent = tech.icon;
        return (
          <OrbitingNode key={tech.name} tech={tech} index={i} IconComponent={IconComponent} />
        );
      })}
    </group>
  );
};

interface OrbitingNodeProps {
  tech: (typeof TECH_ORBITS)[0];
  index: number;
  IconComponent: any;
}

const OrbitingNode: React.FC<OrbitingNodeProps> = ({ tech, index, IconComponent }) => {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * tech.speed + (index * Math.PI * 2) / TECH_ORBITS.length;
    const x = Math.cos(angle) * tech.radius;
    const z = Math.sin(angle) * tech.radius;

    if (nodeRef.current) {
      nodeRef.current.position.set(x, tech.yOffset + Math.sin(time + index) * 0.3, z);
    }
  });

  return (
    <group ref={nodeRef}>
      {/* occlude keeps badges from flickering in front of/behind the globe as it rotates */}
      <Html center distanceFactor={8} zIndexRange={[100, 0]} occlude transform={false}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-300 shadow-blue-glow whitespace-nowrap select-none hover:scale-110 hover:border-brand-blue transition-transform will-change-transform">
          <IconComponent className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-mono font-bold text-navy-900">{tech.name}</span>
        </div>
      </Html>
    </group>
  );
};

export const TechGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Capture phase = fires even if a Html badge underneath the cursor would
  // otherwise intercept the pointer move. This is what stops the freeze/snap.
  const handlePointerMoveCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      ref={containerRef}
      onPointerMoveCapture={handlePointerMoveCapture}
      className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#2563EB" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#60A5FA" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <React.Suspense fallback={null}>
            <TechGlobeMesh pointerRef={pointerRef} />
          </React.Suspense>
        </Float>
      </Canvas>
    </div>
  );
};