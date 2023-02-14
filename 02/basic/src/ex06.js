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

  //! Scene
  const scene = new THREE.Scene();

  //! Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, // near
    1000 // far
  );

  camera.position.z = 5;
  // camera.lookAt(0, 0, 0);
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 태양빛과 비슷하다고 생각하면 된다.
  light.position.z = 2;
  light.position.x = 1;
  light.position.y = 1;
  scene.add(light);

  //! Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //! 그리기 + 애니메이션 추가 및 보정
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta(); // draw 함수가 실행되는 시간 간격으로 ElapsedTime과 함께 쓰면 버그가 생긴다.
    console.log(delta);
    mesh.rotation.y += delta;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
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
