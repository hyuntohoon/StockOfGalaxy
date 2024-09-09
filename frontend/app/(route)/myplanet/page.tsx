'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import {FavoritesList} from '@/app/components/templates/myplanet/FavoritesList';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
`;


const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const FavoritesContainer = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '350px' : '250px')};
  height: ${({ isOpen }) => (isOpen ? 'fit' : '27px')};
  background-color: ${({isOpen}) => (isOpen ? 'rgba(245, 245, 245, 0.45)' : 'rgba(245, 245, 245, 0.15)' )};
  padding: 20px;
  color: #000;
  border-radius: 15px;
  margin: 20px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: height 0.3s ease, padding 0.3s ease, width 0.3s ease, background-color 0.4s ease;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: ${({ isOpen }) => (isOpen ? 'auto' : 'pointer')};
`;

const ToggleButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10;
`;


const FavoriteHeader = styled.h2<{ isOpen: boolean }>`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.3rem;
  color:${({ isOpen }) => (isOpen ? '#222' : '#CCC')};
  transition: color 0.3s ease;
`;

// interface FavoritesListProps {
//   items: Array<{
//     rank: number;
//     name: string;
//     price: string;
//     change: string;
//     isFavorite: boolean;
//     iconSrc: string;
//   }>;
//   onToggleFavorite: (index: number) => void;
// }

export default function Planet() {
  const mountRef = useRef<HTMLDivElement>(null);

  // 즐겨찾기 리스트 데이터
  const initialItems = [
    { rank: 1, name: '삼성전자', price: '159,394원', change: '+ 2,377원 (1.5%)', isFavorite: true, iconSrc: '/images/logo/samsung.png' },
    { rank: 2, name: 'HLB', price: '77,968원', change: '+ 2,190원 (2.8%)', isFavorite: false, iconSrc: '/images/logo/hlb.png' },
    { rank: 3, name: '에코프로', price: '51,796원', change: '- 227원 (3.1%)', isFavorite: false, iconSrc: '/images/logo/ecopro.png' },
    { rank: 4, name: 'SK하이닉스', price: '159,394원', change: '+ 2,377원 (1.5%)', isFavorite: true, iconSrc: '/images/logo/SK.png' },
    { rank: 5, name: '유한양행', price: '77,968원', change: '+ 2,190원 (2.8%)', isFavorite: false, iconSrc: '/images/logo/uhan.png' },
  ];

  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(true);


  const handleToggleFavorite = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setItems(updatedItems);
  };

  const handleContainerClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };


  const toggleFavorites = () => {
    setIsOpen(!isOpen);
  };

  // THREE.js 초기화 및 애니메이션 처리
  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let circle: THREE.Object3D;
    let surroundingPlanets: Array<{ mesh: THREE.Mesh; radius: number; angle: number; speed: number }> = [];

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth * 0.7, window.innerHeight); // 캔버스 크기 수정
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 500, 800); // 카메라를 위쪽에서 바라보도록 설정
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);

      circle = new THREE.Object3D();
      scene.add(circle);

      const geom = new THREE.IcosahedronGeometry(8, 1);
      const mat = new THREE.MeshPhongMaterial({ color: 0x33aaFF, flatShading: true });
      const mat1 = new THREE.MeshPhongMaterial({ color: 0x4682B4, flatShading: true });

      // 중심 행성 추가
      const centralPlanet = new THREE.Mesh(geom, mat);
      centralPlanet.scale.set(16, 16, 16);
      circle.add(centralPlanet);

      // 중심 행성의 반지름
      const centralPlanetRadius = 16;
      const numSurroundingPlanets = 6;
      const sizes = [6, 6, 6, 6, 5, 6]; // 각 행성의 크기 설정

      // 공전 반지름과 회전 속도 설정
      for (let i = 0; i < numSurroundingPlanets; i++) {
        const radius = centralPlanetRadius * 20 + 150; // 중심 행성의 반지름보다 항상 크게 설정
        const speed = 0.0015 + Math.random() * 0.001; // 각 행성의 공전 속도 설정

        const surroundingPlanet = new THREE.Mesh(geom, mat1);
        surroundingPlanet.scale.set(8, 8, 8); // 각 행성의 크기 설정

        // 주변 행성의 초기 위치 설정
        const angle = i * (2 * Math.PI / numSurroundingPlanets);
        const x = radius * Math.cos(angle);
        const z = Math.random() * 5;
        surroundingPlanet.position.set(x, 0, z % 50);

        // 회전 속도 및 궤도 반지름 설정
        surroundingPlanets.push({ mesh: surroundingPlanet, radius, angle, speed });
        circle.add(surroundingPlanet);
      }

      // 조명 추가
      const ambientLight = new THREE.AmbientLight(0x999999);
      scene.add(ambientLight);

      const lights = [];
      lights[0] = new THREE.DirectionalLight(0xffffff, 2); // Directional light 강도 증가
      lights[0].position.set(1, 0, 0);
      lights[1] = new THREE.DirectionalLight(0x11E8BB, 2); // Directional light 강도 증가
      lights[1].position.set(0.75, 1, 0.5);
      lights[2] = new THREE.DirectionalLight(0x8200C9, 2); // Directional light 강도 증가
      lights[2].position.set(-0.75, -1, 0.5);
      lights.forEach(light => {
        light.castShadow = true;
        scene.add(light);
      });

      // 스타필드 추가
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 10000;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = Math.random() * 2000 - 1000;
        positions[i * 3 + 1] = Math.random() * 2000 - 1000;
        positions[i * 3 + 2] = Math.random() * 2000 - 1000;
      }
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.5 });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.7, window.innerHeight); // 캔버스 크기 수정
    }

    function animate() {
      requestAnimationFrame(animate);

      // 전체 시스템 회전
      circle.rotation.y += 0.001;

      // 각 행성의 위치와 회전 업데이트
      surroundingPlanets.forEach(({ mesh, radius, angle, speed }) => {
        const newAngle = angle + speed;
        const x = radius * Math.cos(newAngle);
        const z = radius * Math.sin(newAngle);

        mesh.position.set(x, 0, z);
        mesh.rotation.y += speed;

        // 업데이트된 각도 저장
        angle = newAngle;
      });

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
    <PageContainer>
      <CanvasContainer ref={mountRef} id="canvas" />
      <FavoritesContainer isOpen={isOpen} onClick={handleContainerClick}>
        {isOpen && (<ToggleButton onClick={(e) => { e.stopPropagation(); toggleFavorites(); }}>
          접기
        </ToggleButton>)}
        <FavoriteHeader isOpen={isOpen}>관심 행성</FavoriteHeader>
        <FavoritesList items={items} onToggleFavorite={handleToggleFavorite} />
      </FavoritesContainer>
    </PageContainer>
  );
}