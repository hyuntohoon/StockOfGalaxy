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
import { RocketData } from '@/app/types/rocket';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;

// 임시 댓글 데이터
// todo: imageUrl -> characterType(number) 로 변경해야 함
const tempData: RocketData[] = [
  {
    userId: 1,
    nickname: '참1',
    price: '715200',
    priceChangeSign: '-',
    priceChange: '0.04',
    message: '응 절대 안 올라 평생 버텨봐~우오오ㅇ아~우오오~우오오~우오오ㅇdddddfasdfasdf아아아아',
    createdAt: "2024.08.29 11:23",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 2,
    nickname: '참2',
    price: '715100',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '절대 안 올라~ 버텨~ 우오오ㅇ아!',
    createdAt: "2024.08.29 12:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 3,
    nickname: '참3',
    price: '714200',
    priceChangeSign: '+',
    priceChange: '0.07',
    message: '아무리 기다려도 오르지 않을걸~',
    createdAt: "2024.08.29 12:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 4,
    nickname: '참4',
    price: '716200',
    priceChangeSign: '-',
    priceChange: '0.02',
    message: '이거는 진짜 안 올라!',
    createdAt: "2024.08.29 13:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 5,
    nickname: '참5',
    price: '715900',
    priceChangeSign: '-',
    priceChange: '0.02',
    message: '버텨봐도 소용없어~',
    createdAt: "2024.08.29 13:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 6,
    nickname: '참6',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '우오오~ 이건 절대 오르지 않아!',
    createdAt: "2024.08.29 14:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 7,
    nickname: '참7',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '포기해~ 올라갈 리가 없어!',
    createdAt: "2024.08.29 14:30",
    imageUrl: '/images/rocket/profile2.png'
  }
];


export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const planetRadius = 150; // 행성의 반지름

  // scene을 상태로 관리
  const [scene, setScene] = useState<THREE.Scene | null>(null);

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
      const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
      const planetTexture = new THREE.TextureLoader().load('/images/planetTexture/3.jpg'); // 텍스처 경로 설정
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

    init();

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
        <DateCard  right='30px' />
        <PlanetSimpleInfoCard />
        <TimeMachineButtonGroup />
        <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
        {scene && <Rocket scene={scene} rocketData={tempData}/>}
        {isRocketModalOpen && <RocketModal onClose={() => setIsRocketModalOpen(false)} />}
        {/* <DateCard right='30px'/> */}
      </RecoilRoot>
      <DetailTriangleButton />
      <DetailTriangleButtonGuide />
    </div>
  );
}

function onWindowResize(this: Window, ev: UIEvent) {
  throw new Error('Function not implemented.');
}
