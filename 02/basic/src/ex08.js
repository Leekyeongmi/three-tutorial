import * as THREE from 'three';
import gsap from 'gsap';

// ----- 주제 : 기본 장면

export default function example() {
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  //! Scene + 안개 추가
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('black', 1, 7);

  //! Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, // near
    1000 // far
  );

  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 태양빛과 비슷하다고 생각하면 된다.
  light.position.z = 5;
  light.position.x = 1;
  light.position.y = 3;

  scene.add(light);

  //! Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //! 그리기

  function draw() {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw); // 이 코드를 삭제했더니 gsap 동작을 안 한다. gsap는 requestAnimationFrame과 독립적이라고 했던 것 같은데 말이다.
  }

  // gsap
  gsap.to(mesh.position, {
    duration: 1,
    y: 2
  });

  draw();

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  //! 이벤트
  window.addEventListener('resize', setSize);
}
