import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.enableZoom = false;
  // controls.maxDistance = 10;
  // controls.minDistance = 2;
  // controls.minPolarAngle = Math.PI / 2; // 45도
  // controls.maxPolarAngle = Math.PI / 4; // 45도
  // controls.target.set(2, 2, 2);
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 5;

  // Mesh
  // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const geometry = new THREE.SphereGeometry(2, 32, 32);

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
    // mesh.position.x = (Math.random() - 0.5) * innerWidth;
    // mesh.position.y = (Math.random() - 0.5) * innerHeight;
    // mesh.position.z = (Math.random() - 0.5) * 1000;
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;

    group1.add(mesh);
  }
  scene.add(group1);

  // scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    group1.rotation.y += delta * 0.01;
    group1.rotation.x += delta * 0.01;
    group1.rotation.z += delta * 0.01;
    controls.update();

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
