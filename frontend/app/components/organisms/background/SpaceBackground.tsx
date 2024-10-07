'use client';
import * as THREE from 'three';
import {useRef, useEffect} from 'react';


const SpaceBackGround = ({speed} : {speed?: number}) => {
    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
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
            camera.position.set(0, 400, 600);
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
            createGalaxy();  // 은하수
            animate();
            window.addEventListener('resize', onWindowResize, false);
          }

         

        // 은하수 생성 함수
        const createGalaxy = () => {
            const galaxyGeometry = new THREE.BufferGeometry();
            const starsCount = 5000;
            const positions = new Float32Array(starsCount * 3); // x, y, z

            for (let i = 0; i < starsCount; i++) {
                const x = (Math.random() - 0.5) * 20000;
                const y = (Math.random() - 0.5) * 20000;
                const z = (Math.random() - 0.5) * 20000;

                positions.set([x, y, z], i * 3);
            }

            galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const galaxyMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
            const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
            scene.add(galaxy);
        };

      
      
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
            particle.rotation.y -= speed ? speed : 0.007;
            particle.rotation.x += 0.0005;
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
    }, [])

    return (
        <div ref={mountRef} style={{ 
                zIndex: 0, 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                pointerEvents: 'none' // 클릭 이벤트를 차단하지 않도록 설정
            }} />
    )

}

export default SpaceBackGround;