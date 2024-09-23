'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import RocketCardModal from '@/app/components/organisms/Modal/RocketCardModal';
import { RocketData } from '@/app/types/rocket';
import { throttle } from 'lodash';

interface RocketProps {
  scene: THREE.Scene;
  rocketData: RocketData[];
}

const fixedPositions = [
  { x: 100, y: 50, z: 150 },
  { x: -110, y: 40, z: 150 },
  { x: 0, y: 120, z: 150 },
  { x: -90, y: -90, z: 150 },
  { x: 110, y: -60, z: 150 },
  { x: 20, y: -100, z: 150 },
  { x: 10, y: 10, z: 150 },
];

export default function Rockets({ scene, rocketData }: RocketProps) {
  const [selectedRocket, setSelectedRocket] = useState<RocketData | null>(null);
  const [hoveredRocket, setHoveredRocket] = useState<THREE.Mesh | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHoveredRocket(null);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.current.position.z = 400;

    const textureLoader = new THREE.TextureLoader();
    const rocketTexture = textureLoader.load('/images/planet/rocket2.png');
    const rocketMaterial = new THREE.MeshBasicMaterial({
      map: rocketTexture,
      transparent: true,
      opacity: 0.97,
      side: THREE.DoubleSide,
    });

    const rockets = fixedPositions.map((pos, index) => {
      const data = rocketData[index];
      const scaleWidth = Math.random() * 30 + 60;
      const scaleHeight = (scaleWidth / 7) * 4;
      const planeGeometry = new THREE.PlaneGeometry(scaleWidth, scaleHeight);
      const rocket = new THREE.Mesh(planeGeometry, rocketMaterial);
      rocket.position.set(pos.x, pos.y, pos.z);
      rocket.userData = data;
      scene.add(rocket);
      return rocket;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = throttle((event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera.current!);
      camera.current!.updateMatrixWorld();

      const intersects = raycaster.intersectObjects(rockets);

      if (intersects.length > 0) {
        const intersectedRocket = intersects[0].object as THREE.Mesh;
        setSelectedRocket(intersectedRocket.userData as RocketData);
        setHoveredRocket(intersectedRocket);
        setIsModalOpen(true);
      } else {
        setHoveredRocket(null);
        if (isModalOpen) {
          handleCloseModal();
        }
      }
    }, 100);

    window.addEventListener('mousemove', onMouseMove);

    const onWindowResize = () => {
      camera.current!.aspect = window.innerWidth / window.innerHeight;
      camera.current!.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera.current!);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      rockets.forEach(rocket => scene.remove(rocket));
    };
  }, [scene, rocketData]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }}>
      {hoveredRocket && isModalOpen && selectedRocket && (
        <RocketCardModal
          onClose={handleCloseModal}
          position={hoveredRocket.position}
          camera={camera.current!}
          rendererDomElement={mountRef.current?.querySelector('canvas')!}
          data={selectedRocket}
        />
      )}
    </div>
  );
}
