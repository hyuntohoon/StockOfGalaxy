'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RecoilRoot } from 'recoil';
import DateCard from '@/app/components/molecules/Card/DateCard';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);

  const tempData = [
    { planetId: 1, value: 180 },
    { planetId: 2, value: 165 },
    { planetId: 3, value: 150 },
    { planetId: 4, value: 135 },
    { planetId: 5, value: 110 },
    { planetId: 6, value: 95 },
    { planetId: 7, value: 80 },
    { planetId: 8, value: 65 },
  ];

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 550;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.0);
    mountRef.current?.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    setupLights(scene);
    createStars(scene);

    // 텍스처를 비동기적으로 미리 로드
    loadTextures(tempData, textureLoader).then((textures) => {
      createPlanets(tempData, scene, textures, camera); // 모든 텍스처가 로드된 후에 행성 생성
    });

    // 애니메이션 루프에서 프레임 속도 제한 (30 FPS)
    const animate = () => {
      setTimeout(() => {
        requestAnimationFrame(animate); // 프레임 속도를 제한하여 CPU/GPU 부하를 줄임
        renderer.render(scene, camera); // 장면을 렌더링
      }, 1000 / 30); // 30 FPS로 제한 (1000ms를 30으로 나눈 값만큼 대기)
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}>
      <RecoilRoot>
        <DateCard left="30px" />
      </RecoilRoot>
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}

// 텍스처 미리 로드: 각 행성의 텍스처를 병렬로 로드하여 성능 최적화
async function loadTextures(planetsData, textureLoader) {
  const promises = planetsData.map((data) => {
    const textureId = data.planetId % 12 + 1; // todo: 플래닛 텍스쳐 불러오는 방법 수정 필요
    return new Promise((resolve) => {
      textureLoader.load(`/image/${textureId}.jpg`, resolve); // 비동기적으로 텍스처 로드
    });
  });
  return await Promise.all(promises); // 모든 텍스처가 로드된 후 반환
}

function createPlanets(planetsData, scene, textures, camera) {
  const centerPositions = [
    { x: 0, y: 60 }, { x: -300, y: 120 }, { x: 180, y: -170 },
    { x: -100, y: -220 }, { x: 250, y: 50 }, { x: 150, y: 250 },
    { x: -280, y: -100 }, { x: -120, y: 270 },
  ];

  planetsData.forEach((data, index) => {
    const planetSize = data.value * 0.7;
    const geometry = new THREE.SphereGeometry(planetSize, 24, 24);
    const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: textures[index] }));

    planet.position.set(
      centerPositions[index % centerPositions.length].x,
      centerPositions[index % centerPositions.length].y,
      0
    );

    planet.lookAt(camera.position); // 카메라를 바라보도록 설정
    scene.add(planet);

    // 메모리 관리: 사용된 geometry와 material을 명시적으로 해제
    planet.geometry.dispose();
    planet.material.dispose();
  });
}

function setupLights(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0xaaaaaa);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight1.position.set(1, 0, 0);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(0.75, 1, 0.5);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0x122486, 0.5);
  directionalLight3.position.set(-0.75, -1, 0.5);
  scene.add(directionalLight3);
}

function createStars(scene: THREE.Scene) {
  const starGeometry = new THREE.SphereGeometry(0.5, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < 2000; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
    scene.add(star);
  }
}
