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
import { rocketTop7ListData } from '@/app/mocks/rocketTop7ListData';

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;

export default function Home(props:any) {
  const {date} = props.params;
  const {setDate} = useDate();
  setDate(date);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rocketData, setRocketData] = useState<RocketData[]>([]);
  const planetRadius = 150;
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const textureId = (parseInt(stockCode.slice(0, -1)) % 26) + 1;

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: null,
      stock_code: stockCode || null,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
  ]);

  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const fetchRocketData = async () => {
    try {
      const response = await getTop7RocketsApi(stockCode);
      // const response = rocketTop7ListData.rocketList; // toto: api 연동해서 실제 데이터로 변경
      setRocketData(response);
    } catch (error) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', error);
    }
  };

  // 확인용
  useEffect(() => {
    console.log('stockDataInfo 업데이트됨:', stockDataInfo);
  }, [stockDataInfo]);

  useEffect(() => {
    fetchRocketData();
  }, [stockCode]);

  useKRStockWebSocket([{ stock_code: stockCode }], setStockDataInfo);

  useEffect(() => {
    let circle: THREE.Object3D;
    let stars: THREE.Group;

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const newScene = new THREE.Scene();
      setScene(newScene);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;
      newScene.add(camera);

      circle = new THREE.Object3D();
      stars = new THREE.Group();

      newScene.add(circle);
      newScene.add(stars);

      const starGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < 2000; i++) {
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        starMesh.position.set(
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000
        );
        stars.add(starMesh);
      }

      const planetGeometry = new THREE.SphereGeometry(planetRadius, 48, 48);
      const planetTexture = new THREE.TextureLoader().load(`/images/planetTexture/${textureId}.jpg`);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      circle.add(planet);

      const ambientLight = new THREE.AmbientLight(0xBEBEBE);
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
            gl_FragColor = vec4(1.0, 1.0, 0.5, 1.0) * intensity;
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false,
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
        stars.rotation.y -= 0.001;
        circle.rotation.y += 0.004;
        renderer.clear();
        renderer.render(newScene, camera);
      }

      animate();
    }

    if (!isLoading) {
      init();
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && renderer) {
        renderer.dispose();
      }
    };

  }, [isLoading]);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading ? (
        <TypeWritter onFinish={() => setIsLoading(false)} />
      ) : (
        <>
          <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}></div>
          <RecoilRoot>
            <DateCard right='30px'date={date} label={"PLANET PAGE"} />
            <PlanetSimpleInfoCard />
            <TimeMachineButtonGroup />
            <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
            {scene && <Rocket scene={scene} rocketData={rocketData} currentPrice={stockDataInfo[0]?.currentPrice || 0} />}
            {isRocketModalOpen && <RocketModal onClose={() => setIsRocketModalOpen(false)} currentPrice={stockDataInfo[0]?.currentPrice || 0} />}
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