'use client';

import React, { useEffect } from 'react';
import * as THREE from 'three';

interface RocketProps {
  planetRadius: number;
  scene: THREE.Scene;
}

const fixedPositions = [
  { x: 100, y: 50, z: 150 },
  { x: -110, y: 40, z: 150 },
  { x: 0, y: 120, z: 150 },
  { x: -90, y: -90, z: 150 },
  { x: 110, y: -60, z: 150 },
  { x: 20, y: -120, z: 150 },
  { x: 10, y: 10, z: 150 },
];

export default function Rockets({ planetRadius, scene }: RocketProps) {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const rocketTexture = textureLoader.load('/images/planetMain/rocket2.png');
    const rocketMaterial = new THREE.SpriteMaterial({
      map: rocketTexture,
      transparent: true,
      opacity: 0.97,
      color: 0xfafafa
    });

    // 로켓 생성
    const rockets = fixedPositions.map(pos => {
      // 랜덤 크기 설정, 가로:세로 비율 7:4 유지
      const scaleWidth = Math.random() * 30 + 60;  // 60에서 90 사이의 크기
      const scaleHeight = (scaleWidth / 7) * 4;   // 가로 길이에 비례하는 세로 길이

      const rocket = new THREE.Sprite(rocketMaterial);
      rocket.scale.set(scaleWidth, scaleHeight, 1);
      rocket.position.set(pos.x, pos.y, pos.z);
      scene.add(rocket as unknown as THREE.Object3D);

      return rocket;
    });

    return () => {
      rockets.forEach(rocket => scene.remove(rocket as unknown as THREE.Object3D));
    };
  }, [scene]);

  return null;
}
