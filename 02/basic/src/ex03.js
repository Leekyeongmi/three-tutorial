import * as THREE from 'three';

// ----- 주제 : 기본 장면

export default function example() {
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true // 투명
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearAlpha(0.5); // 투명도를 조절할 수 있다.
  renderer.setClearColor(0x00ff00);
  renderer.setClearAlpha(0.5);

  //! Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('blue'); // scene에 준 컬러가 우선한다.

  //! Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, // near
    1000 // far
  );

  camera.position.x = 3;
  camera.position.y = 2;
  camera.position.z = 5;
  // camera.lookAt(0, 0, 0);
  scene.add(camera);

  //! Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //! 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  //! 이벤트
  window.addEventListener('resize', setSize);
}
