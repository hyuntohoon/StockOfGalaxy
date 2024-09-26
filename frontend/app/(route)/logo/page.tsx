/** @jsxImportSource @emotion/react */
'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


const LogoPage = () => {
  useEffect(() => {
    init();
    
    return () => {
      // Clean up Three.js renderer on unmount
      const canvas = document.querySelector('canvas');
      if (canvas) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  const init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Background color
    renderer.setClearColor(0x000000);
    
    // Camera position
    camera.position.set(0, 0, 600);

    const textAnimation = createTextAnimation();
    scene.add(textAnimation);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  };

  const createTextAnimation = () => {
    const geometry = generateTextGeometry('Stock of Galaxy', {
      size: 40,
      height: 12,
      font: 'droid sans',
      weight: 'bold',
      style: 'normal',
      curveSegments: 24,
      bevelSize: 2,
      bevelThickness: 2,
      bevelEnabled: true,
      anchor: { x: 0.5, y: 0.5, z: 0.0 }
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(geometry, material);
    
    return textMesh;
  };

  const generateTextGeometry = (text, params) => {
    const fontLoader = new FontLoader();
    let geometry;

    fontLoader.load('https://threejs.org/fonts/droid_sans_regular.typeface.json', (font) => {
      geometry = new TextGeometry(text, { font: font, size: params.size, height: params.height });
      geometry.computeBoundingBox();

      const size = geometry.boundingBox.size();
      const anchorX = size.x * -params.anchor.x;
      const anchorY = size.y * -params.anchor.y;
      const anchorZ = size.z * -params.anchor.z;

      const matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);
      geometry.applyMatrix4(matrix);
    });

    return geometry;
  };

  return <div id="three-container" style={{ height: '100vh', margin: 0 }}></div>;
};

export default LogoPage;
