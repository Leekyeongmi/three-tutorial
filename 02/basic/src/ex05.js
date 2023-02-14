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
    // console.log(clock.getElapsedTime());
    // 각도는 Radian을 사용한다. (360도 === 2파이 === 6.28Radian)
    // mesh.rotation.y += 0.1;
    const time = clock.getElapsedTime();
    // 초당 60회를 목표로 하고 있으니, 1초에 60까지 늘어난다.
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y = time;
    mesh.position.y += 0.01; // position도 time으로 사용하게 되면, 아래 함수 때문에 원하는 애니메이션 작동이 안 될 수 있음. ex06.js로!
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // 빌트인 function인데 WebXR 프로젝트에서는 must로 사용해야 한다.
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
