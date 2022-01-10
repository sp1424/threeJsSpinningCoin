import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 1000, 0 );
camera.lookAt( 0, 0, 0 );
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.4 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
dirLight.position.set( - 3, 10, - 10 );
scene.add( dirLight )

loader.load('./2CylinderEngine.glb', 
    (gltf) => {
        scene.add(gltf.scene);
        renderer.render( scene, camera );
    },
    undefined, (error) => {
        console.log(error);
    }
);