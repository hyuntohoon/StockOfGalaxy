'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LogoPage: React.FC = () => {
  
  
      const vertexShader = `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main() {
          vColor = customColor;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const fragmentShader = `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying vec3 vColor;

        void main() {
          gl_FragColor = vec4( color * vColor, 1.0 );
          gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
        }
      `;

      const preload = () => {

        let manager = new THREE.LoadingManager();
        manager.onLoad = function() { 
          const environment = new Environment( typo, particle );
        }
      
        var typo = null;
        const loader = new THREE.FontLoader( manager );
        const font = loader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', function ( font ) { typo = font; });
        const particle = new THREE.TextureLoader( manager ).load( 'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png');
      
      }




  return (<>
    <div id="magic"></div>
    <div className="playground">
    <div className="bottomPosition">
        
        
      </div>
    </div>
    </>);
};

export default LogoPage;
