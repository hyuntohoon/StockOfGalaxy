'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RecoilRoot } from 'recoil';
import { useParams } from 'next/navigation';
import DateCard from '@/app/components/molecules/Card/DateCard';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';
import RocketButtonGroup from '@/app/components/molecules/ButtonGroup/RocketButtonGroup';
import DetailTriangleButton from '@/app/components/atoms/Button/DetailTriangleButton';
import PlanetSimpleInfoCard from '@/app/components/molecules/Card/PlanetSimpleInfoCard';
import DetailTriangleButtonGuide from '@/app/components/atoms/Text/DetailTriangleButtonGuide';
import Rocket from '@/app/components/atoms/Button/Rocket';
import RocketModal from '@/app/components/organisms/Modal/RocketModal';
import { RocketData } from '@/app/types/rocket';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import { getTop7RocketsApi } from '@/app/utils/apis/rocket';
import TypeWritter from './TypeWritter';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태
  const [rocketData, setRocketData] = useState<RocketData[]>([]); // 로켓 데이터 상태
  const [currentPrice, setCurrentPrice] = useState<string | null>(null); // 실시간 주가 상태
  const planetRadius = 150; // 행성의 반지름
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;

  // scene을 상태로 관리
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  // API로부터 로켓 데이터를 불러오는 함수
  const fetchRocketData = async () => {
    try {
      const response = await getTop7RocketsApi(stockCode);
      setRocketData(response); // 로켓 데이터를 상태로 저장
    } catch (error) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', error);
    }
  };

  // 웹소켓을 통해 실시간 주가 데이터를 받아오는 훅
  useKRStockWebSocket(
    [{ stock_code: stockCode, stock_name: "삼성전자" }],  // todo: 주식 코드와 주식 이름을 전달
    (updatedStockData) => {
      // updatedStockData가 배열인지 확인
      if (Array.isArray(updatedStockData)) {
        const stock = updatedStockData.find((s) => s.stock_code === stockCode);
        if (stock) {
          setCurrentPrice(stock.currentPrice); // 실시간 주가 업데이트
        }
      } else {
        console.error('updatedStockData가 배열이 아닙니다:', updatedStockData);
      }
    }
  );

  useEffect(() => {
    fetchRocketData(); // 컴포넌트가 마운트될 때 로켓 데이터 불러오기
  }, [stockCode]);

  useEffect(() => {
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

      // Scene 생성 및 상태 업데이트
      const newScene = new THREE.Scene();
      setScene(newScene);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;
      newScene.add(camera);

      circle = new THREE.Object3D(); // 행성 그룹
      stars = new THREE.Group(); // 별 그룹

      newScene.add(circle);
      newScene.add(stars);

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
      const planetGeometry = new THREE.SphereGeometry(planetRadius, 48, 48);
      const planetTexture = new THREE.TextureLoader().load('/images/planetTexture/1.jpg'); // todo: stockCode 로 텍스처 경로 설정
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture, // 텍스처 추가
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      circle.add(planet);

      // 조명 설정
      const ambientLight = new THREE.AmbientLight(0x999999);
      newScene.add(ambientLight);

      const lights: THREE.DirectionalLight[] = [];
      lights[0] = new THREE.DirectionalLight(0xffffff, 0.5);
      lights[1] = new THREE.DirectionalLight(0xffffff, 0.3);
      lights[2] = new THREE.DirectionalLight(0x122486, 0.5);
      lights[0].position.set(1, 0, 0);
      lights[1].position.set(0.75, 1, 0.5);
      lights[2].position.set(-0.75, -1, 0.5);
      newScene.add(lights[0]);
      newScene.add(lights[1]);
      newScene.add(lights[2]);

      // 글로우 효과 추가
      const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.4 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(1.0, 1.0, 0.5, 1.0) * intensity; // 더 강한 노란 빛
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false, // 깊이 테스트 비활성화
      });      

      const glowMesh = new THREE.Mesh(planetGeometry.clone(), glowMaterial);
      glowMesh.scale.multiplyScalar(1.2); // 행성보다 더 크게 설정하여 외곽에 글로우
      circle.add(glowMesh);

      window.addEventListener('resize', onWindowResize, false);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);

        stars.rotation.y -= 0.001; // 별들이 천천히 회전
        circle.rotation.y -= 0.004; // 행성 회전

        renderer.clear();
        renderer.render(newScene, camera);
      }

      animate();
    }

    if (!isLoading) { // 로딩이 끝나면 초기화 실행
      init();
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && renderer) { // renderer가 초기화된 경우에만 제거
         renderer.dispose(); // renderer가 있을 때만 dispose 호출
      }
    };
    
  }, [isLoading]);

 return (
    <div style={{ position: 'relative' }}>
      {isLoading ? (
        <TypeWritter onFinish={() => setIsLoading(false)} />  // 3초 후 로딩 완료
      ) : (
        <>
          <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}></div>
          <RecoilRoot>
            <DateCard right='30px' />
            <PlanetSimpleInfoCard />
            <TimeMachineButtonGroup />
            <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
            {scene && <Rocket scene={scene} rocketData={rocketData} currentPrice={currentPrice} />} {/* 실시간 주가 전달 */}
            {isRocketModalOpen && <RocketModal onClose={() => setIsRocketModalOpen(false)} />}
          </RecoilRoot>
          <DetailTriangleButton />
          <DetailTriangleButtonGuide />
        </>
      )}
    </div>
  );
}

function onWindowResize(this: Window, ev: UIEvent) {
  throw new Error('Function not implemented.');
}