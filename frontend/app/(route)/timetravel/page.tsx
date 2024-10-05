'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

import { IoArrowBack } from 'react-icons/io5';
import AreaChart from '@/app/components/molecules/timetravel/AreaChart';
import styled from '@emotion/styled';
import { wordData } from '@/app/mocks/wordData';
import { useDate } from '@/app/store/date';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; 
import { TimeTravelContainer, Title, BackButton, DateInputContainer, StyledDatePicker, ConfirmButton, InfoText, ToggleButton } from './style';
import { getTimeChart } from '@/app/utils/apis/timetravel';

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

const TimeTravel = () => {
  const { date: dateString, setDate } = useDate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const router = useRouter();
  const today = new Date();
  const [chartData, setChartData] = useState([]);
  const mountRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    if (selectedDate) {
      const offsetDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
      const newDate = offsetDate.toISOString().split('T')[0].replace(/-/g, '');
      setDate(newDate);
      router.push(`/main/${newDate}`);
    }
  };

  const toggleChartVisibility = () => setIsChartVisible((prev) => !prev);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await getTimeChart("20240101", "20240501");
      const formattedInitialData = initialData.stockVolumeAndNewsList.map(item => ({
        date: item.date,
        newsCount: item.articleCount * 10,
        traffic: parseInt(item.totalStockVolume, 10) % 10000,
        topStocks: item.top3Stocks,
      }));
      setChartData(formattedInitialData.reverse());
    }
    fetchInitialData();

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let particle: THREE.Object3D;

    async function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0); // 배경 투명

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 500, 800);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);

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

      addLights(scene);
      animate();
      window.addEventListener('resize', onWindowResize, false);
    }

    function addLights(scene: THREE.Scene) {
      const ambientLight = new THREE.AmbientLight(0xaaaaaa);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      particle.rotation.y += 0.001;
      renderer.clear();
      renderer.render(scene, camera);
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

  return (<>
    <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    <TimeTravelContainer style={{ position: 'relative' }}>
      <BackButton onClick={() => router.back()}>
        <IoArrowBack />
      </BackButton>

      <Title>시간 여행</Title>

      <DateInputContainer isChartVisible={isChartVisible}>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          showYearDropdown
          scrollableMonthYearDropdown
          isChartVisible={isChartVisible}
        />
        <ConfirmButton onClick={handleConfirm} isChartVisible={isChartVisible}>
          이동
        </ConfirmButton>
      </DateInputContainer>

      <InfoText isChartVisible={isChartVisible}>날짜별 주식 데이터를 한 눈에 확인할 수 있어요!</InfoText>

      <ToggleButton onClick={toggleChartVisibility}>
        {isChartVisible ? '차트 접기' : '차트 펼치기'}{' '}
        {isChartVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ToggleButton>

      {isChartVisible && (
        <ChartContainer>
          <AreaChart data={chartData} detail={chartData} />
        </ChartContainer>
      )}

      
    </TimeTravelContainer>
    </>
  );
};

export default TimeTravel;
