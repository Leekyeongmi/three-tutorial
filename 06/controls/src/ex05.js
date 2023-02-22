import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// ----- 주제: PointerLockControls

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 10;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new PointerLockControls(camera, renderer.domElement);
  // console.log(controls.domElement === renderer.domElement); // true canvas 객체

  controls.domElement.addEventListener('click', () => {
    controls.lock();
  });

  controls.addEventListener('lock', () => {
    console.log('lock!');
  });

  controls.addEventListener('unlock', () => {
    console.log('unlock!');
  });

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  let mesh;
  let material;
  const group1 = new THREE.Group();
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: `rgb(
				${20 + Math.floor(Math.random() * 205)}, 
				${20 + Math.floor(Math.random() * 205)}, 
				${20 + Math.floor(Math.random() * 205)})
				`
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;

    group1.add(mesh);
  }
  scene.add(group1);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    // group1.rotation.y += delta * 0.01;
    // group1.rotation.x += delta * 0.01;
    // group1.rotation.z += delta * 0.01;
    // controls.update(delta);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
