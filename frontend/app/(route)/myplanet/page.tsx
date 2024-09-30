'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {FavoritesList} from '@/app/components/templates/myplanet/FavoritesList';
import { MdKeyboardArrowUp } from 'react-icons/md'; // Material Design Icons
import { FavoriteItemProps,FavoriteItem } from '@/app/types/myplanet';
import { PageContainer, CanvasContainer, FavoritesContainer, ToggleButton, FavoriteHeader} from "@/app/styles/myplanet"
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { stockData } from '@/app/mocks/stockData';
import useKRChartWebSocket from '@/app/hooks/useKRChartWebSocket';
import Image from 'next/image';
import anime from 'animejs';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import formatPrice from '@/app/utils/apis/stock/formatPrice';

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

interface stockData {
  stock_name: string;
  stock_code: string;
}

interface favoriteItem {
  stock_name: string;
  stock_code: string;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
  isFavorite: boolean | null;
}


export default function Planet() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [stockDataInfo, setStockDataInfo] = useState<favoriteItem[]>(
    stockData.map((stock, idx) => ({
      rank: idx + 1,
      stock_name: stock.stock_name,
      stock_code: stock.stock_code,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
      isFavorite: false,
    }))
  );

  useKRStockWebSocket(stockData, setStockDataInfo);

  useEffect(() => {
    setItems(stockDataInfo.map(stock => ({
      rank: stockDataInfo.indexOf(stock) + 1,
      name: stock.stock_name,
      stockCode: stock.stock_code,
      price: stock.currentPrice ? `${stock.currentPrice}` : '',
      change: stock.changePrice
        ? `${stock.changePrice > 0 ? '+' : ''}${stock.changePrice}`
        : '',
      isFavorite: stock.isFavorite,
      iconSrc: `/stock_logos/Stock${stock.stock_code}.svg`,
    })));
    }, [stockDataInfo]);
  


 
  const [items, setItems] = useState<FavoriteItem[]>(
    stockDataInfo.map(stock => ({
      rank: stockDataInfo.indexOf(stock) + 1,
      name: stock.stock_name,
      stockCode: stock.stock_code,
      price: stock.currentPrice ? `${formatPrice(stock.currentPrice)}` : '',
      change: stock.changePrice
        ? `${stock.changePrice > 0 ? '+' : ''}${formatPrice(stock.changePrice)}`
        : '',
      isFavorite: stock.isFavorite,
      iconSrc: `/stock_logos/Stock${stock.stock_code}.svg`,
    }))
  );

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
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 100 }],
        rotateY: { value: '+=180', delay: 100 },
        easing: 'easeInOutSine',
        duration: 200,
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
    let particle: THREE.Object3D;
  
    const textureLoader = new THREE.TextureLoader();
    const numSurroundingPlanets = items.length;
  
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
      particle = new THREE.Object3D();
      scene.add(particle);

      const geometry = new THREE.TetrahedronGeometry(1, 0);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
      });

      for (let i = 0; i < 1000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position
          .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize();
        mesh.position.multiplyScalar(180 + Math.random() * 700);
        mesh.rotation.set(
          Math.random() * 2,
          Math.random() * 2,
          Math.random() * 2
        );
        particle.add(mesh);
      }

  
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
      const textures = await loadTextures(items, textureLoader); // 주변 행성 텍스처 로드
  
      surroundingPlanets = items.map((data, index) => {
        const planetMesh = createPlanetMesh(index); // 행성 메쉬 생성
        const radius = centralPlanetRadius * 20 + 180; // 거리 조정
        const speed = 0.01 + Math.random() * 0.002;
        const angle = (index * (2 * Math.PI / numSurroundingPlanets)); // 원형 배치

        // 행성의 위치 설정
        planetMesh.scale.set(6,6,6);
        planetMesh.position.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));

        return { mesh: planetMesh, radius, angle, speed };
      });
      circle.add(...surroundingPlanets.map(p => p.mesh)); // 모든 행성을 그룹에 추가
  
      // 조명 및 스타필드 설정
      addLights(scene);
  
      window.addEventListener('resize', onWindowResize, false);
    }

    function createPlanetMesh(index: number) {
      const geom = new THREE.SphereGeometry(12, 36, 36); // 구체 생성
      const texture = textureLoader.load(`/images/planetTexture/${index + 1}.jpg`); // 행성 텍스처 로드
      const material = new THREE.MeshStandardMaterial({ map: texture });
      return new THREE.Mesh(geom, material);
    }
  
    async function loadTextures(items: any[], textureLoader: THREE.TextureLoader): Promise<THREE.Texture[]> {
      const promises: Promise<THREE.Texture>[] = [];
      for (let i = 0; i < items.length; i++) {
        const stockCode = Number(items[i].stockCode.slice(0, -1)) % 18 + 1;
        promises.push(new Promise((resolve) => {
          textureLoader.load(`/images/planetTexture/${stockCode}.jpg`, (texture) => resolve(texture)); 
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
      // starGroup.rotation.y += 0.0005;
      particle.rotation.y -= 0.003;

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
  }, []);
  

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