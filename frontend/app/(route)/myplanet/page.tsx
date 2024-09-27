'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {FavoritesList} from '@/app/components/templates/myplanet/FavoritesList';
import { MdKeyboardArrowUp } from 'react-icons/md'; // Material Design Icons
import { FavoriteItemProps,FavoriteItem } from '@/app/types/myplanet';
import { PageContainer, CanvasContainer, FavoritesContainer, ToggleButton, FavoriteHeader} from "@/app/styles/myplanet"
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import Image from 'next/image';
import anime from 'animejs';
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
const ModalContainer = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: ${isOpen ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `}
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
`;


export default function Planet() {
  const mountRef = useRef<HTMLDivElement>(null);

  // 즐겨찾기 리스트 데이터
  const planetsData: FavoriteItem[] = [
    { rank: 1, name: '삼성전자', stockCode: '005930', price: '159,394원', change: '+ 2,377원 (1.5%)', isFavorite: true, iconSrc: '/images/logo/samsung.png' },
    { rank: 2, name: 'HLB', stockCode: '057880', price: '77,968원', change: '+ 2,190원 (2.8%)', isFavorite: true, iconSrc: '/images/logo/hlb.png' },
    { rank: 3, name: '에코프로', stockCode: '086530', price: '51,796원', change: '- 227원 (3.1%)', isFavorite: true, iconSrc: '/images/logo/ecopro.png' },
    { rank: 4, name: 'SK하이닉스', stockCode: '000660', price: '159,394원', change: '+ 2,377원 (1.5%)', isFavorite: true, iconSrc: '/images/logo/SK.png' },
    { rank: 5, name: '유한양행', stockCode: '000100', price: '77,968원', change: '+ 2,190원 (2.8%)', isFavorite: true, iconSrc: '/images/logo/uhan.png' },
  ];

  const [items, setItems] = useState(planetsData);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FavoriteItem | null>(null);
  const [playing, setPlaying] = useState(false); // playing 상태 추가

  const handleToggleFavorite = (index: number) => {
    const currentItem = items[index];
    // 고유 클래스 이름을 이용해 특정 아이템의 카드 요소를 선택
    const card = document.querySelector(`.card-${currentItem.rank}`);

    if (!playing) {
      setPlaying(true);
      anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        easing: 'easeInOutSine',
        duration: 300,
        complete: function (anim) {
          setPlaying(false);
          const updatedItems = items.map((item, i) =>
            i === index ? { ...item, isFavorite: !item.isFavorite } : item
          );
          setItems(updatedItems);
        }
      });
    }
};
  
  const handleContainerClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };


  const toggleFavorites = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: FavoriteItemProps) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // THREE.js 초기화 및 애니메이션 처리
  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let circle: THREE.Object3D;
    let surroundingPlanets: Array<{ mesh: THREE.Mesh; radius: number; angle: number; speed: number }> = [];
    let starGroup: THREE.Group; // 별 그룹
  
    const textureLoader = new THREE.TextureLoader();
    const numSurroundingPlanets = planetsData.length;
  
    async function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0);
  
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
  
      scene = new THREE.Scene();
  
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 500, 800);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);
  
      circle = new THREE.Object3D();
      scene.add(circle);
  
      // 별 그룹 생성
      starGroup = new THREE.Group();
      scene.add(starGroup);
  
      // 별 생성
      const starGeometry = new THREE.SphereGeometry(0.5, 8, 8); // 기본 별의 모양
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
      for (let i = 0; i < 2000; i++) {
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
  
        // 별의 크기와 위치를 랜덤하게 설정
        const scale = Math.random() * 0.5 + 0.5; // 0.5에서 1.0 사이의 랜덤 크기
        starMesh.scale.set(scale, scale, scale);
  
        starMesh.position.set(
          (Math.random() - 0.5) * 2000, // x 좌표
          (Math.random() - 0.5) * 2000, // y 좌표
          (Math.random() - 0.5) * 2000  // z 좌표
        );
        starGroup.add(starMesh); // 별을 그룹에 추가
      }
  
      // 구 모양의 행성으로 변경
      const geom = new THREE.SphereGeometry(14, 36, 36);
  
      // 텍스처 로딩 (중앙 행성에만 해당 텍스처 사용)
      const earthTexture = await new Promise<THREE.Texture>((resolve) => {
        textureLoader.load('/images/planetTexture/earth.jpg', (texture) => resolve(texture));
      });
  
      // 중심 행성 생성 (지구 텍스처를 사용)
      const centralPlanet = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({
          map: earthTexture, // 지구 텍스처를 적용
        })
      );
      centralPlanet.scale.set(16, 16, 16);
      circle.add(centralPlanet);
  
      const centralPlanetRadius = 16;
      const sizes = [6, 6, 6, 6, 5, 6];
      const textures = await loadTextures(planetsData, textureLoader); // 주변 행성 텍스처 로드
  
      for (let i = 0; i < numSurroundingPlanets; i++) {
        const radius = centralPlanetRadius * 20 + 150;
        const speed = 0.01 + Math.random() * 0.005; // 공전 속도를 더 빠르게 조정
  
        const surroundingPlanet = new THREE.Mesh(
          geom,
          new THREE.MeshStandardMaterial({ map: textures[i] }) // 주변 행성 텍스처
        );
        surroundingPlanet.scale.set(sizes[i % sizes.length], sizes[i % sizes.length], sizes[i % sizes.length]);
  
        const angle = i * (2 * Math.PI / numSurroundingPlanets);
        const x = radius * Math.cos(angle);
        const z = Math.random() * 5;
        surroundingPlanet.position.set(x, 0, z % 50);
  
        surroundingPlanets.push({ mesh: surroundingPlanet, radius, angle, speed });
        circle.add(surroundingPlanet);
      }
  
      // 조명 및 스타필드 설정
      addLights(scene);
  
      window.addEventListener('resize', onWindowResize, false);
    }
  
    async function loadTextures(planetsData: any[], textureLoader: THREE.TextureLoader): Promise<THREE.Texture[]> {
      const promises: Promise<THREE.Texture>[] = [];
      for (let i = 0; i < planetsData.length; i++) {
        const stockCode = Number(planetsData[i].stockCode.slice(0, -1)) % 18 + 1; // todo: planetTexture 수에 맞게 '%' 뒤의 숫자 적용
        promises.push(new Promise((resolve) => {
          textureLoader.load(`/images/planetTexture/${stockCode}.jpg`, (texture) => resolve(texture)); // stockCode로 이미지 로드
        }));
      }
      return await Promise.all(promises);
    }
  
    function addLights(scene: THREE.Scene) {
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
  
  
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    function animate() {
      requestAnimationFrame(animate);
      circle.rotation.y += 0.001;
  
      // 별 그룹을 천천히 회전시킴
      starGroup.rotation.y += 0.0005;
  
      surroundingPlanets.forEach(({ mesh, radius, angle, speed }) => {
        const newAngle = angle + speed;
        const x = radius * Math.cos(newAngle);
        const z = radius * Math.sin(newAngle);
  
        mesh.position.set(x, 0, z);
        mesh.rotation.y += speed;
  
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
  }, [planetsData]);
  

  return (
    <PageContainer>
     <CanvasContainer ref={mountRef} id="canvas" />
      <FavoritesContainer isOpen={isOpen} onClick={handleContainerClick}>
        <FavoriteHeader isOpen={isOpen}>관심 행성</FavoriteHeader>
        <FavoritesList
          items={items}
          onToggleFavorite={handleToggleFavorite}
          setSelectedItem={setSelectedItem}
        />
        <ToggleButton onClick={toggleFavorites}>
          <MdKeyboardArrowUp />
        </ToggleButton>
      </FavoritesContainer>

      {/* 모달 */}
      {selectedItem && (
        <ModalContainer isOpen={!!selectedItem}>
          <ModalContent>
            <h2>{selectedItem.name}</h2>
            <p>Price: {selectedItem.price}</p>
            <p>Change: {selectedItem.change}</p>
            <p>Icon:</p>
            <Image src={selectedItem.iconSrc} alt={selectedItem.name} width={100} height={100} />
            <button onClick={handleCloseModal}>Close</button>
          </ModalContent>
        </ModalContainer>
      )}
    </PageContainer>
  );
}