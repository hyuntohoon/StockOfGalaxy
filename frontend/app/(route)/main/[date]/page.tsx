'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';
import { HoveredPlanetData } from '@/app/types/main';
import DateCard from '@/app/components/molecules/Card/DateCard';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';
import PlanetTrendModal from '@/app/components/organisms/Modal/PlanetTrendModal';
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';

const tempData = [
  { stockCode: '100001', corpName: '삼성전자', value: 180 },
  { stockCode: '100002', corpName: 'HLB', value: 165 },
  { stockCode: '100003', corpName: '에코프로', value: 150 },
  { stockCode: '100004', corpName: 'SK하이닉스', value: 135 },
  { stockCode: '100005', corpName: '유한양행', value: 110 },
  { stockCode: '100006', corpName: '유한양행', value: 95 },
  { stockCode: '100007', corpName: '유한양행', value: 80 },
  { stockCode: '100008', corpName: '유한양행', value: 65 },
];

export default function Page() {
  const currentDate = useRecoilValue(dateState);
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<HoveredPlanetData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const router = useRouter();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    camera.current.position.z = 550; // 카메라 위치 조정

    setupLights(scene);
    createStars(scene);

    const textureLoader = new THREE.TextureLoader();
    loadTextures(tempData, textureLoader).then((textures) => {
      createPlanets(tempData, scene, textures, camera.current);
    });

    let frameId; // 애니메이션 프레임 ID 저장
    function animate() {
      frameId = requestAnimationFrame(animate); // 애니메이션 프레임 요청
      renderer.render(scene, camera.current);
    }

    function onWindowResize() {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', event => onMouseMove(event, scene, renderer));
    window.addEventListener('click', event => onPlanetClick(event, scene, renderer)); // 클릭 이벤트 추가
    animate();

    return () => {
      cancelAnimationFrame(frameId); // 애니메이션 프레임 해제
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', event => onMouseMove(event, scene, renderer));
      window.removeEventListener('click', event => onPlanetClick(event, scene, renderer)); // 클릭 이벤트 해제
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const onMouseMove = (event, scene, renderer) => {
    const throttledMouseMove = throttle((event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera.current);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        setHoveredPlanet({
          stockCode: intersected.userData.stockCode,
          corpName: intersected.userData.corpName,
          position: intersected.position.clone(),
        });
        setIsModalOpen(true); // 모달 열기

        // 커서를 포인터로 변경
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredPlanet(null);
        setIsModalOpen(false); // 모달 닫기

        // 커서를 기본으로 변경
        document.body.style.cursor = 'auto';
      }
    }, 50); // 이벤트 처리 간격을 줄임

    throttledMouseMove(event);
  };

  const onPlanetClick = (event, scene, renderer) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera.current);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      const { stockCode } = clickedPlanet.userData;
      // 클릭 시 해당 행성 메인 페이지로 이동
      router.push(`/planet/main/${stockCode}/${currentDate}`);
    }
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}>
      <RecoilRoot>
        <DateCard left="30px" />
        {isModalOpen && hoveredPlanet && (
          <PlanetTrendModal
            stockCode={hoveredPlanet.stockCode}
            corpName={hoveredPlanet.corpName}
            position={hoveredPlanet.position}
            camera={camera.current}
            rendererDomElement={mountRef.current?.children[0] as HTMLCanvasElement}
            onClose={() => setIsModalOpen(false)} // 모달 닫기 함수 전달
          />
        )}
      </RecoilRoot>
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}

async function loadTextures(planetsData, textureLoader) {
  const promises = planetsData.map((data) => {
    const textureId = data.stockCode % 12 + 1;
    return new Promise((resolve) => {
      textureLoader.load(`/images/planetTexture/${textureId}.jpg`, resolve);
    });
  });
  return await Promise.all(promises);
}

function createPlanets(planetsData, scene, textures, camera) {
  const centerPositions = [
    { x: 0, y: 60, z: 0 },
    { x: -300, y: 120, z: 0 },
    { x: 180, y: -170, z: 0 },
    { x: -100, y: -220, z: 0 },
    { x: 250, y: 50, z: 0 },
    { x: 150, y: 250, z: 0 },
    { x: -280, y: -100, z: 0 },
    { x: -120, y: 270, z: 0 },
  ];

  planetsData.forEach((data, index) => {
    const planetSize = data.value * 0.7;
    const geometry = new THREE.SphereGeometry(planetSize, 24, 24);
    const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: textures[index] }));

    planet.position.set(
      centerPositions[index % centerPositions.length].x,
      centerPositions[index % centerPositions.length].y,
      centerPositions[index % centerPositions.length].z,
    );

    scene.add(planet);
    planet.lookAt(camera.position);

    planet.userData = { stockCode: data.stockCode, corpName: data.corpName };
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
