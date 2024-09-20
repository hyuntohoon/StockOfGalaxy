'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RecoilRoot } from 'recoil';
import DateCard from '@/app/components/molecules/Card/DateCard';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';
import RocketButtonGroup from '@/app/components/molecules/ButtonGroup/RocketButtonGroup';
import DetailTriangleButton from '@/app/components/atoms/Button/DetailTriangleButton';
import PlanetSimpleInfoCard from '@/app/components/molecules/Card/PlanetSimpleInfoCard';
import DetailTriangleButtonGuide from '@/app/components/atoms/Text/DetailTriangleButtonGuide';
import Rocket from '@/app/components/atoms/Button/Rocket';
import RocketModal from '@/app/components/organisms/Modal/RocketModal';

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const planetRadius = 150; // 행성의 반지름

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let circle: THREE.Object3D;
    let stars: THREE.Group; // 별 그룹

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0); // 배경 투명

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;
      scene.add(camera);

      circle = new THREE.Object3D(); // 행성 그룹
      stars = new THREE.Group(); // 별 그룹

      scene.add(circle);
      scene.add(stars);

      const starGeometry = new THREE.SphereGeometry(0.5, 8, 8); // 작은 구체 (별)
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      // 2000개의 별 생성
      for (let i = 0; i < 2000; i++) {
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        starMesh.position.set(
          (Math.random() - 0.5) * 2000, // x 좌표
          (Math.random() - 0.5) * 2000, // y 좌표
          (Math.random() - 0.5) * 2000  // z 좌표
        );
        stars.add(starMesh); // 별을 그룹에 추가
      }

      // 행성 생성
      const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
      const planetTexture = new THREE.TextureLoader().load('/images/planetTexture/3.jpg'); // 텍스처 경로 설정
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture, // 텍스처 추가
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      circle.add(planet);

      // 조명 설정
      const ambientLight = new THREE.AmbientLight(0x999999);
      scene.add(ambientLight);

      const lights: THREE.DirectionalLight[] = [];
      lights[0] = new THREE.DirectionalLight(0xffffff, 1);
      lights[1] = new THREE.DirectionalLight(0xffffff, 1);
      lights[2] = new THREE.DirectionalLight(0x122486, 1);
      lights[0].position.set(1, 0, 0);
      lights[1].position.set(0.75, 1, 0.5);
      lights[2].position.set(-0.75, -1, 0.5);
      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.y -= 0.0007; // 별들이 천천히 회전
      circle.rotation.y -= 0.004; // 행성 회전

      renderer.clear();
      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}></div>
      <RecoilRoot>
        <DateCard />
        <PlanetSimpleInfoCard />
        <TimeMachineButtonGroup />
        <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
        <DetailTriangleButtonGuide />
        <DetailTriangleButton />
        <Rocket planetRadius={150} />
        {isRocketModalOpen && <RocketModal onClose={() => setIsRocketModalOpen(false)} />}
      </RecoilRoot>
    </div>
  );
}