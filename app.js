import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);
camera.position.z = 13;

const scene = new THREE.Scene();
let flower;
let mixer;
const loader = new GLTFLoader();

loader.load('model/blue_flower_animated.glb', function (gltf) {
  console.log('Model loaded successfully:', gltf);
  flower = gltf.scene;
  flower.scale.set(5,5,5);
  //flower.setPosition.y = -2;
  scene.add(flower);

  mixer = new THREE.AnimationMixer(flower);
  mixer.clipAction(gltf.animations[0]).play();
  mixer.update(0.01);
  console.log(gltf.animations);
},
function (xhr) {
  console.log('Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
},
function (error) {
  console.error('Error loading model:', error);
});

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
console.log('Renderer created, container:', document.getElementById('container3D'));
document.getElementById('container3D').appendChild(renderer.domElement);
console.log('Renderer appended to DOM');

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.01);
};

reRender3D();