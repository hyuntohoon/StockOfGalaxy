"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RecoilRoot } from "recoil";
import { useDate } from "@/app/store/date";
import DateCard from "@/app/components/molecules/Card/DateCard";
import TimeMachineButtonGroup from "@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup";
import PlanetTrendModal from "@/app/components/organisms/Modal/PlanetTrendModal";
import PlanetTrendErrorModal from "@/app/components/organisms/Modal/PlanetTrendErrorModal";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { getValueFromRank } from "@/app/utils/libs/getValueFromRank";
import AlienGuideButton from "@/app/components/atoms/Button/AlienGuideButton";
import { getPlanetTrendApi } from "@/app/utils/apis/stock";
import ViewAllButton from "@/app/components/atoms/Button/ViewAllButton";

interface CustomPlanet extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
}

const planetsArray: THREE.Mesh[] = [];

export default function Page(props: any) {
  const { date, isToday } = useDate();
  // console.log('이동한 날짜: ', date)
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 에러 모달 상태
  const [isViewAllHover, setIsViewAllHover] = useState(false); // ViewAllButton hover 상태
  const [trendData, setTrendData] = useState([]);
  const [textures, setTextures] = useState([]);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const router = useRouter();
  const [daysAgo, setDaysAgo] = useState(0);


  useEffect(() => {
    if (typeof window === "undefined") return;
  
    // 카메라 설정
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
    createParticles(scene);
  
    const textureLoader = new THREE.TextureLoader();
  
    // 이전 행성들을 삭제하는 함수
    function clearPlanets() {
      planetsArray.forEach((planet) => {
        scene.remove(planet); // 씬에서 행성을 제거
    
        // planet.geometry.dispose()로 geometry 자원 해제
        planet.geometry.dispose();
    
        // planet.material이 배열일 수 있으므로 확인
        if (Array.isArray(planet.material)) {
          planet.material.forEach((material) => material.dispose()); // 배열일 경우 각 material의 dispose 호출
        } else {
          planet.material.dispose(); // 단일 material일 경우 dispose 호출
        }
      });
    
      planetsArray.length = 0; // 행성 배열 초기화
    }
    
  
    // 빈 배열일 경우 오늘 날짜로 이동
    function handleEmptyDataError() {
      setIsErrorModalOpen(true); // 에러 모달을 열기
    }
  
    getPlanetTrendApi(date)
      .then((data) => {
        const trendData = data.stockTop8ResponseList;
  
        if (!trendData || trendData.length === 0) {
          // 빈 배열일 경우 모달을 열기
          handleEmptyDataError();
          return;
        }
  
        // 텍스처 로드 후 새로운 행성 생성
        return loadTextures(trendData, textureLoader).then((textures) => ({
          trendData,
          textures,
        }));
      })
      .then(({ trendData, textures }) => {
        clearPlanets(); // 새로운 데이터가 오면 이전 행성을 삭제
        createPlanets(trendData, scene, textures, camera.current!); // 새로운 행성 생성
        setTrendData(trendData); // 행성 데이터를 상태에 저장
        setTextures(textures); // 텍스처 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("행성 트렌드 데이터를 불러오는 중 오류 발생:", error);
        handleEmptyDataError(); // API 오류 시 모달을 열기
      });
  
    let frameId: number;
  
    function animate() {
      frameId = requestAnimationFrame(animate);
      animatePlanets();
      renderer.render(scene, camera.current!);
    }
  
    function onWindowResize() {
      camera.current!.aspect = window.innerWidth / window.innerHeight;
      camera.current!.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", (event) =>
      onMouseMove(event, planetsArray, renderer)
    );
    window.addEventListener("click", (event) =>
      onPlanetClick(event, planetsArray, renderer)
    );
    animate();

    // 오늘 날짜와 비교하여 며칠 전인지 계산
      const today = new Date();
      const inputDate = new Date(
        parseInt(date.substring(0, 4)),   // 년
        parseInt(date.substring(4, 6)) - 1, // 월 (0부터 시작하기 때문에 -1)
        parseInt(date.substring(6, 8))    // 일
      );
  
      const diffTime = today.getTime() - inputDate.getTime(); // 밀리초 단위 차이
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 며칠 전인지 계산
  
      // 오늘이면 isToday true, 아니면 false
      setDaysAgo(diffDays);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", (event) =>
        onMouseMove(event, planetsArray, renderer)
      );
      window.removeEventListener("click", (event) =>
        onPlanetClick(event, planetsArray, renderer)
      );
      mountRef.current?.removeChild(renderer.domElement);
      clearPlanets(); // 컴포넌트 언마운트 시 이전 행성을 삭제
    };

    
  }, [date]);
  

  // 마우스 움직임 처리 함수
  const onMouseMove = (event, planets, renderer) => {
    const throttledMouseMove = throttle((event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera.current!);
      const intersects = raycaster.intersectObjects(planets);

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

  // 행성 클릭 처리 함수
  const onPlanetClick = (event, planets, renderer) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera.current!);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      const { stockCode } = clickedPlanet.userData;
      router.push(`/planet/main/${stockCode}/${date}`);
    }
  };

  const info = [
    "오늘은 어떤 주식이 인기일까요?🌟",
    "오늘 뉴스에서 주식이 언급되는 횟수에 따라",
    "핫한 주식들을 행성 크기로 표현해보았어요!",
    "",
    "행성을 클릭해서 각 주식 종목마다",
    "오늘 어떤 일이 일어나고 있는지 알아볼까요?"
  ];
  const pastInfo = [
    `${date.slice(4,6)}월 ${date.slice(6, 8)}일의 뉴스를 분석해서`
    ,"가장 인기 있었던 주식들을"," 행성 크기로 표현해보았어요!",
    "",
    "행성을 클릭해서 각 주식 종목마다",
    "이 날 어떤 일이 있었는지 알아볼까요?"
  ]

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
        <DateCard left="20px" date={date} label={isToday ? "🌟 오늘의 인기 주식 🌟" : `🌟 ${daysAgo}일 전 인기 주식 🌟`} />
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
        {/* 모든 행성에 대한 모달 */}
        {isViewAllHover &&
          trendData.map((data, index) => (
            <PlanetTrendModal
              key={data.stockCode}
              stockCode={data.stockCode}
              corpName={data.stockName}
              position={planetsArray[index].position}
              camera={camera.current!}
              rendererDomElement={mountRef.current?.children[0] as HTMLCanvasElement}
              date={date}
              onClose={() => setIsViewAllHover(false)}
            />
          ))}
        {isErrorModalOpen && (
          <PlanetTrendErrorModal onClose={() => setIsErrorModalOpen(false)} />
        )}
      </RecoilRoot>
      <AlienGuideButton info={isToday ? info : pastInfo} />
      {/* <ViewAllButton
        onMouseEnter={() => setIsViewAllHover(true)} // ViewAllButton에 마우스 호버시
        onMouseLeave={() => setIsViewAllHover(false)} // 마우스가 버튼에서 벗어날 때
      /> */}
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}

