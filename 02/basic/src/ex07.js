import * as THREE from 'three';

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
  // camera.lookAt(0, 0, 0);
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

  const meshes = [];
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  //! 그리기
  let time = Date.now();

  function draw() {
    let newTime = Date.now();
    let deltaTime = newTime - time;
    time = newTime;
    meshes.forEach((mesh) => {
      mesh.rotation.y += deltaTime * 0.001;
    });
    renderer.setAnimationLoop(draw);
    renderer.render(scene, camera);
  }

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
