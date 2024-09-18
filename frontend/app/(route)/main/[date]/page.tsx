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
    { planetId: 2, value: 160 },
    { planetId: 3, value: 150 },
    { planetId: 4, value: 120 },
    { planetId: 5, value: 100 },
    { planetId: 6, value: 90 },
    { planetId: 7, value: 80 },
  ];

  useEffect(() => {
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 500; // 카메라 위치 조정

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.0);

    mountRef.current?.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    setupLights(scene);
    createStars(scene);
    createPlanets(tempData, scene, textureLoader, camera);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    const handleResize = () => onWindowResize(camera, renderer);
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
        <DateCard left="30px"/>
      </RecoilRoot>
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}


function createPlanets(planetsData, scene, textureLoader, camera) {
  const centerPositions = [
    { x: -150, y: 100 }, { x: 150, y: 100 }, { x: -150, y: -100 },
    { x: 150, y: -100 }, { x: 0, y: 200 }, { x: 0, y: -200 },
    { x: 0, y: 0 }
  ];
  
  planetsData.forEach((data, index) => {
    const textureId = data.planetId % 12 + 1; // 아직 행성 texture이 12개 밖에 없음
    const texture = textureLoader.load(`/image/${textureId}.jpg`);
    
    // 행성의 크기를 value 값에 따라 더 크게 변화하도록 설정
    const planetSize = data.value * 0.5;
    const geometry = new THREE.SphereGeometry(planetSize, 32, 32);

    const material = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);

    planet.position.set(
      centerPositions[index % centerPositions.length].x, 
      centerPositions[index % centerPositions.length].y, 
      0
    );

    planet.lookAt(camera.position);

    scene.add(planet);
  });
}


function setupLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xaaaaaa);
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
}

function createStars(scene) {
  const starGeometry = new THREE.SphereGeometry(0.5, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  Array.from({ length: 2000 }, () => {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
    scene.add(star);
  });
}

function onWindowResize(camera, renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영 행렬 업데이트
  renderer.setSize(window.innerWidth, window.innerHeight);
}
