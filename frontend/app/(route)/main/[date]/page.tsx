"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useDate } from "@/app/store/date";
import { HoveredPlanetData } from "@/app/types/main";
import DateCard from "@/app/components/molecules/Card/DateCard";
import TimeMachineButtonGroup from "@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup";
import PlanetTrendModal from "@/app/components/organisms/Modal/PlanetTrendModal";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { planetTrendData } from "@/app/mocks/planetTrendData";
import { getValueFromRank } from "@/app/utils/libs/getValueFromRank";
import AlienGuideButton from "@/app/components/atoms/Button/AlienGuideButton";

// 커스텀 행성 타입 정의
interface CustomPlanet extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
}

const planetsArray: THREE.Mesh[] = [];

export default function Page(props:any) {
  const { date, setDate } = useDate();
  const {date : currentDate} = props.params;
  setDate(props.params.date);
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<HoveredPlanetData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    if (typeof window === "undefined") return;

    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    camera.current.position.z = 550;

    setupLights(scene);
    createParticles(scene); // 입자 생성

    const textureLoader = new THREE.TextureLoader();
    loadTextures(planetTrendData, textureLoader).then((textures) => {
      createPlanets(planetTrendData, scene, textures, camera.current!);
    });

    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
    
      // 행성 회전 적용
      animatePlanets();
    
      renderer.render(scene, camera.current!);
    }
    

    function onWindowResize() {
      camera.current!.aspect = window.innerWidth / window.innerHeight;
      camera.current!.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", (event) => onMouseMove(event, planetsArray, renderer)); // planetsArray를 사용
    window.addEventListener("click", (event) => onPlanetClick(event, planetsArray, renderer)); // planetsArray를 사용
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", (event) => onMouseMove(event, planetsArray, renderer));
      window.removeEventListener("click", (event) => onPlanetClick(event, planetsArray, renderer));
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // 마우스 움직임 처리 함수 (행성 배열만 검사)
  const onMouseMove = (event, planets, renderer) => {
    const throttledMouseMove = throttle((event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera.current!);
      const intersects = raycaster.intersectObjects(planets); // 행성 배열만 검사

      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        setHoveredPlanet({
          stockCode: intersected.userData.stockCode,
          corpName: intersected.userData.corpName,
          position: intersected.position.clone(),
        });
        setIsModalOpen(true);
        document.body.style.cursor = "pointer";
      } else {
        setHoveredPlanet(null);
        setIsModalOpen(false);
        document.body.style.cursor = "auto";
      }
    }, 50);

    throttledMouseMove(event);
  };

  // 행성 클릭 처리 함수 (행성 배열만 검사)
  const onPlanetClick = (event, planets, renderer) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera.current!);
    const intersects = raycaster.intersectObjects(planets); // 행성 배열만 검사

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      const { stockCode } = clickedPlanet.userData;
      router.push(`/planet/main/${stockCode}/${currentDate}`);
    }
  };
  const info = [
    '오늘은 어떤 주식이 인기 있었을까요?🌟',
    '주식이 뉴스에서 언급된 횟수에 따라',
    '주요 주식들을 행성 크기로 표현해보았어요!',
  ];

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: 0,
      }}
    >
      <RecoilRoot>
        <DateCard left="30px" date={date} label={"MAIN PAGE"}/>
        {isModalOpen && hoveredPlanet && (
          <PlanetTrendModal
            stockCode={hoveredPlanet.stockCode}
            corpName={hoveredPlanet.corpName}
            position={hoveredPlanet.position}
            camera={camera.current!}
            rendererDomElement={mountRef.current?.children[0] as HTMLCanvasElement}
            date={date}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </RecoilRoot>
      <AlienGuideButton info={info}/>
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}

// 행성 텍스처 로딩
async function loadTextures(planetsData, textureLoader) {
  const promises = planetsData.map((data) => {
    const textureId = (parseInt(data.stock_code) % 26) + 1;
    return new Promise((resolve) => {
      textureLoader.load(`/images/planetTexture/${textureId}.jpg`, resolve);
    });
  });
  return await Promise.all(promises);
}

// 행성 생성
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
    const planetSize = getValueFromRank(data.rank) * 0.7; // rank 기반으로 planet 크기 설정
    const geometry = new THREE.SphereGeometry(planetSize, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: textures[index] });

    // 커스텀 행성 타입으로 캐스팅
    const planet: CustomPlanet = new THREE.Mesh(geometry, material) as CustomPlanet;

    planet.position.set(
      centerPositions[index % centerPositions.length].x,
      centerPositions[index % centerPositions.length].y,
      centerPositions[index % centerPositions.length].z
    );

    scene.add(planet);
    planet.lookAt(camera.position);

    // 행성 배열에 추가
    planetsArray.push(planet);

    planet.userData = { stockCode: data.stock_code, corpName: data.stock_name };

    // 회전 속도를 랜덤으로 설정하여 각 행성이 다르게 회전하게 만듦
    planet.rotationSpeed = {
      x: Math.random() * 0.001,
      y: Math.random() * 0.007,
      z: Math.random() * 0.002,
    };
  });
}


function animatePlanets() {
  planetsArray.forEach((planet: CustomPlanet) => {
    // planet.rotation.x += planet.rotationSpeed.x;
    planet.rotation.y += planet.rotationSpeed.y;
  });
}

function createParticles(scene: THREE.Scene) {
  const particleGroup = new THREE.Group();
  const particleGeometry = new THREE.TetrahedronGeometry(1.5, 0);
  const colors = [0xe0e0e0, 0xA4A8FF, 0xFFA4DF, 0xb0e0e6]; // 색상 추가
  const materials = colors.map(
    (color) =>
      new THREE.MeshPhongMaterial({
        color: color,
        shininess: 80, // 광택
        specular: 0xffffff, // 반사광
        flatShading: true,
      })
  );

  // 입자 생성
  for (let i = 0; i < 1200; i++) {
    const material = materials[Math.floor(Math.random() * materials.length)];
    const particleMesh = new THREE.Mesh(particleGeometry, material);
    particleMesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    particleMesh.position.multiplyScalar(150 + Math.random() * 800);
    particleMesh.rotation.set(
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2
    );
    particleGroup.add(particleMesh);
  }

  scene.add(particleGroup);

  // 입자 그룹에 애니메이션 효과 추가 (천천히 회전)
  function animateParticles() {
    requestAnimationFrame(animateParticles);
    particleGroup.rotation.y += 0.001;
    particleGroup.rotation.x += 0.0005; // 입자가 더 다채롭게 회전
  }
  animateParticles();
}

function setupLights(scene: THREE.Scene) {
  // 더 밝은 주변광 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // 더 강한 방향성 조명 추가
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight1.position.set(100, 200, 100);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffcc66, 0.5);
  directionalLight2.position.set(75, 100, 10);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0x33ccff, 0.3);
  directionalLight3.position.set(0, 0, 300);
  scene.add(directionalLight3);
}

