"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RecoilRoot, useRecoilValue } from "recoil";
import { dateState } from "@/app/store/date";
import { HoveredPlanetData } from "@/app/types/main";
import DateCard from "@/app/components/molecules/Card/DateCard";
import TimeMachineButtonGroup from "@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup";
import PlanetTrendModal from "@/app/components/organisms/Modal/PlanetTrendModal";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { planetTrendData } from "@/app/mocks/planetTrendData"; // todo: 플래닛 트랜드 api 연동하여 실제 데이터로 변경
import { getValueFromRank } from "@/app/utils/libs/getValueFromRank";

export default function Page() {
  const currentDate = useRecoilValue(dateState);
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
      renderer.render(scene, camera.current!);
    }

    function onWindowResize() {
      camera.current!.aspect = window.innerWidth / window.innerHeight;
      camera.current!.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", (event) => onMouseMove(event, scene, renderer));
    window.addEventListener("click", (event) => onPlanetClick(event, scene, renderer));
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", (event) => onMouseMove(event, scene, renderer));
      window.removeEventListener("click", (event) => onPlanetClick(event, scene, renderer));
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

      raycaster.setFromCamera(mouse, camera.current!);
      const intersects = raycaster.intersectObjects(scene.children);

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

  const onPlanetClick = (event, scene, renderer) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera.current!);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      const { stockCode } = clickedPlanet.userData;
      router.push(`/planet/main/${stockCode}/${currentDate}`);
    }
  };

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
        <DateCard left="30px" />
        {isModalOpen && hoveredPlanet && (
          <PlanetTrendModal
            stockCode={hoveredPlanet.stockCode}
            corpName={hoveredPlanet.corpName}
            position={hoveredPlanet.position}
            camera={camera.current!}
            rendererDomElement={mountRef.current?.children[0] as HTMLCanvasElement}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </RecoilRoot>
      <TimeMachineButtonGroup bottom="30px" right="20px" />
    </div>
  );
}

async function loadTextures(planetsData, textureLoader) {
  const promises = planetsData.map((data) => {
    const textureId = (parseInt(data.stock_code) % 12) + 1;
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
    const planetSize = getValueFromRank(data.rank) * 0.7; // rank 기반으로 planet 크기 설정
    const geometry = new THREE.SphereGeometry(planetSize, 24, 24);
    const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: textures[index] }));

    planet.position.set(
      centerPositions[index % centerPositions.length].x,
      centerPositions[index % centerPositions.length].y,
      centerPositions[index % centerPositions.length].z
    );

    scene.add(planet);
    planet.lookAt(camera.position);

    planet.userData = { stockCode: data.stock_code, corpName: data.stock_name };
  });
}

function createParticles(scene: THREE.Scene) {
  const particleGroup = new THREE.Group();
  const particleGeometry = new THREE.TetrahedronGeometry(1, 0); // 작은 입자
  const particleMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  });

  // 1000개의 입자 생성
  for (let i = 0; i < 1000; i++) {
    const particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
    particleMesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    particleMesh.position.multiplyScalar(180 + Math.random() * 700);
    particleMesh.rotation.set(
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2
    );
    particleGroup.add(particleMesh);
  }

  // 입자 그룹을 씬에 추가
  scene.add(particleGroup);

  // 애니메이션에서 입자 회전 추가
  function animateParticles() {
    requestAnimationFrame(animateParticles);
    particleGroup.rotation.y += 0.002; // 입자를 천천히 회전
  }
  animateParticles();
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
