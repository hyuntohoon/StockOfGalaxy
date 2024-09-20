'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Rocket({ planetRadius }: { planetRadius: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let rocket: THREE.Sprite;
    let angle = 0; // 공전 각도
    const radius = planetRadius + 50; // 행성으로부터 로켓의 거리(공전 반지름)

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const fieldOfView = 75; // 시야각 조정
    const aspectRatio = WIDTH / HEIGHT;
    const nearPlane = 1;
    const farPlane = 3000; // 더 멀리 보이도록 설정 (값을 높임)

    // Three.js 기본 설정
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, planetRadius, planetRadius * 3); // 카메라 위치 조정

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 로켓 이미지 로드
    const textureLoader = new THREE.TextureLoader();
    const rocketTexture = textureLoader.load('/images/planet/rocket2.png');

    const rocketMaterial = new THREE.SpriteMaterial({ map: rocketTexture });

    // 로켓 생성
    rocket = new THREE.Sprite(rocketMaterial);
    rocket.scale.set(140, 80, 3); // 로켓 크기 설정
    scene.add(rocket); // 로켓을 씬에 추가

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      // 각도를 기반으로 로켓의 위치 업데이트 (공전 운동)
      angle += 0.02; // 각도 증가 (속도 조정)

      // 원형 경로의 x 좌표와 z 좌표
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      // y 좌표는 행성의 적도 높이에 고정
      const y = 0; // 행성의 중앙 (적도)

      // 로켓이 행성 뒤로 들어갔다가 다시 앞으로 나오는 궤도
      rocket.position.set(x, y, z); // z 축을 이용해 앞뒤로 위치

      // 카메라가 로켓을 볼 수 있게 보이게 설정
      camera.lookAt(0, 0, 0); // 카메라가 항상 행성 중심을 보도록 설정

      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 조정 처리
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [planetRadius]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}
