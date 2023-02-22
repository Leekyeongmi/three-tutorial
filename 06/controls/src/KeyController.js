export class KeyController {
  constructor() {
    // 클래스의 인스턴스가 실행될 때, 기본적으로 실행되는 함수다.
    this.keys = [];

    window.addEventListener('keydown', (e) => {
      console.log(e.code + ' 누름');
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      console.log(e.code + ' 뗌');
      delete this.keys[e.code];
    });
  }
}
