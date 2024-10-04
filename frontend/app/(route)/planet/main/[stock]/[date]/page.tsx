'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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
import { getTop7RocketsApi } from '@/app/utils/apis/rocket';
import TypeWritter from './TypeWritter';
import { useDate } from '@/app/store/date';

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;

export default function Home(props: any) {
  const { date } = props.params;
  const { setDate } = useDate();
  setDate(date);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rocketData, setRocketData] = useState<RocketData[]>([]);
  const planetRadius = 150;
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const textureId = (parseInt(stockCode.slice(0, -1)) % 25) + 1;

  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const fetchRocketData = async () => {
    try {
      const response = await getTop7RocketsApi(stockCode);
      setRocketData(response.rocketList);
    } catch (error) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchRocketData();
  }, [stockCode]);

  useEffect(() => {
    let circle: THREE.Object3D;
    let particle: THREE.Object3D;

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
      particle = new THREE.Object3D();
      newScene.add(particle);

      newScene.add(circle);

      

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
      lights[0] = new THREE.DirectionalLight(0xffffff, 0.3);
      lights[1] = new THREE.DirectionalLight(0xffffff, 0.3);
      lights[2] = new THREE.DirectionalLight(0x122486, 0.5);
      lights[0].position.set(1, 0, 0);
      lights[1].position.set(0.75, 1, 0.5);
      lights[2].position.set(-0.75, -1, 0.5);
      newScene.add(lights[0]);
      newScene.add(lights[1]);
      newScene.add(lights[2]);

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
      glowMesh.scale.multiplyScalar(1.2);
      circle.add(glowMesh);

      window.addEventListener('resize', onWindowResize, false);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        particle.rotation.x -= 0.0001;
        particle.rotation.y -= 0.002;
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

  const createStars = () => {
    const starsGroup = new THREE.Group();
    const starGeometry = new THREE.TetrahedronGeometry(1.5, 0);
    const colors = [0xe0e0e0, 0xA4A8FF, 0xFFA4DF, 0xb0e0e6]; // 색상 추가
    const starMaterials = colors.map(
      (color) =>
        new THREE.MeshPhongMaterial({
          color: color,
          shininess: 80, // 광택
          specular: 0xffffff, // 반사광
          flatShading: true,
        })
    );

    for (let i = 0; i < 1200; i++) {
      const material = starMaterials[Math.floor(Math.random() * starMaterials.length)];
      const starMesh = new THREE.Mesh(starGeometry, material);
      starMesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      starMesh.position.multiplyScalar(150 + Math.random() * 800);
      starMesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      );
      starsGroup.add(starMesh);
    }

    return starsGroup;
  };

  return (
    <div style={{ position: 'relative' }}>
      {isLoading ? (
        <TypeWritter onFinish={() => setIsLoading(false)} />
      ) : (
        <>
          <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 1 }}></div>
            <DateCard right='30px'date={date} label={"PLANET PAGE"} />
            <PlanetSimpleInfoCard />
            <TimeMachineButtonGroup />
            <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
            {scene && <Rocket scene={scene} rocketData={rocketData} stockCode={stockCode} />}
            {isRocketModalOpen &&
              <RocketModal
                onClose={() => setIsRocketModalOpen(false)}
                fetchRocketData={fetchRocketData} // 로켓 탑7 API 호출 함수
            />}
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