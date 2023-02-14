import * as THREE from 'three';

//! 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
//* renderer의 사이즈를 정해준다.
// renderer.setSize(window.innerWidth, window.innerHeight);
//* 렌더러가 가지고 있는 캔버스를 조립해준다.
// console.log(renderer.domElement);
// document.body.appendChild(renderer.domElement);

//! body안에 canvas 태그를 미리 만들어놓고 다른 html 요소들과 조립해서 레이아웃을 짤 수도 있다.(추천)
const canvas = document.querySelector('#three-canvas');
// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// 축약형으로 아래와 같이 쓰는 것도 가능하다.
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