// 행성 텍스처 로딩
async function loadTextures(planetsData, textureLoader) {
  const promises = planetsData.map((data) => {
    const textureId = (parseInt(data.stockCode.slice(0, -1)) % 25) + 1;
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
    { x: -300, y: 120, z: -10 },
    { x: 180, y: -170, z: 0 },
    { x: -100, y: -220, z: 0 },
    { x: 250, y: 50, z: 0 },
    { x: 150, y: 250, z: 0 },
    { x: -280, y: -100, z: 0 },
    { x: -120, y: 270, z: 0 },
  ];

  planetsData.forEach((data, index) => {
    const planetSize = getValueFromRank(data.rank) * 0.7; // rank 기반으로 planet 크기 설정
    const geometry = new THREE.SphereGeometry(planetSize || 50, 32, 32); // 크기를 적당히 설정
    const material = new THREE.MeshStandardMaterial({ map: textures[index] });

    // 커스텀 행성 타입으로 캐스팅
    const planet: CustomPlanet = new THREE.Mesh(geometry, material) as CustomPlanet;

    // 행성 위치 설정
    planet.position.set(
      centerPositions[index % centerPositions.length].x,
      centerPositions[index % centerPositions.length].y,
      centerPositions[index % centerPositions.length].z
    );

    scene.add(planet);
    planet.lookAt(camera.position);

    // 행성 배열에 추가
    planetsArray.push(planet);

    planet.userData = { stockCode: data.stockCode, corpName: data.stockName };

    // 회전 속도를 랜덤으로 설정하여 각 행성이 다르게 회전하게 만듦
    planet.rotationSpeed = {
      x: Math.random() * 0.001,
      y: Math.random() * 0.007 + 0.0005,
      z: Math.random() * 0.002,
    };
  });
}

function animatePlanets() {
  planetsArray.forEach((planet: CustomPlanet) => {
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
    particleGroup.rotation.y -= 0.001;
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

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight2.position.set(75, 100, 10);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0x122486, 0.5);
  directionalLight3.position.set(0, 0, 300);
  scene.add(directionalLight3);
}