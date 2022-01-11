import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/DragControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.4 );
hemiLight.position.set( 0, 20, 10 );
scene.add( hemiLight );
let gltfobj = undefined;

const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
dirLight.position.set( 0, 0, 10 );
scene.add( dirLight )

let rotate = true;
let box = undefined;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    if(gltfobj !== undefined && rotate){
        gltfobj.rotation.y +=0.01;
    }
}

loader.load('./scenes/ethereum/scene.gltf', 
    (gltf) => {
        gltfobj = gltf.scene;
        scene.add(gltfobj);
        box = new THREE.Box3().setFromObject(gltfobj);
        renderer.render( scene, camera );
    },

    undefined, (error) => {
        console.log(error);
    }
);

let mousedown = false;

document.body.onmousedown = function() { 
    mousedown = true;
  }
  document.body.onmouseup = function() {
    mousedown = false;
}

document.addEventListener('mousemove', (p) => {
    if(mousedown){
        animate();
    }
}, false);