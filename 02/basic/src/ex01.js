import * as THREE from 'three';

// ----- 주제 : 기본 장면

export default function example() {
  //! 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  //* renderer의 사이즈를 정해준다.
  // renderer.setSize(window.innerWidth, window.innerHeight);
  //* 렌더러가 가지고 있는 캔버스를 조립해준다.
  // console.log(renderer.domElement);
  // document.body.appendChild(renderer.domElement);

  //! html에서 캔버스 가져와서 사용 - body안에 canvas 태그를 미리 만들어놓고 다른 html 요소들과 조립해서 레이아웃을 짤 수도 있다.(추천)
  const canvas = document.querySelector('#three-canvas');
  // const renderer = new THREE.WebGLRenderer({ canvas: canvas }); 축약형으로 아래와 같이 쓰는 것도 가능하다.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // 성능저하가 있을 수 있지만, 그래픽이 계단식으로 깨져 보이는 걸 보완하는 속성
  renderer.setSize(window.innerWidth, window.innerHeight);

  //! Scene
  const scene = new THREE.Scene();

  //! Camera
  // 대표적으로 두 가지 종류 카메라가 있다.
  //* 1. 원근 카메라
  /*
const camera = new THREE.PerspectiveCamera(
  75, // 시야각
  window.innerWidth / window.innerHeight, //종횡비
  0.1, // near
  1000 // far
);

//* 카메라의 위치를 지정해주고 scene에 올려준다.
camera.position.x = 2;
camera.position.z = 6;
camera.position.y = 2;
*/

  //* 2. 직교 카메라 (게임에서 많이 쓰인다)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right
    1, //top
    -1, //bottom
    0.1,
    1000
  );
  camera.position.x = 3;
  camera.position.y = 5;
  camera.position.z = 25;
  camera.lookAt(0, 0, 0); // 위치에 있는 물체를 바라보도록 하는 메소드
  camera.zoom = 0.5; // 원근 카메라에서는 멀리서 바라보고자 할 때, z축을 변경해줬는데 직교카메라는 줌을 조작해준다.
  camera.updateProjectionMatrix();
  scene.add(camera);

  //! Mesh
  //* 정육면체 박스 모양을 만들고 재질을 추가해준다.
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 'red'
  });
  // 빛이 없어도 보이는 재질이다.
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //! 그리기
  renderer.render(scene, camera);
}
