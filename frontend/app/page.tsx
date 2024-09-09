'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let circle: THREE.Object3D;
    let skelet: THREE.Object3D;
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

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;
      scene.add(camera);

      circle = new THREE.Object3D();
      skelet = new THREE.Object3D();
      particle = new THREE.Object3D();

      scene.add(circle);
      scene.add(skelet);
      scene.add(particle);

      const geometry = new THREE.TetrahedronGeometry(2, 0);
      const geom = new THREE.IcosahedronGeometry(7, 1);
      const geom2 = new THREE.IcosahedronGeometry(15, 1);

      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
      });

      for (let i = 0; i < 1000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + Math.random() * 700);
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
      }

      const mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
      });

      const mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        side: THREE.DoubleSide,
      });

      const planet = new THREE.Mesh(geom, mat);
      planet.scale.set(16, 16, 16);
      circle.add(planet);

      const planet2 = new THREE.Mesh(geom2, mat2);
      planet2.scale.set(10, 10, 10);
      skelet.add(planet2);

      const ambientLight = new THREE.AmbientLight(0x999999);
      scene.add(ambientLight);

      const lights = [];
      lights[0] = new THREE.DirectionalLight(0xffffff, 1);
      lights[0].position.set(1, 0, 0);
      lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
      lights[1].position.set(0.75, 1, 0.5);
      lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
      lights[2].position.set(-0.75, -1, 0.5);
      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      particle.rotation.y -= 0.004;
      circle.rotation.x -= 0.002;
      circle.rotation.y -= 0.003;
      skelet.rotation.x -= 0.001;
      skelet.rotation.y += 0.002;
      renderer.clear();

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} id="canvas" style={{ width: '100%', height: '100vh' }}></div>;
}
